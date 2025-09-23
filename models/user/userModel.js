import argon2 from 'argon2';

import pool from '../../db/db.js';

export class UserModel {
  static async insert(userData) {
    const { userCode, firstName, lastName, dni, email, role, passwordHash } =
      userData;

    try {
      const hashedPassword = await argon2.hash(passwordHash);

      await pool.query('CALL register_user($1, $2, $3, $4, $5, $6, $7)', [
        userCode,
        firstName,
        lastName,
        dni,
        email,
        role,
        hashedPassword,
      ]);

      return { success: true, message: 'Usuario registrado exitosamente' };
    } catch (error) {
      if (error.code === '23505') {
        let campo = 'Campo duplicado';
        if (error.detail) {
          if (error.detail.includes('email')) {
            campo = 'Email';
          } else if (error.detail.includes('dni')) {
            campo = 'DNI';
          } else if (error.detail.includes('user_code')) {
            campo = 'Código de usuario';
          }
        }
        return { success: false, message: `${campo} ya existe` };
      }

      console.error('Error al registrar usuario:', error.message);
      return { success: false, message: error.message };
    }
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
