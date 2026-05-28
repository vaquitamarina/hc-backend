import pool from '../../db/db.js';

class DiagnosticoClinicasRepository {
  async consultarPorHistoria(idHistory) {
    const id = String(idHistory || '');
    if (!id) {
      return null;
    }
    const mapRow = (row) => {
      if (!row) {
        return null;
      }
      let examenes = {};
      try {
        examenes = row.examenes_auxiliares
          ? JSON.parse(row.examenes_auxiliares)
          : {};
      } catch {
        examenes = row.examenes_auxiliares || {};
      }
      return {
        fecha: row.fecha,
        clinicaRespuesta: row.clinica_respuesta,
        descripcion: row.descripcion,
        examenesAuxiliares: examenes,
        interconsultaDetalle: row.interconsulta_detalle,
        fechaInterconsulta: row.fecha_interconsulta,
        clinicaInterconsulta: row.clinica_interconsulta,
        diagnosticoDefinitivo: row.diagnostico_definitivo,
        tratamientoRealizar: row.tratamiento_realizar,
        pronostico: row.pronostico,
        alumnoTratante: row.alumno_tratante,
      };
    };

    const result = await pool.query(
      `SELECT fecha, clinica_respuesta, descripcion, examenes_auxiliares, interconsulta_detalle, fecha_interconsulta, clinica_interconsulta, diagnostico_definitivo, tratamiento_realizar, pronostico, alumno_tratante FROM diagnostico WHERE id_historia = $1 AND tipo = 'definitivo_clinicas'`,
      [id]
    );
    if (result.rows[0]) {
      return mapRow(result.rows[0]);
    }

    const fallbackResult = await pool.query(
      `SELECT fecha, clinica_respuesta, descripcion, examenes_auxiliares, interconsulta_detalle, fecha_interconsulta, clinica_interconsulta, diagnostico_definitivo, tratamiento_realizar, pronostico, alumno_tratante FROM diagnostico WHERE id_historia = $1 ORDER BY fecha DESC NULLS LAST LIMIT 1`,
      [id]
    );
    return mapRow(fallbackResult.rows[0]);
  }

  async actualizarDiagnosticoClinicas(aggregateOrObj) {
    const params =
      aggregateOrObj && typeof aggregateOrObj.obtenerParametros === 'function'
        ? aggregateOrObj.obtenerParametros()
        : [
            aggregateOrObj?.idHistory,
            aggregateOrObj?.fechaRespuesta,
            aggregateOrObj?.clinicaRespuesta,
            aggregateOrObj?.descripcionRespuesta,
            JSON.stringify(aggregateOrObj?.examenes || {}),
            aggregateOrObj?.interconsultaTipo,
            aggregateOrObj?.interconsultaFecha,
            aggregateOrObj?.interconsultaClinica,
            aggregateOrObj?.diagnosticoDefinitivo,
            aggregateOrObj?.tratamiento,
            aggregateOrObj?.pronostico,
            aggregateOrObj?.alumnoTratante,
            aggregateOrObj?.idUsuario,
          ];

    await pool.query(
      `CALL i_diagnostico_clinicas($1::uuid, $2::date, $3::varchar, $4::text, $5::jsonb, $6::text, $7::date, $8::varchar, $9::text, $10::text, $11::text, $12::varchar, $13::uuid)`,
      params
    );
    return true;
  }
}

export { DiagnosticoClinicasRepository };
