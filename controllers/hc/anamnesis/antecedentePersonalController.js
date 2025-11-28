import AntecedentePersonal from '../../../models/hc/anamnesis/antecedentePersonalModel.js';
import BaseService from '../../../services/baseService.js';

const antecedentePersonalService = new BaseService(AntecedentePersonal);

export const createAntecedentePersonal = async (req, res) => {
  try {
    const result = await antecedentePersonalService.create(req.body);
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getAntecedentePersonal = async (req, res) => {
  try {
    const { id_historia } = req.params;
    const result = await AntecedentePersonal.getByHistoria(id_historia);
    if (!result) {
      return res.status(404).json({ error: 'No encontrado' });
    }
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateAntecedentePersonal = async (req, res) => {
  try {
    const { id_historia } = req.params;
    // Busca el antecedente por id_historia
    const antecedente = await AntecedentePersonal.getByHistoria(id_historia);
    if (!antecedente) {
      return res.status(404).json({ error: 'No encontrado' });
    }
    // Actualiza usando el id_antecedente encontrado
    const result = await antecedentePersonalService.update(
      antecedente.id_antecedente,
      req.body
    );
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
