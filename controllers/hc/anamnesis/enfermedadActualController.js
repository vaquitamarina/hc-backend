import EnfermedadActual, {
  DomainError,
  EnfermedadActualAggregate,
} from '../../../models/hc/anamnesis/enfermedadActualModel.js';

const construirAgregado = (req) =>
  new EnfermedadActualAggregate({
    ...req.body,
    id_historia: req.params.id_historia ?? req.body.id_historia,
  });

const esErrorDominio = (error) =>
  error instanceof DomainError || error?.name === 'DomainError';

export const registrarEnfermedadActual = async (req, res) => {
  let agregado;
  try {
    agregado = construirAgregado(req);
  } catch (err) {
    if (esErrorDominio(err)) {
      return res.status(400).json({ error: err.message });
    }
    return res.status(500).json({ error: err.message });
  }

  try {
    const result = await EnfermedadActual.create(agregado);
    if (!result) {
      return res
        .status(500)
        .json({ error: 'No se pudo registrar la enfermedad actual' });
    }
    return res.status(201).json({
      message: 'Enfermedad actual registrada con éxito',
      data: result,
    });
  } catch (err) {
    if (esErrorDominio(err)) {
      return res.status(400).json({ error: err.message });
    }
    return res
      .status(500)
      .json({ error: 'Error al registrar la enfermedad actual' });
  }
};

export const consultarEnfermedadActual = async (req, res) => {
  try {
    const { id_historia } = req.params;
    const result = await EnfermedadActual.getByHistoria(id_historia);
    if (!result) {
      return res.status(404).json({
        error:
          'No se encontró enfermedad actual para la historia clínica indicada',
      });
    }
    return res.status(200).json({
      message: 'Enfermedad actual obtenida correctamente',
      data: result,
    });
  } catch (err) {
    if (esErrorDominio(err)) {
      return res.status(400).json({ error: err.message });
    }
    return res
      .status(500)
      .json({ error: 'Error al obtener la enfermedad actual' });
  }
};

export const actualizarEnfermedadActual = async (req, res) => {
  let enfermedad;
  try {
    const { id_historia } = req.params;
    enfermedad = await EnfermedadActual.getByHistoria(id_historia);
    if (!enfermedad) {
      return res.status(404).json({
        error:
          'No se encontró enfermedad actual para la historia clínica indicada',
      });
    }
  } catch (err) {
    if (esErrorDominio(err)) {
      return res.status(400).json({ error: err.message });
    }
    return res
      .status(500)
      .json({ error: 'Error al actualizar la enfermedad actual' });
  }

  try {
    const agregado = construirAgregado(req);
    const result = await EnfermedadActual.update(
      req.params.id_historia,
      agregado
    );
    if (!result) {
      return res
        .status(500)
        .json({ error: 'No se pudo actualizar la enfermedad actual' });
    }
    return res.status(200).json({
      message: 'Enfermedad actual actualizada correctamente',
      data: result,
    });
  } catch (err) {
    if (esErrorDominio(err)) {
      return res.status(400).json({ error: err.message });
    }
    return res
      .status(500)
      .json({ error: 'Error al actualizar la enfermedad actual' });
  }
};

export const createEnfermedadActual = registrarEnfermedadActual;
export const getEnfermedadActual = consultarEnfermedadActual;
export const updateEnfermedadActual = actualizarEnfermedadActual;
