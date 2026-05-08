/**
 * StudentRepository - Puerto Secundario (Driven Port)
 * Define el contrato para persistencia de Estudiantes
 */
export class StudentRepository {
  /**
   * Obtiene pacientes adultos de un estudiante
   * @param {string} studentId
   * @returns {Promise<Array>}
   */
  async getAdultPatientsByStudentId(studentId) {
    throw new Error('getAdultPatientsByStudentId() must be implemented');
  }
}
