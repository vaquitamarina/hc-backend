import argon2 from 'argon2';
import pool from '../../db/db.js';

// Value Objects
class UserCodeValueObject {
  constructor(value) {
    if (typeof value !== 'string' || value.trim().length === 0) {
      throw new Error('userCode es requerido');
    }
    this.value = value.trim();
    Object.freeze(this);
  }
}

class EmailValueObject {
  constructor(value) {
    if (
      typeof value !== 'string' ||
      !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(value)
    ) {
      throw new Error('email inválido');
    }
    this.value = value.trim();
    Object.freeze(this);
  }
}

class UserAggregate {
  constructor({
    userCodeVO,
    firstName,
    lastName,
    dni,
    emailVO,
    role,
    hashedPassword,
  }) {
    this._userCode = userCodeVO;
    this._firstName = firstName;
    this._lastName = lastName;
    this._dni = dni || null;
    this._email = emailVO;
    this._role = role || null;
    this._hashedPassword = hashedPassword || null;
    Object.freeze(this);
  }

  obtenerParametrosParaRegistrar() {
    return [
      this._userCode.value,
      this._firstName,
      this._lastName,
      this._dni,
      this._email.value,
      this._role,
      this._hashedPassword,
    ];
  }
}

const UserRepository = {
  async listarUsuarios() {
    const result = await pool.query('SELECT * FROM usuario');
    return result.rows;
  },

  async registrarUsuario(params) {
    try {
      await pool.query(
        'CALL i_registrar_usuario($1, $2, $3, $4, $5, $6, $7)',
        params
      );
      return true;
    } catch (err) {
      throw new Error(err.message || 'Error al registrar usuario');
    }
  },

  async obtenerUsuarioPorId(id) {
    const result = await pool.query('SELECT * FROM fn_obtener_usuario($1)', [
      id,
    ]);
    if (result.rows.length === 0) {
      return null;
    }
    return result.rows[0];
  },

  async obtenerUsuarioLogin(userCode) {
    const result = await pool.query(
      'SELECT * FROM fn_obtener_usuario_login($1)',
      [userCode]
    );
    if (result.rows.length === 0) {
      return null;
    }
    return result.rows[0];
  },
};

export class UserModel {
  static async listarUsuarios() {
    return UserRepository.listarUsuarios();
  }

  static async registrarUsuario(
    userCode,
    firstName,
    lastName,
    dni,
    email,
    role,
    password
  ) {
    const userCodeVO = new UserCodeValueObject(userCode);
    const emailVO = new EmailValueObject(email);
    const hashedPassword = await argon2.hash(password);
    const agg = new UserAggregate({
      userCodeVO,
      firstName,
      lastName,
      dni,
      emailVO,
      role,
      hashedPassword,
    });
    await UserRepository.registrarUsuario(agg.obtenerParametrosParaRegistrar());
    return {
      userCode: agg._userCode.value,
      firstName: agg._firstName,
      lastName: agg._lastName,
      dni: agg._dni,
      email: agg._email.value,
      role: agg._role,
    };
  }

  static async obtenerUsuarioPorId(id) {
    return UserRepository.obtenerUsuarioPorId(id);
  }

  static async autenticarUsuario(userCode, password) {
    const row = await UserRepository.obtenerUsuarioLogin(userCode);
    if (!row) {
      return null;
    }
    const isPasswordValid = await argon2.verify(row.contrasena_hash, password);
    if (!isPasswordValid) {
      return null;
    }
    return {
      id: row.id_usuario,
      userCode,
      firstName: row.nombre,
      lastName: row.apellido,
      dni: row.dni,
      email: row.email,
      role: row.rol,
    };
  }

  static async register(...args) {
    return this.registrarUsuario(...args);
  }

  static async getAll() {
    return this.listarUsuarios();
  }

  static async getUserById(id) {
    return this.obtenerUsuarioPorId(id);
  }

  static async login(userCode, password) {
    return this.autenticarUsuario(userCode, password);
  }
}

// Expose VOs/Aggregate for controllers if needed
UserModel.UserCodeValueObject = UserCodeValueObject;
UserModel.EmailValueObject = EmailValueObject;
UserModel.UserAggregate = UserAggregate;

export { UserCodeValueObject, EmailValueObject, UserAggregate };
