import pool from '../../db/db.js';

class EvolucionRepository {
  async consultarEvoluciones(idHistory) {
    const id = String(idHistory || '');
    if (!id) {
      return [];
    }
    const result = await pool.query(
      'SELECT * FROM evolucion WHERE id_historia = $1 ORDER BY fecha DESC, id_evolucion DESC',
      [id]
    );
    return result.rows;
  }

  async registrarEvolucion(aggregateOrObj) {
    const params =
      aggregateOrObj && typeof aggregateOrObj.obtenerParametros === 'function'
        ? aggregateOrObj.obtenerParametros()
        : [
            aggregateOrObj?.idHistory,
            aggregateOrObj?.fecha,
            aggregateOrObj?.actividad,
            aggregateOrObj?.alumno,
            aggregateOrObj?.idUsuario,
          ];
    await pool.query('CALL i_evolucion($1, $2, $3, $4, $5)', params);
    return true;
  }
}

export { EvolucionRepository };
