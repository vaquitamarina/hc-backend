import {
  registrarExamenFisicoGeneral as modelRegistrar,
  consultarExamenFisicoGeneral as modelConsultar,
  actualizarExamenFisicoGeneral as modelActualizar,
} from '../../../models/hc/examenFisico/examenGeneralModel.js';

export const registrarExamenFisicoGeneral = async (req, res) => {
  try {
    const result = await modelRegistrar(req.body);
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const consultarExamenFisicoGeneral = async (req, res) => {
  try {
    const id = req.params.id_historia || req.params.id;
    const result = await modelConsultar(id);
    res.status(200).json(result || {});
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const actualizarExamenFisicoGeneral = async (req, res) => {
  try {
    const id = req.params.id_historia || req.params.id;
    await modelActualizar({ idHistory: id, ...req.body });
    res.json({ message: 'Actualizado' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
