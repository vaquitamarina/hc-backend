// Value Object para Contraseña
class Password {
  #value;
  constructor(value) {
    if (!Password.isValid(value)) {
      throw new Error('Contraseña inválida');
    }
    this.#value = value;
    Object.freeze(this);
  }

  static isValid(value) {
    // Debe tener: al menos 1 mayúscula, 1 símbolo, 1 número y letras
    return (
      typeof value === 'string' &&
      value.length >= 8 &&
      /[A-Z]/.test(value) &&
      /[0-9]/.test(value) &&
      /[!@#$%^&*(),.?":{}|<>]/.test(value) &&
      /[a-zA-Z]/.test(value)
    );
  }

  get value() {
    return this.#value;
  }

  equals(other) {
    return other instanceof Password && other.value === this.value;
  }
}

export default Password;
