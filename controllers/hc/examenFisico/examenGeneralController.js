import BaseService from '../../../services/baseService.js';
import ExamenFisicoGeneral from '../../../models/hc/examenFisico/examenGeneralModel.js';

export const servicioExamenFisicoGeneral = new BaseService(ExamenFisicoGeneral);

export const registrarExamenFisicoGeneral = async (req, res) => {
  try {
    const result = await servicioExamenFisicoGeneral.create(req.body);
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const consultarExamenFisicoGeneral = async (req, res) => {
  try {
    const { id_historia } = req.params;
    const result = await ExamenFisicoGeneral.consultarPorHistoria(id_historia);
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
    const examen = await ExamenFisicoGeneral.consultarPorHistoria(id_historia);
    if (!examen) {
      return res.status(404).json({ error: 'No encontrado' });
    }
    const result = await servicioExamenFisicoGeneral.update(
      examen.id_examen,
      req.body
    );
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
