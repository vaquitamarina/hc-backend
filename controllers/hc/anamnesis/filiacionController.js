import Filiacion, {
  FiliacionAggregate,
} from '../../../models/hc/anamnesis/filiacionModel.js';

const construirAgregado = (req) =>
  new FiliacionAggregate({
    ...req.body,
    id_historia: req.params.id_historia ?? req.body.id_historia,
  });

export const registrarDatosPersonalesPaciente = async (req, res) => {
  let agregado;
  try {
    agregado = construirAgregado(req);
  } catch (err) {
    return res
      .status(400)
      .json({ error: err.message || 'Error al registrar la filiación' });
  }

  try {
    const ok = await Filiacion.create(agregado);
    if (ok) {
      return res
        .status(201)
        .json({ message: 'Filiación registrada con éxito' });
    }
    return res.status(400).json({ error: 'No se pudo registrar la filiación' });
  } catch (err) {
    return res
      .status(500)
      .json({ error: err.message || 'Error al registrar la filiación' });
  }
};

export const consultarDatosPersonalesPaciente = async (req, res) => {
  try {
    const { id_historia } = req.params;
    const result = await Filiacion.getByHistoria(id_historia);
    if (!result) {
      return res.status(404).json({
        error: 'No se encontró filiación para la historia clínica indicada',
      });
    }
    return res.status(200).json({
      message: 'Filiación obtenida correctamente',
      data: result,
    });
  } catch {
    return res.status(500).json({ error: 'Error al obtener la filiación' });
  }
};

export const actualizarDatosPersonalesPaciente = async (req, res) => {
  let filiacion;
  try {
    const { id_historia } = req.params;
    filiacion = await Filiacion.getByHistoria(id_historia);
    if (!filiacion) {
      return res.status(404).json({
        error: 'No se encontró filiación para la historia clínica indicada',
      });
    }
  } catch (err) {
    return res
      .status(500)
      .json({ error: err.message || 'Error al actualizar la filiación' });
  }

  try {
    const agregado = construirAgregado(req);
    const ok = await Filiacion.update(agregado);
    if (ok) {
      return res
        .status(200)
        .json({ message: 'Filiación actualizada correctamente' });
    }
    return res
      .status(500)
      .json({ error: 'No se pudo actualizar la filiación' });
  } catch (err) {
    return res
      .status(400)
      .json({ error: err.message || 'Error al actualizar la filiación' });
  }
};

export const createFiliacion = registrarDatosPersonalesPaciente;
export const getFiliacion = consultarDatosPersonalesPaciente;
export const updateFiliacion = actualizarDatosPersonalesPaciente;
