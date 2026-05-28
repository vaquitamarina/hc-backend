import pool from '../../db/db.js';

class StudentUsersRepository {
  static async listarUsuariosEstudiantes() {
    const result = await pool.query(
      "SELECT * FROM usuario WHERE rol = 'estudiante'"
    );
    return result.rows;
  }
}

export default StudentUsersRepository;
