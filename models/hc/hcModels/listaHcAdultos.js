// Modelo para obtener historias clínicas de pacientes adultos de un estudiante específico
import pool from '../../../db/db.js';

export async function getAdultHistoriasByStudent(idEstudiante) {
  const query = `SELECT * FROM fn_listar_historias_clinicas_adultos_por_estudiante($1)`;
  const { rows } = await pool.query(query, [idEstudiante]);
  return rows;
}
