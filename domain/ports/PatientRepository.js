/**
 * PatientRepository - Puerto Secundario (Driven Port)
 * Define el contrato para persistencia de Pacientes
 */
export class PatientRepository {
  /**
   * Crea un nuevo paciente
   * @param {Object} patientData
   * @returns {Promise<Object>}
   */
  async createPatient(patientData) {
    throw new Error('createPatient() must be implemented');
  }

  /**
   * Actualiza un paciente
   * @param {string} id
   * @param {Object} patientData
   * @returns {Promise<boolean>}
   */
  async updatePatient(id, patientData) {
    throw new Error('updatePatient() must be implemented');
  }

  /**
   * Obtiene pacientes adultos de un estudiante
   * @param {string} studentId
   * @returns {Promise<Array>}
   */
  async getAdultPatientsByStudentId(studentId) {
    throw new Error('getAdultPatientsByStudentId() must be implemented');
  }
}
