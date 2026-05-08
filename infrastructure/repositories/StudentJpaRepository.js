/**
 * StudentJpaRepository
 * Adaptador Secundario (Driven Adapter)
 * Implementa el puerto StudentRepository
 */
import { StudentRepository } from '../../domain/ports/StudentRepository.js';
import { StudentModel } from '../../models/student/studentModel.js';

export class StudentJpaRepository extends StudentRepository {
  async getAdultPatientsByStudentId(studentId) {
    return StudentModel.getAdultPatientsByStudentId(studentId);
  }
}
