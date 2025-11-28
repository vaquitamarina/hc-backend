import Filiacion from '../../../models/hc/anamnesis/filiacionModel.js';
import BaseService from '../../../services/baseService.js';

const filiacionService = new BaseService(Filiacion);

export const createFiliacion = async (req, res) => {
  try {
    const result = await filiacionService.create(req.body);
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getFiliacion = async (req, res) => {
  try {
    const { id_historia } = req.params;
    const result = await Filiacion.getByHistoria(id_historia);
    if (!result) {
      return res.status(404).json({ error: 'No encontrado' });
    }
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateFiliacion = async (req, res) => {
  try {
    const { id_historia } = req.params;
    // Busca la filiación por id_historia
    const filiacion = await Filiacion.getByHistoria(id_historia);
    if (!filiacion) {
      return res.status(404).json({ error: 'No encontrado' });
    }
    // Actualiza usando el id_filiacion encontrado
    const result = await filiacionService.update(
      filiacion.id_filiacion,
      req.body
    );
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
