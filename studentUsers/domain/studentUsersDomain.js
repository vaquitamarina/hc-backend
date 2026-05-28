/**
 * Dominio: studentUsers
 * Errores del dominio para la consulta de usuarios estudiantes.
 */
class DomainError extends Error {
  constructor(message) {
    super(message);
    this.name = 'DomainError';
    Object.freeze(this);
  }
}

export { DomainError };
