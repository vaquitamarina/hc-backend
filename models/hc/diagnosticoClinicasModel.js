import pool from '../../db/db.js';

export async function consultarDiagnosticoClinicas(idHistory) {
  try {
    const result = await pool.query(
      `SELECT 
            fecha, 
            clinica_respuesta, 
            descripcion,
            examenes_auxiliares, 
            interconsulta_detalle, 
            fecha_interconsulta, 
            clinica_interconsulta, 
            diagnostico_definitivo, 
            tratamiento_realizar, 
            pronostico, 
            alumno_tratante 
         FROM diagnostico 
         WHERE id_historia = $1 AND tipo = 'definitivo_clinicas'`,
      [idHistory]
    );

    return result.rows[0] || {};
  } catch (error) {
    // console.error('Error getDiagnosticoClinicas:', error);
    throw error;
  }
}

export async function actualizarDiagnosticoClinicas({
  idHistory,
  data,
  idUsuario,
}) {
  try {
    await pool.query(
      `CALL i_diagnostico_clinicas(
          $1::uuid, $2::date, $3::varchar, $4::text, 
          $5::jsonb, 
          $6::text, $7::date, $8::varchar, 
          $9::text, $10::text, $11::text, $12::varchar, 
          $13::uuid
        )`,
      [
        idHistory,
        data.fechaRespuesta || null,
        data.clinicaRespuesta || null,
        data.descripcionRespuesta || null,
        JSON.stringify(data.examenes || {}),
        data.interconsultaTipo || null,
        data.interconsultaFecha || null,
        data.interconsultaClinica || null,
        data.diagnosticoDefinitivo || null,
        data.tratamiento || null,
        data.pronostico || null,
        data.alumnoTratante || null,
        idUsuario,
      ]
    );
    return true;
  } catch (error) {
    // console.error('Error updateDiagnosticoClinicasCompleto:', error);
    throw error;
  }
}
