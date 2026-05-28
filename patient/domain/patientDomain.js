/**
 * Dominio: Patient
 * Value Objects, DomainError y Aggregate Root.
 * No se accede a la base de datos desde aquí.
 */

class DomainError extends Error {
  constructor(message) {
    super(message);
    this.name = 'DomainError';
    Object.freeze(this);
  }
}

/**
 * NombreValueObject
 */
class NombreValueObject {
  constructor(value) {
    if (typeof value !== 'string' || value.trim().length === 0) {
      throw new DomainError('nombre es requerido');
    }
    this.value = value.trim();
    Object.freeze(this);
  }
}

/**
 * ApellidoValueObject
 */
class ApellidoValueObject {
  constructor(value) {
    if (typeof value !== 'string' || value.trim().length === 0) {
      throw new DomainError('apellido es requerido');
    }
    this.value = value.trim();
    Object.freeze(this);
  }
}

/**
 * FechaNacimientoValueObject — acepta null o fecha válida
 */
class FechaNacimientoValueObject {
  constructor(value) {
    if (!value) {
      this.value = null;
      Object.freeze(this);
      return;
    }
    const d = new Date(value);
    if (Number.isNaN(d.getTime())) {
      throw new DomainError('fechaNacimiento inválida');
    }
    this.value = d.toISOString().split('T')[0];
    Object.freeze(this);
  }
}

/**
 * IdUuidValueObject — valida longitud y formato básico de UUID
 */
class IdUuidValueObject {
  constructor(value) {
    if (typeof value !== 'string' || value.length !== 36) {
      throw new DomainError('ID de paciente inválido');
    }
    this.value = value;
    Object.freeze(this);
  }
}

/**
 * Aggregate root: PatientAggregate
 */
class PatientAggregate {
  constructor({
    nombreVO,
    apellidoVO,
    dni,
    fechaNacimientoVO,
    sexo,
    telefono,
    email,
  } = {}) {
    if (!(nombreVO instanceof NombreValueObject)) {
      throw new DomainError('nombreVO inválido');
    }
    if (!(apellidoVO instanceof ApellidoValueObject)) {
      throw new DomainError('apellidoVO inválido');
    }
    this._nombre = nombreVO;
    this._apellido = apellidoVO;
    this._dni = dni || null;
    this._fechaNacimiento = fechaNacimientoVO || null;
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

export {
  DomainError,
  NombreValueObject,
  ApellidoValueObject,
  FechaNacimientoValueObject,
  IdUuidValueObject,
  PatientAggregate,
};
