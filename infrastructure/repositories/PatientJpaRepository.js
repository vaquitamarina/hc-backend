/**
 * PatientJpaRepository
 * Adaptador Secundario (Driven Adapter)
 * Implementa el puerto PatientRepository
 */
import { PatientRepository } from '../../domain/ports/PatientRepository.js';
import { PatientModel } from '../../models/patient/patientModel.js';

export class PatientJpaRepository extends PatientRepository {
  async createPatient(patientData) {
    return PatientModel.createPatient(
      patientData.nombre,
      patientData.apellido,
      patientData.dni,
      patientData.fechaNacimiento,
      patientData.sexo,
      patientData.telefono,
      patientData.email
    );
  }

  async updatePatient(id, patientData) {
    return PatientModel.updatePatient(
      id,
      patientData.nombre,
      patientData.apellido,
      patientData.telefono,
      patientData.email
    );
  }

  async getAdultPatientsByStudentId(studentId) {
    return PatientModel.getAdultPatientsByStudentId(studentId);
  }
}
