/**
 * HcRepository - Puerto Secundario (Driven Port)
 * Define el contrato para persistencia de Historia Clínica
 * Implementación concreta: HcJpaRepository
 */
export class HcRepository {
  /**
   * Registra una nueva historia clínica
   * @param {string} idStudent - ID del estudiante
   * @returns {Promise<Object>} Historia clínica creada
   */
  async registerHc(idStudent) {
    throw new Error('registerHc() must be implemented');
  }

  /**
   * Obtiene todas las historias clínicas de un estudiante
   * @param {string} studentId - ID del estudiante
   * @returns {Promise<Array>} Array de historias clínicas
   */
  async getAllByStudentId(studentId) {
    throw new Error('getAllByStudentId() must be implemented');
  }

  /**
   * Obtiene la filiación por ID de historia
   * @param {string} idHistory - ID de la historia clínica
   * @returns {Promise<Object|null>} Datos de filiación
   */
  async getFiliationByIdHistory(idHistory) {
    throw new Error('getFiliationByIdHistory() must be implemented');
  }

  /**
   * Obtiene el paciente asociado a una historia clínica
   * @param {string} idHistory - ID de la historia clínica
   * @returns {Promise<Object|null>} Datos del paciente
   */
  async getPatientByHistory(idHistory) {
    throw new Error('getPatientByHistory() must be implemented');
  }

  /**
   * Asigna un paciente a una historia clínica
   * @param {string} idHistory - ID de la historia clínica
   * @param {string} idPatient - ID del paciente
   * @returns {Promise<void>}
   */
  async assignPatient(idHistory, idPatient) {
    throw new Error('assignPatient() must be implemented');
  }

  /**
   * Crea o obtiene un borrador de historia clínica
   * @param {string} idStudent - ID del estudiante
   * @returns {Promise<Object>} Historia clínica borrador
   */
  async createDraft(idStudent) {
    throw new Error('createDraft() must be implemented');
  }

  /**
   * Actualiza la filiación de una historia clínica
   * @param {Object} filiationData - Datos de filiación
   * @returns {Promise<boolean>}
   */
  async updateFiliation(filiationData) {
    throw new Error('updateFiliation() must be implemented');
  }

  /**
   * Crea una revisión de historia clínica
   * @param {Object} reviewData - Datos de revisión
   * @returns {Promise<boolean>}
   */
  async createReview(reviewData) {
    throw new Error('createReview() must be implemented');
  }

  /**
   * Obtiene el examen general de una historia clínica
   * @param {string} idHistory - ID de la historia clínica
   * @returns {Promise<Object|null>}
   */
  async getGeneralExam(idHistory) {
    throw new Error('getGeneralExam() must be implemented');
  }
}
