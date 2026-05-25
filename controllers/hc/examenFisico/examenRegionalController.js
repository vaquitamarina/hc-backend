import BaseService from '../../../services/baseService.js';
import ExamenFisicoRegional from '../../../models/hc/examenFisico/examenRegionalModel.js';

export const servicioExamenFisicoRegional = new BaseService(
  ExamenFisicoRegional
);

export const registrarExamenFisicoRegional = async (req, res) => {
  try {
    const result = await servicioExamenFisicoRegional.create(req.body);
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const consultarExamenFisicoRegional = async (req, res) => {
  try {
    const { id_historia } = req.params;
    const result = await ExamenFisicoRegional.consultarPorHistoria(id_historia);
    if (!result) {
      return res.status(404).json({ error: 'No encontrado' });
    }
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const actualizarExamenFisicoRegional = async (req, res) => {
  try {
    const { id_historia } = req.params;
    const examen = await ExamenFisicoRegional.consultarPorHistoria(id_historia);
    if (!examen) {
      return res.status(404).json({ error: 'No encontrado' });
    }
    const result = await servicioExamenFisicoRegional.update(
      examen.id_regional,
      req.body
    );
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
