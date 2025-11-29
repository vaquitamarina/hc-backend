// Controlador para obtener historias clínicas de pacientes adultos de un estudiante específico
import { getAdultHistoriasByStudent } from '../../../models/hc/hcModels/listaHcAdultos.js';

export async function listaHcAdultos(req, res) {
  try {
    const { id } = req.params;
    const historias = await getAdultHistoriasByStudent(id);
    res.json(historias);
  } catch (error) {
    res
      .status(500)
      .json({ error: 'Error al obtener historias clínicas adultas.' });
  }
}
