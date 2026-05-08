/**
 * PatientApplicationService
 * Implementa casos de uso relacionados con Pacientes
 */
export class CreatePatientApplicationService {
  constructor(patientRepository) {
    if (!patientRepository) {
      throw new Error('PatientRepository dependency required');
    }
    this.patientRepository = patientRepository;
  }

  async execute(input) {
    const {
      nombre,
      apellido,
      dni,
      fechaNacimiento,
      sexo,
      telefono,
      email,
    } = input;

    if (!nombre || !apellido) {
      throw new Error('nombre and apellido are required');
    }

    const patient = await this.patientRepository.createPatient({
      nombre,
      apellido,
      dni,
      fechaNacimiento,
      sexo,
      telefono,
      email,
    });

    if (!patient) {
      throw new Error('Failed to create patient');
    }

    return { id: patient.id };
  }
}

/**
 * GetAdultPatientsApplicationService
 */
export class GetAdultPatientsApplicationService {
  constructor(patientRepository) {
    if (!patientRepository) {
      throw new Error('PatientRepository dependency required');
    }
    this.patientRepository = patientRepository;
  }

  async execute(studentId) {
    if (!studentId) {
      throw new Error('studentId is required');
    }

    const patients = await this.patientRepository.getAdultPatientsByStudentId(
      studentId
    );
    return patients || [];
  }
}
