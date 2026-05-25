import pool from '../../db/db.js';

export class StudentModel {
  static async consultarPacientesAdultosPorEstudiante(studentId) {
    try {
      const result = await pool.query(
        'SELECT * FROM fn_obtener_pacientes_adultos($1)',
        [studentId]
      );

      // Devolver los datos directamente en español como vienen de la BD
      return result.rows;
    } catch (error) {
      // console.error('Error al obtener pacientes adultos');
      throw new Error(error.message || 'Error al obtener pacientes adultos');
    }
  }

  static async getAdultPatientsByStudentId(studentId) {
    return this.consultarPacientesAdultosPorEstudiante(studentId);
  }
}
