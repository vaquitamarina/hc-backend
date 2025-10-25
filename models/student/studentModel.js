import pool from '../../db/db.js';

export class StudentModel {
  static async getAdultPatientsByStudentId(studentId) {
    try {
      const result = await pool.query(
        'SELECT * FROM fn_obtener_pacientes_adultos($1)',
        [studentId]
      );

      return result.rows.map((row) => ({
        idPatient: row.id_paciente,
        idHistory: row.id_historia,
        name: row.nombre_completo,
        age: row.edad,
        phone: row.telefono,
        email: row.email,
        gender: row.sexo,
        lastUpdate: row.ultima_modificacion,
      }));
    } catch (error) {
      console.error('Error al obtener pacientes adultos:', error.message);
      throw error;
    }
  }
}
