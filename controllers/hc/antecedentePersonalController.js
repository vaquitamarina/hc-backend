import AntecedentePersonal from '../../models/hc/antecedentePersonalModel.js';

export const createAntecedentePersonal = async (req, res) => {
  try {
    const result = await AntecedentePersonal.create(req.body);
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getAntecedentePersonal = async (req, res) => {
  try {
    const { id_antecedente } = req.params;
    const result = await AntecedentePersonal.getById(id_antecedente);
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
    const { id_antecedente } = req.params;
    const result = await AntecedentePersonal.update(id_antecedente, req.body);
    if (!result) {
      return res.status(404).json({ error: 'No encontrado' });
    }
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getAntecedentePersonalByHistoria = async (req, res) => {
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
