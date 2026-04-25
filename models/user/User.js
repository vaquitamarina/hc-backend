// Aggregate Root para Usuario
import DNI from '../value-objects/DNI.js';
import Email from '../value-objects/Email.js';
import FechaNacimiento from '../value-objects/FechaNacimiento.js';
import Password from '../value-objects/Password.js';

class User {
  constructor(id, userCode, firstName, lastName, dni, email, fechaNacimiento, password, role) {
    this.id = id;
    this.userCode = userCode;
    this.firstName = firstName;
    this.lastName = lastName;
    this.dni = new DNI(dni);
    this.email = new Email(email);
    this.fechaNacimiento = new FechaNacimiento(fechaNacimiento);
    this.password = new Password(password);
    this.role = role;
    // In DDD, aggregates should be consistent, so freeze or validate here
  }

  // Métodos de dominio
  updateEmail(newEmail) {
    this.email = new Email(newEmail);
  }

  updatePassword(newPassword) {
    this.password = new Password(newPassword);
  }

  // Otros métodos según reglas de negocio

  // Para serialización o persistencia
  toPlainObject() {
    return {
      id: this.id,
      userCode: this.userCode,
      firstName: this.firstName,
      lastName: this.lastName,
      dni: this.dni.value,
      email: this.email.value,
      fechaNacimiento: this.fechaNacimiento.value,
      password: this.password.value, // Nota: en producción, no devolver la contraseña plana
      role: this.role,
    };
  }
}

export default User;