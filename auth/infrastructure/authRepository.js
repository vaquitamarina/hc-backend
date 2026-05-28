/**
 * Adaptador Secundario: AuthRepository
 * Encapsula la consulta SQL necesaria para autenticación.
 */
import pool from '../../db/db.js';

class AuthRepository {
  /**
   * Obtiene datos del usuario por `userCode` usando la función SQL de login.
   * @param {AuthAggregate} agregado
   * @returns {Object|null} fila del usuario o null
   */
  async obtenerUsuarioPorUserCode(agregado) {
    const params = agregado.obtenerParametros();
    const result = await pool.query(
      'SELECT * FROM fn_obtener_usuario_login($1)',
      params
    );
    if (result.rows.length === 0) {
      return null;
    }
    return result.rows[0];
  }
}

export { AuthRepository };
