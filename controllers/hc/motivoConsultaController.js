import MotivoConsulta from '../../models/hc/motivoConsultaModel.js';

export const createMotivoConsulta = async (req, res) => {
  try {
    const { id_historia, motivo } = req.body;
    const result = await MotivoConsulta.create({ id_historia, motivo });
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getMotivoConsulta = async (req, res) => {
  try {
    const { id_motivo } = req.params;
    const result = await MotivoConsulta.getById(id_motivo);
    if (!result) {
      return res.status(404).json({ error: 'No encontrado' });
    }
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateMotivoConsulta = async (req, res) => {
  try {
    const { id_motivo } = req.params;
    const { motivo } = req.body;
    const result = await MotivoConsulta.update(id_motivo, { motivo });
    if (!result) {
      return res.status(404).json({ error: 'No encontrado' });
    }
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
