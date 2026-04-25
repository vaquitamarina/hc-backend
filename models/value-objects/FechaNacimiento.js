// Value Object para Fecha de Nacimiento
class FechaNacimiento {
  #value;
  constructor(value) {
    if (!FechaNacimiento.isValid(value)) {
      throw new Error('Fecha de nacimiento inválida');
    }
    this.#value = value;
    Object.freeze(this);
  }

  static isValid(value) {
    // Debe ser una fecha válida y no futura
    const date = new Date(value);
    return !isNaN(date.getTime()) && date <= new Date();
  }

  get value() {
    return this.#value;
  }

  equals(other) {
    return other instanceof FechaNacimiento && other.value === this.value;
  }
}

export default FechaNacimiento;
