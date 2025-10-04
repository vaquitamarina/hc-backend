import pool from '../../db/db.js';

export class StudentModel {
  static async getAdultPatientsByStudentId(studentId) {
    try {
      const result = await pool.query(
        'SELECT * FROM fn_obtener_paciente_adulto($1)',
        [studentId]
      );

      // Transform the database result to match the expected response format
      return result.rows.map((row) => ({
        idPatient: row.id_paciente,
        name: row.nombre_completo,
        lastUpdate: row.ultima_modificacion,
      }));
    } catch (error) {
      console.error('Error al obtener pacientes adultos:', error.message);
      throw error;
    }
  }

  static async registerPatient(
    studentId,
    nombreCompleto,
    edad,
    idSexo,
    telefono,
    email
  ) {
    try {
      // First, insert the patient
      const patientResult = await pool.query(
        'INSERT INTO paciente (nombre_completo, edad, id_sexo, telefono, email) VALUES ($1, $2, $3, $4, $5) RETURNING *',
        [nombreCompleto, edad, idSexo, telefono, email]
      );

      const newPatient = patientResult.rows[0];

      // Then, create the clinical history associating the patient with the student
      await pool.query(
        'INSERT INTO historia_clinica (id_paciente, id_estudiante) VALUES ($1, $2)',
        [newPatient.id_paciente, studentId]
      );

      return {
        idPatient: newPatient.id_paciente,
        name: newPatient.nombre_completo,
        age: newPatient.edad,
        gender: newPatient.id_sexo,
        phone: newPatient.telefono,
        email: newPatient.email,
      };
    } catch (error) {
      console.error('Error al registrar paciente:', error.message);
      throw error;
    }
  }
}
