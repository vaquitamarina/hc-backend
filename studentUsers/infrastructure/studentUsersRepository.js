/**
 * Adaptador Secundario: StudentUsersRepository
 * Encapsula consultas SQL usando `pool.query`.
 */
import pool from '../../db/db.js';

class StudentUsersRepository {
  /**
   * Lista los usuarios con rol proporcionado en el agregado.
   * @param {StudentUsersAggregate} agregado
   * @returns {Array} filas de usuario
   */
  async listarEstudiantes(agregado) {
    const params = agregado.obtenerParametros();
    const result = await pool.query(
      'SELECT * FROM usuario WHERE rol = $1',
      params
    );
    return result.rows;
  }
}

export { StudentUsersRepository };
