import MotivoConsulta from '../../../models/hc/anamnesis/motivoConsultaModel.js';
import BaseService from '../../../services/baseService.js';

const motivoConsultaService = new BaseService(MotivoConsulta);

export const createMotivoConsulta = async (req, res) => {
  try {
    const result = await motivoConsultaService.create(req.body);
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getMotivoConsulta = async (req, res) => {
  try {
    const { id_historia } = req.params;
    const result = await MotivoConsulta.getByHistoria(id_historia);
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
    const { id_historia } = req.params;
    // Busca el motivo por id_historia
    const motivo = await MotivoConsulta.getByHistoria(id_historia);
    if (!motivo) {
      return res.status(404).json({ error: 'No encontrado' });
    }
    // Actualiza usando el id_motivo encontrado
    const result = await motivoConsultaService.update(
      motivo.id_motivo,
      req.body
    );
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
