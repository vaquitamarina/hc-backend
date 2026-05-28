/**
 * CatalogoRepository (Adaptador Secundario)
 * Encapsula las consultas SQL a PostgreSQL usando `pool.query`.
 */
import pool from '../../db/db.js';

class CatalogoRepository {
  /**
   * Listar todas las filas de un catálogo validado.
   * @param {CatalogoAggregate} aggregate
   */
  async listar(aggregate) {
    const [nombre] = aggregate.obtenerParametros();
    // `nombre` está validado en el dominio; usamos plantilla para tabla.
    const result = await pool.query(`SELECT * FROM ${nombre}`);
    return result.rows;
  }

  /**
   * Obtener nombre (o descripción) por id desde un catálogo validado.
   * @param {CatalogoAggregate} aggregate
   * @param {IdPositiveValueObject} idVO
   */
  async obtenerNombre(aggregate, idVO) {
    const [nombre] = aggregate.obtenerParametros();
    const result = await pool.query(
      `SELECT * FROM ${nombre} WHERE id_grupo_sanguineo = $1`,
      [idVO.value]
    );
    if (!result.rows.length) {
      return null;
    }
    const row = result.rows[0];
    return row.nombre || row.descripcion || null;
  }
}

export { CatalogoRepository };
