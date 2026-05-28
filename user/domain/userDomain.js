/**
 * Dominio: User
 * Value Objects, DomainError y Aggregate Root.
 * Sin acceso a BD.
 */

class DomainError extends Error {
  constructor(message) {
    super(message);
    this.name = 'DomainError';
    Object.freeze(this);
  }
}

class UserCodeValueObject {
  constructor(value) {
    if (typeof value !== 'string' || value.trim().length === 0) {
      throw new DomainError('userCode es requerido');
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
      throw new DomainError('email inválido');
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
  } = {}) {
    if (!(userCodeVO instanceof UserCodeValueObject)) {
      throw new DomainError('userCodeVO inválido');
    }
    if (!(emailVO instanceof EmailValueObject)) {
      throw new DomainError('emailVO inválido');
    }
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

export { DomainError, UserCodeValueObject, EmailValueObject, UserAggregate };
