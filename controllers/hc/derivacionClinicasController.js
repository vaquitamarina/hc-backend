import {
  consultarDerivacionClinicas as modelConsultar,
  actualizarDerivacionClinicas as modelActualizar,
} from '../../models/hc/derivacionClinicasModel.js';

export const consultarDerivacionClinicas = async (req, res) => {
  try {
    const id = req.params.id_historia || req.params.id;
    const data = await modelConsultar(id);
    res.status(200).json(data || {});
  } catch {
    res.status(500).json({ error: 'Error al obtener derivaciones' });
  }
};

export const actualizarDerivacionClinicas = async (req, res) => {
  try {
    const id = req.params.id_historia || req.params.id;
    const { destinos, observaciones, alumno, docente } = req.body;
    await modelActualizar({
      idHistory: id,
      destinos,
      observaciones,
      alumno,
      docente,
      idUsuario: req.user.id,
    });
    res.status(200).json({ message: 'Derivación guardada correctamente' });
  } catch {
    res.status(500).json({ error: 'Error al guardar derivación' });
  }
};
