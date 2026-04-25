// Value Object para DNI (Documento Nacional de Identidad)
class DNI {
  #value;
  constructor(value) {
    if (!DNI.isValid(value)) {
      throw new Error('DNI inválido');
    }
    this.#value = value;
    Object.freeze(this); // Inmutabilidad
  }

  static isValid(value) {
    // Ejemplo: DNI de 8 dígitos numéricos
    return /^\d{8}$/.test(value);
  }

  get value() {
    return this.#value;
  }

  equals(other) {
    return other instanceof DNI && other.value === this.value;
  }
}

export default DNI;
