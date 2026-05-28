/**
 * Adaptador Secundario: UserRepository
 * Encapsula consultas SQL usando `pool.query`.
 */
import pool from '../../db/db.js';

class UserRepository {
  async listarUsuarios() {
    const result = await pool.query('SELECT * FROM usuario');
    return result.rows;
  }

  async registrarUsuario(agregado) {
    const params = agregado.obtenerParametros();
    await pool.query(
      'CALL i_registrar_usuario($1, $2, $3, $4, $5, $6, $7)',
      params
    );
    return true;
  }

  async obtenerUsuarioPorId(id) {
    const result = await pool.query('SELECT * FROM fn_obtener_usuario($1)', [
      id,
    ]);
    if (result.rows.length === 0) {
      return null;
    }
    return result.rows[0];
  }

  async obtenerUsuarioLogin(userCode) {
    const result = await pool.query(
      'SELECT * FROM fn_obtener_usuario_login($1)',
      [userCode]
    );
    if (result.rows.length === 0) {
      return null;
    }
    return result.rows[0];
  }
}

export { UserRepository };
