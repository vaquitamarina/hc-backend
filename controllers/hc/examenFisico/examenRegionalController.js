import {
  registrarExamenFisicoRegional as modelRegistrar,
  consultarExamenFisicoRegional as modelConsultar,
  actualizarExamenFisicoRegional as modelActualizar,
} from '../../../models/hc/examenFisico/examenRegionalModel.js';

export const registrarExamenFisicoRegional = async (req, res) => {
  try {
    const result = await modelRegistrar(req.body);
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const consultarExamenFisicoRegional = async (req, res) => {
  try {
    const idHistory = req.params.id_historia || req.params.id;
    const result = await modelConsultar(idHistory);
    res.json(result || {});
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const actualizarExamenFisicoRegional = async (req, res) => {
  try {
    const idHistory = req.params.id_historia || req.params.id;
    await modelActualizar({ idHistory, ...req.body });
    res.json({ message: 'Actualizado' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
