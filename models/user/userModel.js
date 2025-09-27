import argon2 from 'argon2';

import pool from '../../db/db.js';

export class UserModel {
  static async insert(userData) {
    const { userCode, firstName, lastName, dni, email, role, password } =
      userData;

    try {
      const hashedPassword = await argon2.hash(password);

      await pool.query('CALL register_user($1, $2, $3, $4, $5, $6, $7)', [
        userCode,
        firstName,
        lastName,
        dni,
        email,
        role,
        hashedPassword,
      ]);

      return true;
    } catch (error) {
      console.error('Error al registrar usuario:', error.message);
      return null;
    }
  }

  static async getUserById(id) {
    const result = await pool.query(
      'SELECT id_usuario, usuario_login, nombre, apellido, dni, email FROM usuarios WHERE id_usuario = $1',
      [id]
    );
    if (result.rows.length === 0) {
      return null;
    }
    return result.rows[0];
  }

  static async login(userCode, password) {
    const result = await pool.query('SELECT * FROM get_user_login($1)', [
      userCode,
    ]);
    if (result.rows.length === 0) {
      return null;
    }
    const user = result.rows[0];
    const isPasswordValid = await argon2.verify(user.contrasena_hash, password);
    if (!isPasswordValid) {
      console.log('Invalid password');
      return null;
    }
    console.log('Sesion iniciada, usuario:', user.nombre);
    return {
      id: user.id_usuario,
      userCode: userCode,
      firstName: user.nombre,
      lastName: user.apellido,
      dni: user.dni,
      email: user.email,
      role: user.rol,
    };
  }
}
