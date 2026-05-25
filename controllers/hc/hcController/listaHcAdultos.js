// Controlador para obtener historias clínicas de pacientes adultos de un estudiante específico
import { listarHistoriasClinicasAdultasDeEstudiante as consultarHistoriasClinicasAdultasDeEstudiante } from '../../../models/hc/hcModels/listaHcAdultos.js';

export const listarHistoriasClinicasAdultasDeEstudiante = async (req, res) => {
  try {
    const { id } = req.params;
    const historias = await consultarHistoriasClinicasAdultasDeEstudiante(id);
    if (!historias || historias.length === 0) {
      return res.status(200).json([]);
    }
    return res.status(200).json(historias);
  } catch (error) {
    // console.error('Error en listarHistoriasClinicasAdultasDeEstudiante:', error);
    return res.status(500).json({
      error: error.message || 'Error al obtener historias clínicas adultas.',
    });
  }
};
