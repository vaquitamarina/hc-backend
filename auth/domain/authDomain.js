/**
 * Dominio: Auth
 * DomainError y validaciones del dominio para autenticación.
 */
class DomainError extends Error {
  constructor(message) {
    super(message);
    this.name = 'DomainError';
    Object.freeze(this);
  }
}

export { DomainError };
