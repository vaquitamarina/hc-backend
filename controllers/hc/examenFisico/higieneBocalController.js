import {
  consultarHigieneBocal as modelConsultar,
  actualizarHigieneBocal as modelActualizar,
} from '../../../models/hc/examenFisico/higieneBocalModel.js';

export const consultarHigieneBucal = async (req, res) => {
  try {
    const id = req.params.id_historia || req.params.id;
    const result = await modelConsultar(id);
    res.status(200).json(result || {});
  } catch (err) {
    res
      .status(500)
      .json({ error: 'Error al obtener el examen de higiene oral' });
  }
};

export const actualizarHigieneBucal = async (req, res) => {
  const id = req.params.id_historia || req.params.id;
  const { estadoHigiene } = req.body;
  const idUsuario = req.user.id;

  try {
    await modelActualizar({
      idHistory: id,
      estadoHigiene,
      idUsuario,
    });
    res.status(200).json({ message: 'Higiene bucal guardada correctamente' });
  } catch {
    res.status(500).json({ error: 'Error al guardar la higiene bucal' });
  }
};
