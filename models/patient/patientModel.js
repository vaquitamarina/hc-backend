import pool from '../../db/db.js';

export class PatientModel {
  /**
   * Crear un nuevo paciente usando la función fn_crear_paciente
   * @returns {Object} { id: UUID del paciente creado }
   */
  static async createPatient(
    nombre,
    apellido,
    dni,
    fechaNacimiento,
    sexo, // 'Masculino' o 'Femenino'
    telefono,
    email
  ) {
    try {
      const result = await pool.query(
        'SELECT fn_crear_paciente($1, $2, $3, $4, $5, $6, $7) AS id_paciente',
        [nombre, apellido, dni, fechaNacimiento, sexo, telefono, email]
      );

      const idPaciente = result.rows[0].id_paciente;

      return {
        id: idPaciente,
      };
    } catch (error) {
      console.error('Error al crear paciente:', error.message);
      throw error;
    }
  }
}
