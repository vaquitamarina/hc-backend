// Controlador para obtener historias clínicas de pacientes adultos de un estudiante específico
import {
  IdUuidValueObject,
  ListaHcAdultosAggregate,
  listarHistoriasClinicasAdultasDeEstudiante as consultarHistoriasClinicasAdultasDeEstudiante,
} from '../../../models/hc/hcModels/listaHcAdultos.js';

export const listarHistoriasClinicasAdultasDeEstudiante = async (req, res) => {
  try {
    const { id } = req.params;
    // Validate as UUID and build aggregate in memory
    const idVO = new IdUuidValueObject(id);
    const agg = new ListaHcAdultosAggregate({ idEstudianteVO: idVO });
    const historias = await consultarHistoriasClinicasAdultasDeEstudiante(
      agg._idEstudiante.value
    );
    if (!historias || historias.length === 0) {
      return res.status(200).json([]);
    }
    return res.status(200).json(historias);
  } catch (error) {
    // Validation errors -> 400, infra -> 500
    if (error.message && error.message.includes('ID de estudiante inválido')) {
      return res.status(400).json({ error: error.message });
    }
    return res.status(500).json({
      error: error.message || 'Error al obtener historias clínicas adultas.',
    });
  }
};
