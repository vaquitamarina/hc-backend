/**
 * HcJpaRepository
 * Adaptador Secundario (Driven Adapter)
 * 
 * Implementa el puerto HcRepository usando el Model existente.
 * Actúa como intermediario entre la capa de Aplicación y la capa de Persistencia.
 */
import { HcRepository } from '../../domain/ports/HcRepository.js';
import { HcModel } from '../../models/hc/hcModel.js';

export class HcJpaRepository extends HcRepository {
  async registerHc(idStudent) {
    return HcModel.registerHc(idStudent);
  }

  async getAllByStudentId(studentId) {
    return HcModel.getAllByStudentId(studentId);
  }

  async getFiliationByIdHistory(idHistory) {
    return HcModel.getFiliationByIdHistory(idHistory);
  }

  async getPatientByHistory(idHistory) {
    return HcModel.getPatientByHistory(idHistory);
  }

  async assignPatient(idHistory, idPatient) {
    return HcModel.assignPatient(idHistory, idPatient);
  }

  async createDraft(idStudent) {
    return HcModel.createDraft(idStudent);
  }

  async updateFiliation(filiationData) {
    return HcModel.updateFiliation(filiationData);
  }

  async createReview(reviewData) {
    return HcModel.createReview(reviewData);
  }

  async getGeneralExam(idHistory) {
    return HcModel.getGeneralExam(idHistory);
  }
}
