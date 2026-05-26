import pool from '../../db/db.js';

// Value Objects
class NombreValueObject {
  constructor(value) {
    if (typeof value !== 'string' || value.trim().length === 0) {
      throw new Error('nombre es requerido');
    }
    this.value = value.trim();
    Object.freeze(this);
  }
}

class ApellidoValueObject {
  constructor(value) {
    if (typeof value !== 'string' || value.trim().length === 0) {
      throw new Error('apellido es requerido');
    }
    this.value = value.trim();
    Object.freeze(this);
  }
}

class FechaNacimientoValueObject {
  constructor(value) {
    if (!value) {
      this.value = null;
      Object.freeze(this);
      return;
    }
    const d = new Date(value);
    if (Number.isNaN(d.getTime())) {
      throw new Error('fechaNacimiento inválida');
    }
    this.value = d.toISOString().split('T')[0];
    Object.freeze(this);
  }
}

class IdUuidValueObject {
  constructor(value) {
    if (typeof value !== 'string' || value.length !== 36) {
      throw new Error('ID de paciente inválido');
    }
    this.value = value;
    Object.freeze(this);
  }
}

// Aggregate
class PatientAggregate {
  constructor({
    nombreVO,
    apellidoVO,
    dni,
    fechaNacimientoVO,
    sexo,
    telefono,
    email,
  }) {
    this._nombre = nombreVO;
    this._apellido = apellidoVO;
    this._dni = dni || null;
    this._fechaNacimiento = fechaNacimientoVO;
    this._sexo = sexo || null;
    this._telefono = telefono || null;
    this._email = email || null;
    Object.freeze(this);
  }

  obtenerParametrosParaCrear() {
    return [
      this._nombre.value,
      this._apellido.value,
      this._dni || null,
      this._fechaNacimiento ? this._fechaNacimiento.value : null,
      this._sexo || null,
      this._telefono || null,
      this._email || null,
    ];
  }

  obtenerParametrosParaActualizar() {
    return [
      this._nombre ? this._nombre.value : null,
      this._apellido ? this._apellido.value : null,
      this._telefono || null,
      this._email || null,
    ];
  }
}

const PatientRepository = {
  async crearPacienteFromParams(params) {
    try {
      const result = await pool.query(
        'SELECT fn_crear_paciente($1, $2, $3, $4, $5, $6, $7) AS id_paciente',
        params
      );
      const idPaciente = result.rows[0].id_paciente;
      return { id: idPaciente };
    } catch (error) {
      throw new Error(error.message || 'Error al crear paciente');
    }
  },

  async actualizarPacienteConParams(id, paramsUpdate) {
    try {
      await pool.query('CALL u_paciente($1, $2, $3, $4, $5, $6)', [
        id,
        paramsUpdate[0] || null,
        paramsUpdate[1] || null,
        paramsUpdate[2] || null,
        paramsUpdate[3] || null,
        null,
      ]);
      return true;
    } catch (error) {
      throw new Error(error.message || 'Error al actualizar paciente');
    }
  },
};

export class PatientModel {
  /**
   * Crear un nuevo paciente usando la función fn_crear_paciente
   * @returns {Object} { id: UUID del paciente creado }
   */
  static async registrarPaciente(
    nombre,
    apellido,
    dni,
    fechaNacimiento,
    sexo,
    telefono,
    email
  ) {
    // This function expects primitives but controller should build an aggregate and pass primitives from it
    const params = [
      nombre,
      apellido,
      dni || null,
      fechaNacimiento || null,
      sexo || null,
      telefono || null,
      email || null,
    ];
    return PatientRepository.crearPacienteFromParams(params);
  }

  static async actualizarPaciente(id, nombre, apellido, telefono, email) {
    // id is expected to be a UUID string
    const paramsUpdate = [
      nombre || null,
      apellido || null,
      telefono || null,
      email || null,
    ];
    return PatientRepository.actualizarPacienteConParams(id, paramsUpdate);
  }

  static async createPatient(...args) {
    return this.registrarPaciente(...args);
  }

  static async updatePatient(...args) {
    return this.actualizarPaciente(...args);
  }
}

// Attach VOs and Aggregate to the class for controller-level access
PatientModel.NombreValueObject = NombreValueObject;
PatientModel.ApellidoValueObject = ApellidoValueObject;
PatientModel.FechaNacimientoValueObject = FechaNacimientoValueObject;
PatientModel.IdUuidValueObject = IdUuidValueObject;
PatientModel.PatientAggregate = PatientAggregate;

export {
  NombreValueObject,
  ApellidoValueObject,
  FechaNacimientoValueObject,
  IdUuidValueObject,
  PatientAggregate,
};
