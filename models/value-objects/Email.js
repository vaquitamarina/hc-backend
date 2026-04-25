// Value Object para Email
class Email {
  #value;
  constructor(value) {
    if (!Email.isValid(value)) {
      throw new Error('Email inválido');
    }
    this.#value = value;
    Object.freeze(this); // Inmutabilidad
  }

  static isValid(value) {
    // Validación básica de email
    return /^[\w-.]+@([\w-]+\.)+[\w-]{2,}$/.test(value);
  }

  get value() {
    return this.#value;
  }

  equals(other) {
    return other instanceof Email && other.value === this.value;
  }
}

export default Email;
