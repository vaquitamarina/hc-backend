import pool from '../../db/db.js';

export async function consultarDerivacionClinicas(idHistory) {
  try {
    const result = await pool.query(
      'SELECT * FROM derivacion_clinicas WHERE id_historia = $1',
      [idHistory]
    );
    const data = result.rows[0];
    if (!data) {
      return null;
    }

    return {
      destinos: data.destinos || {},
      observaciones: data.observaciones,
      fechaDerivacion: data.fecha_derivacion,
      alumno: data.alumno_diagnostico,
      docente: data.docente,
    };
  } catch (error) {
    // console.error('Error getDerivacion:', error);
    throw error;
  }
}

export async function actualizarDerivacionClinicas({
  idHistory,
  destinos,
  observaciones,
  alumno,
  docente,
  idUsuario,
}) {
  try {
    await pool.query('CALL i_derivacion_clinicas($1, $2, $3, $4, $5, $6)', [
      idHistory,
      JSON.stringify(destinos),
      observaciones,
      alumno,
      docente,
      idUsuario,
    ]);
    return true;
  } catch (error) {
    // console.error('Error updateDerivacion:', error);
    throw error;
  }
}
