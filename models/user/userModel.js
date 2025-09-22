import argo2 from 'argon2';

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

  static async login(userCode, password) {
    const result = await pool.query('SELECT * FROM get_user_login($1)', [
      userCode,
    ]);
    if (result.rows.length === 0) {
      return null;
    }
    const user = result.rows[0];
    const isPasswordValid = await argo2.verify(user.contrasena_hash, password);
    if (!isPasswordValid) {
      //debug
      console.log('Invalid password');
      return null;
    }
    //dbugline
    console.log('Sesion iniciada, usuario:', user.nombre);
    return {
      id: user.id_usuario,
      userCode: userCode,
      firsName: user.nombre,
      lastName: user.apellido,
      dni: user.dni,
      email: user.email,
      role: user.rol,
    };
  }
}
