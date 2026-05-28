import pool from '../../db/db.js';

class DiagnosticoPresuntivoRepository {
  async consultarPorHistoria(idHistory) {
    const id = String(idHistory || '');
    if (!id) {
      return { descripcion: '' };
    }
    const result = await pool.query(
      `SELECT descripcion FROM diagnostico WHERE id_historia = $1 AND tipo = 'presuntivo' ORDER BY fecha DESC NULLS LAST LIMIT 1`,
      [id]
    );
    if (!result.rows[0]) {
      return { descripcion: '' };
    }
    return { descripcion: result.rows[0].descripcion || '' };
  }

  async actualizarDiagnosticoPresuntivo(aggregateOrObj) {
    const params =
      aggregateOrObj && typeof aggregateOrObj.obtenerParametros === 'function'
        ? aggregateOrObj.obtenerParametros()
        : [
            aggregateOrObj?.idHistory,
            aggregateOrObj?.descripcion,
            aggregateOrObj?.idUsuario,
          ];
    await pool.query('CALL i_diagnostico_presuntivo($1, $2, $3)', params);
    return true;
  }
}

export { DiagnosticoPresuntivoRepository };
