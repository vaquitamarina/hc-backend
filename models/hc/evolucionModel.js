import pool from '../../db/db.js';

export async function consultarEvoluciones(idHistory) {
  try {
    const result = await pool.query(
      'SELECT * FROM evolucion WHERE id_historia = $1 ORDER BY fecha DESC, id_evolucion DESC',
      [idHistory]
    );
    return result.rows;
  } catch (error) {
    // console.error('Error getEvolucion:', error);
    throw error;
  }
}

export async function registrarEvolucion({
  idHistory,
  fecha,
  actividad,
  alumno,
  idUsuario,
}) {
  try {
    await pool.query('CALL i_evolucion($1, $2, $3, $4, $5)', [
      idHistory,
      fecha,
      actividad,
      alumno,
      idUsuario,
    ]);
    return true;
  } catch (error) {
    // console.error('Error addEvolucion:', error);
    throw error;
  }
}
