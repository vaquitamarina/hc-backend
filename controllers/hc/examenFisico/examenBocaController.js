import {
  consultarExamenBoca as modelConsultar,
  actualizarExamenBoca as modelActualizar,
} from '../../../models/hc/examenFisico/examenBocaModel.js';

export const consultarExamenBucal = async (req, res) => {
  try {
    const id = req.params.id_historia || req.params.id;
    const result = await modelConsultar(id);
    res.status(200).json(result || {});
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const actualizarExamenBucal = async (req, res) => {
  try {
    const id = req.params.id_historia || req.params.id;
    await modelActualizar({ idHistory: id, ...req.body });
    res.status(200).json({ message: 'Examen de boca guardado correctamente' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
