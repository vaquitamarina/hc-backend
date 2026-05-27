import pool from '../../../db/db.js';

export async function consultarHigieneBocal(idHistory) {
  try {
    const result = await pool.query(
      'SELECT estado_higiene FROM examen_higiene_oral WHERE id_historia = $1',
      [idHistory]
    );

    const data = result.rows[0];
    if (!data) {
      return null;
    }

    return {
      estadoHigiene: data.estado_higiene,
    };
  } catch (error) {
    // console.error('Error al obtener higiene oral:', error.message);
    throw error;
  }
}

export async function actualizarHigieneBocal({
  idHistory,
  estadoHigiene,
  idUsuario,
}) {
  try {
    await pool.query('CALL i_examen_higiene_oral($1, $2, $3)', [
      idHistory,
      estadoHigiene,
      idUsuario,
    ]);
    return true;
  } catch (error) {
    // console.error('Error al actualizar higiene oral:', error.message);
    throw error;
  }
}
