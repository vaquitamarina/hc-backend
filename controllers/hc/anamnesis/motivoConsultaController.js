import MotivoConsulta, {
  DomainError,
} from '../../../models/hc/anamnesis/motivoConsultaModel.js';
import BaseService from '../../../services/baseService.js';

const motivoConsultaService = new BaseService(MotivoConsulta);

export const registrarMotivoConsulta = async (req, res) => {
  try {
    const ok = await motivoConsultaService.create(req.body);
    if (ok) {
      return res
        .status(201)
        .json({ message: 'Motivo de consulta registrado con éxito' });
    }
    return res
      .status(400)
      .json({ error: 'No se pudo registrar el motivo de consulta' });
  } catch (err) {
    // Preserve original behavior: creation errors return 400
    return res.status(400).json({
      error: err.message || 'Error al registrar el motivo de consulta',
    });
  }
};

export const consultarMotivoConsulta = async (req, res) => {
  try {
    const { id_historia } = req.params;
    const result = await MotivoConsulta.getByHistoria(id_historia);
    if (!result) {
      return res.status(404).json({
        error:
          'No se encontró motivo de consulta para la historia clínica indicada',
      });
    }
    return res.status(200).json({
      message: 'Motivo de consulta obtenido correctamente',
      data: result,
    });
  } catch (err) {
    if (err instanceof DomainError) {
      return res.status(400).json({ error: err.message });
    }
    return res
      .status(500)
      .json({ error: 'Error al obtener el motivo de consulta' });
  }
};

export const actualizarMotivoConsulta = async (req, res) => {
  try {
    const { id_historia } = req.params;
    const motivo = await MotivoConsulta.getByHistoria(id_historia);
    if (!motivo) {
      return res.status(404).json({
        error:
          'No se encontró motivo de consulta para la historia clínica indicada',
      });
    }
    try {
      const ok = await motivoConsultaService.update(id_historia, req.body);
      if (ok) {
        return res
          .status(200)
          .json({ message: 'Motivo de consulta actualizado correctamente' });
      }
      return res
        .status(500)
        .json({ error: 'No se pudo actualizar el motivo de consulta' });
    } catch (err) {
      if (err instanceof DomainError) {
        return res.status(400).json({ error: err.message });
      }
      return res.status(500).json({
        error: err.message || 'Error al actualizar el motivo de consulta',
      });
    }
  } catch (err) {
    if (err instanceof DomainError) {
      return res.status(400).json({ error: err.message });
    }
    return res.status(500).json({
      error: err.message || 'Error al actualizar el motivo de consulta',
    });
  }
};

// Legacy exported names for compatibility with existing routes/tests
export const createMotivoConsulta = registrarMotivoConsulta;
export const getMotivoConsulta = consultarMotivoConsulta;
export const updateMotivoConsulta = actualizarMotivoConsulta;
