/**
 * CreateHcApplicationService
 * Implementa el caso de uso: Registrar Historia Clínica
 * 
 * RESPONSABILIDAD: Orquestación únicamente
 * - Valida entrada
 * - Crea el Aggregate Root (HC)
 * - Delega persistencia al repositorio
 * - Retorna DTO para el controller
 */
export class CreateHcApplicationService {
  constructor(hcRepository) {
    if (!hcRepository) {
      throw new Error('HcRepository dependency required');
    }
    this.hcRepository = hcRepository;
  }

  async execute(input) {
    // Validación
    if (!input || !input.idStudent) {
      throw new Error('idStudent is required');
    }

    // Crear HC (delegando a repositorio)
    const hc = await this.hcRepository.registerHc(input.idStudent);

    if (!hc) {
      throw new Error('Failed to create HC');
    }

    // Retornar DTO
    return {
      id: hc.id_historia,
      studentId: hc.id_estudiante,
      status: hc.estado,
      createdAt: hc.fecha_creacion,
    };
  }
}

/**
 * GetHcByStudentApplicationService
 * Implementa el caso de uso: Obtener HCs de estudiante
 */
export class GetHcByStudentApplicationService {
  constructor(hcRepository) {
    if (!hcRepository) {
      throw new Error('HcRepository dependency required');
    }
    this.hcRepository = hcRepository;
  }

  async execute(studentId) {
    if (!studentId) {
      throw new Error('studentId is required');
    }

    const historias = await this.hcRepository.getAllByStudentId(studentId);
    return historias || [];
  }
}

/**
 * GetFiliationByHistoryApplicationService
 */
export class GetFiliationByHistoryApplicationService {
  constructor(hcRepository) {
    if (!hcRepository) {
      throw new Error('HcRepository dependency required');
    }
    this.hcRepository = hcRepository;
  }

  async execute(idHistory) {
    if (!idHistory) {
      throw new Error('idHistory is required');
    }

    const filiation = await this.hcRepository.getFiliationByIdHistory(idHistory);
    if (!filiation) {
      throw new Error('Filiation not found');
    }
    return filiation;
  }
}

/**
 * UpdateFiliationApplicationService
 */
export class UpdateFiliationApplicationService {
  constructor(hcRepository) {
    if (!hcRepository) {
      throw new Error('HcRepository dependency required');
    }
    this.hcRepository = hcRepository;
  }

  async execute(input) {
    if (!input || !input.idHistory) {
      throw new Error('idHistory is required');
    }

    const result = await this.hcRepository.updateFiliation(input);
    if (!result) {
      throw new Error('Failed to update filiation');
    }
    return { success: true, idHistory: input.idHistory };
  }
}

/**
 * CreateReviewApplicationService
 */
export class CreateReviewApplicationService {
  constructor(hcRepository) {
    if (!hcRepository) {
      throw new Error('HcRepository dependency required');
    }
    this.hcRepository = hcRepository;
  }

  async execute(input) {
    if (!input || !input.idHistory) {
      throw new Error('idHistory is required');
    }

    const result = await this.hcRepository.createReview(input);
    if (!result) {
      throw new Error('Failed to create review');
    }
    return { success: true, message: 'Review created' };
  }
}

/**
 * AssignPatientToHcApplicationService
 */
export class AssignPatientToHcApplicationService {
  constructor(hcRepository) {
    if (!hcRepository) {
      throw new Error('HcRepository dependency required');
    }
    this.hcRepository = hcRepository;
  }

  async execute(input) {
    if (!input || !input.idHistory || !input.idPatient) {
      throw new Error('idHistory and idPatient are required');
    }

    await this.hcRepository.assignPatient(input.idHistory, input.idPatient);
    return { success: true, idHistory: input.idHistory };
  }
}

/**
 * CreateDraftHcApplicationService
 */
export class CreateDraftHcApplicationService {
  constructor(hcRepository) {
    if (!hcRepository) {
      throw new Error('HcRepository dependency required');
    }
    this.hcRepository = hcRepository;
  }

  async execute(idStudent) {
    if (!idStudent) {
      throw new Error('idStudent is required');
    }

    const draft = await this.hcRepository.createDraft(idStudent);
    return draft;
  }
}
