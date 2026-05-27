import {
  consultarDiagnosticoClinicas as modelConsultar,
  actualizarDiagnosticoClinicas as modelActualizar,
} from '../../models/hc/diagnosticoClinicasModel.js';

export const consultarDiagnosticoClinico = async (req, res) => {
  try {
    const id = req.params.id_historia || req.params.id;
    const data = await modelConsultar(id);
    res.status(200).json(data || {});
  } catch {
    res.status(500).json({ error: 'Error al obtener diagnóstico de clínicas' });
  }
};

export const actualizarDiagnosticoClinico = async (req, res) => {
  try {
    const id = req.params.id_historia || req.params.id;
    await modelActualizar({
      idHistory: id,
      data: req.body,
      idUsuario: req.user.id,
    });
    res
      .status(200)
      .json({ message: 'Información clínica guardada correctamente' });
  } catch {
    res.status(500).json({ error: 'Error al guardar información clínica' });
  }
};
