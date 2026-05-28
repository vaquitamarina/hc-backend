/**
 * Adaptador Secundario: ListaHcAdultosRepository
 * Encapsula el acceso a PostgreSQL mediante `pool.query`.
 */
import pool from '../../db/db.js';

class ListaHcAdultosRepository {
  /**
   * Lista historias clínicas adultas por id de estudiante
   * @param {ListaHcAdultosAggregate} aggregate
   * @returns {Promise<Array>}
   */
  async listarPorEstudiante(aggregate) {
    const params = aggregate.obtenerParametros();
    const query =
      'SELECT * FROM fn_listar_historias_clinicas_adultos_por_estudiante($1)';
    const { rows } = await pool.query(query, params);
    return rows || [];
  }
}

export { ListaHcAdultosRepository };
