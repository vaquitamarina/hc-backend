import pool from '../../db/db.js';

/**
 * Repositorio de enfermedad actual (Adaptador Secundario) para PostgreSQL.
 */
export class EnfermedadActualRepository {
  /**
   * Registra la enfermedad actual usando un agregado de dominio.
   * @param {{ obtenerParametros: () => Array<unknown>, idHistoria: string }} agregado
   * @returns {Promise<{success: boolean, id_historia: string}>}
   */
  async create(agregado) {
    const query = 'CALL i_enfermedad_actual($1,$2,$3,$4,$5,$6,$7)';
    await pool.query(query, agregado.obtenerParametros());
    return { success: true, id_historia: agregado.idHistoria };
  }

  /**
   * Consulta una enfermedad actual por historia clinica.
   * @param {string} id_historia
   * @returns {Promise<Object|undefined>}
   */
  async getByHistoria(id_historia) {
    const query = 'SELECT * FROM enfermedad_actual WHERE id_historia = $1';
    const { rows } = await pool.query(query, [id_historia]);
    return rows[0];
  }

  /**
   * Actualiza la enfermedad actual usando un agregado de dominio.
   * @param {{ obtenerParametros: () => Array<unknown>, idHistoria: string }} agregado
   * @returns {Promise<{success: boolean, id_historia: string}>}
   */
  async update(agregado) {
    const query = 'CALL u_enfermedad_actual($1,$2,$3,$4,$5,$6,$7)';
    await pool.query(query, agregado.obtenerParametros());
    return { success: true, id_historia: agregado.idHistoria };
  }
}

const enfermedadActualRepository = new EnfermedadActualRepository();

export default enfermedadActualRepository;
