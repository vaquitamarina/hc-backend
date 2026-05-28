import pool from '../../db/db.js';

/**
 * Repositorio de filiacion (Adaptador Secundario) para persistencia en PostgreSQL.
 */
export class FiliacionRepository {
  /**
   * Registra una filiacion usando el agregado de dominio.
   * @param {{ obtenerParametros: () => Array<unknown>, idHistoria: string }} agregado
   * @returns {Promise<{success: boolean, id_historia: string}>}
   */
  async create(agregado) {
    const query =
      'CALL i_filiacion($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20)';
    const values = agregado.obtenerParametros();
    await pool.query(query, values);
    return { success: true, id_historia: agregado.idHistoria };
  }

  /**
   * Obtiene una filiacion por historia clinica.
   * @param {string} id_historia
   * @returns {Promise<Object|undefined>}
   */
  async getByHistoria(id_historia) {
    const query = 'SELECT * FROM filiacion WHERE id_historia = $1';
    const { rows } = await pool.query(query, [id_historia]);
    return rows[0];
  }

  /**
   * Actualiza una filiacion por historia clinica.
   * @param {{ obtenerParametros: () => Array<unknown>, idHistoria: string }} agregado
   * @returns {Promise<{success: boolean, id_historia: string}>}
   */
  async update(agregado) {
    const query =
      'CALL u_filiacion($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20)';
    const values = agregado.obtenerParametros();
    await pool.query(query, values);
    return { success: true, id_historia: agregado.idHistoria };
  }
}

const filiacionRepository = new FiliacionRepository();

export default filiacionRepository;
