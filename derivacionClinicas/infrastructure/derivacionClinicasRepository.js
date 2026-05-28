import pool from '../../db/db.js';

class DerivacionClinicasRepository {
  async consultarPorHistoria(idHistory) {
    const id = String(idHistory || '');
    if (!id) {
      return null;
    }
    const result = await pool.query(
      'SELECT * FROM derivacion_clinicas WHERE id_historia = $1',
      [id]
    );
    const data = result.rows[0];
    if (!data) {
      return null;
    }
    let destinos = {};
    try {
      destinos = data.destinos ? JSON.parse(data.destinos) : {};
    } catch {
      destinos = data.destinos || {};
    }
    return {
      destinos,
      observaciones: data.observaciones,
      fechaDerivacion: data.fecha_derivacion,
      alumno: data.alumno_diagnostico,
      docente: data.docente,
    };
  }

  async actualizarDerivacionClinicas(aggregateOrObj) {
    const params =
      aggregateOrObj && typeof aggregateOrObj.obtenerParametros === 'function'
        ? aggregateOrObj.obtenerParametros()
        : [
            aggregateOrObj?.idHistory,
            JSON.stringify(aggregateOrObj?.destinos || {}),
            aggregateOrObj?.observaciones,
            aggregateOrObj?.alumno,
            aggregateOrObj?.docente,
            aggregateOrObj?.idUsuario,
          ];

    await pool.query(
      'CALL i_derivacion_clinicas($1, $2, $3, $4, $5, $6)',
      params
    );
    return true;
  }
}

export { DerivacionClinicasRepository };
