/**
 * CreateHcUseCase - Puerto Primario (Driving Port)
 * Caso de uso: Registrar una nueva Historia Clínica
 * Implementación: CreateHcApplicationService
 */
export class CreateHcUseCase {
  /**
   * Ejecuta el caso de uso
   * @param {Object} input - Datos de entrada
   * @returns {Promise<Object>}
   */
  async execute(input) {
    throw new Error('execute() must be implemented');
  }
}

/**
 * GetHcByStudentUseCase - Puerto Primario (Driving Port)
 * Caso de uso: Obtener historias clínicas de un estudiante
 */
export class GetHcByStudentUseCase {
  async execute(studentId) {
    throw new Error('execute() must be implemented');
  }
}

/**
 * UpdateFiliationUseCase - Puerto Primario (Driving Port)
 * Caso de uso: Actualizar filiación de historia clínica
 */
export class UpdateFiliationUseCase {
  async execute(input) {
    throw new Error('execute() must be implemented');
  }
}
