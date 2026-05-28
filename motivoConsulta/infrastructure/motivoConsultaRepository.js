import pool from '../../db/db.js';

/**
 * Repositorio de motivo de consulta (Adaptador Secundario) para PostgreSQL.
 */
export class MotivoConsultaRepository {
  /**
   * Registra el motivo de consulta usando un agregado de dominio.
   * @param {{ obtenerParametros: () => Array<unknown> }} agregado
   * @returns {Promise<boolean>}
   */
  async create(agregado) {
    const query = 'CALL i_motivo_consulta($1, $2)';
    await pool.query(query, agregado.obtenerParametros());
    return true;
  }

  /**
   * Consulta un motivo por id de historia clinica.
   * @param {string} id_historia
   * @returns {Promise<Object|undefined>}
   */
  async getByHistoria(id_historia) {
    const query = 'SELECT * FROM motivo_consulta WHERE id_historia = $1';
    const { rows } = await pool.query(query, [id_historia]);
    return rows[0];
  }

  /**
   * Actualiza motivo de consulta por id de historia clinica.
   * @param {{ idHistoria: string, motivo: string }} agregado
   * @returns {Promise<boolean>}
   */
  async update(agregado) {
    const query = 'CALL u_motivo_consulta($1, $2)';
    await pool.query(query, [agregado.idHistoria, agregado.motivo]);
    return true;
  }
}

const motivoConsultaRepository = new MotivoConsultaRepository();

export default motivoConsultaRepository;
