import EnfermedadActual from '../../models/hc/enfermedadActualModel.js';

export const createEnfermedadActual = async (req, res) => {
  try {
    const result = await EnfermedadActual.create(req.body);
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getEnfermedadActual = async (req, res) => {
  try {
    const { id_enfermedad_actual } = req.params;
    const result = await EnfermedadActual.getById(id_enfermedad_actual);
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
    const { id_enfermedad_actual } = req.params;
    const result = await EnfermedadActual.update(
      id_enfermedad_actual,
      req.body
    );
    if (!result) {
      return res.status(404).json({ error: 'No encontrado' });
    }
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
