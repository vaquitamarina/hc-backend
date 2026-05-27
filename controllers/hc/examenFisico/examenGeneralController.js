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
    const { id_historia } = req.params;
    const result = await modelConsultar(id_historia);
    if (!result) {
      return res.status(404).json({ error: 'No encontrado' });
    }
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const actualizarExamenFisicoGeneral = async (req, res) => {
  try {
    const { id_historia } = req.params;
    const existing = await modelConsultar(id_historia);
    if (!existing) {
      return res.status(404).json({ error: 'No encontrado' });
    }
    await modelActualizar({ idHistory: id_historia, ...req.body });
    res.json({ message: 'Actualizado' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
