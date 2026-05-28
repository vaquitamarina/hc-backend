/**
 * Dominio: StudentUsers
 * Value Objects, DomainError y Aggregate Root.
 * Sin acceso a BD.
 */

/**
 * Error de dominio para validaciones estrictas.
 * @extends Error
 */
class DomainError extends Error {
  constructor(message) {
    super(message);
    this.name = 'DomainError';
    Object.freeze(this);
  }
}

/**
 * Value Object: Role (se espera 'estudiante')
 */
class RoleValueObject {
  constructor(value) {
    if (typeof value !== 'string' || value.trim().length === 0) {
      throw new DomainError('role es requerido');
    }
    const v = value.trim().toLowerCase();
    if (v !== 'estudiante') {
      throw new DomainError('role inválido — se espera "estudiante"');
    }
    this.value = v;
    Object.freeze(this);
  }
}

/**
 * Aggregate Root: StudentUsersAggregate
 * Protege invariantes y expone parámetros posicionales para la capa de infraestructura.
 */
class StudentUsersAggregate {
  constructor({ roleVO } = {}) {
    if (!(roleVO instanceof RoleValueObject)) {
      throw new DomainError('roleVO inválido');
    }
    this._role = roleVO;
    Object.freeze(this);
  }

  /**
   * Devuelve parámetros posicionales para la consulta SQL.
   * @returns {Array}
   */
  obtenerParametros() {
    return [this._role.value];
  }
}

export { DomainError, RoleValueObject, StudentUsersAggregate };
