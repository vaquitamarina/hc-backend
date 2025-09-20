import pool from '../../db/db.js';
export class UserModel {
  static async insert(userData) {
    //ejemplo de query, borrar e implementar como dice en el jira.
    await pool.query('CALL register_user($1, $2, $3, $4, $5, $6)', [
      firstName,
      lastName,
      dni,
      email,
      role,
      passwordHash,
    ]);
  }
}
