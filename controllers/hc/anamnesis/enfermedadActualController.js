import EnfermedadActual from '../../../models/hc/anamnesis/enfermedadActualModel.js';
import BaseService from '../../../services/baseService.js';

const enfermedadActualService = new BaseService(EnfermedadActual);

export const createEnfermedadActual = async (req, res) => {
  try {
    const result = await enfermedadActualService.create(req.body);
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getEnfermedadActual = async (req, res) => {
  try {
    const { id_historia } = req.params;
    const result = await EnfermedadActual.getByHistoria(id_historia);
    if (!result) {
      return res.status(404).json({ error: 'No encontrado' });
    }
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateEnfermedadActual = async (req, res) => {
  try {
    const { id_historia } = req.params;
    // Busca la enfermedad actual por id_historia
    const enfermedad = await EnfermedadActual.getByHistoria(id_historia);
    if (!enfermedad) {
      return res.status(404).json({ error: 'No encontrado' });
    }
    // Actualiza usando el id_enfermedad_actual encontrado
    const result = await enfermedadActualService.update(
      enfermedad.id_enfermedad_actual,
      req.body
    );
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
