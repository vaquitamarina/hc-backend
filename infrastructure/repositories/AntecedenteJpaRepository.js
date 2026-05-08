/**
 * AntecedenteJpaRepository - Adaptador Secundario
 */
import { AntecedenteRepository } from '../../domain/ports/AntecedenteRepository.js';
import AntecedentePersonal from '../../models/hc/anamnesis/antecedenteModel.js';

export class AntecedenteJpaRepository extends AntecedenteRepository {
  async create(data) {
    return AntecedentePersonal.create(data);
  }

  async getById(id) {
    return AntecedentePersonal.getById(id);
  }

  async getByHistoria(idHistoria) {
    return AntecedentePersonal.getByHistoria(idHistoria);
  }

  async update(idHistoria, data) {
    return AntecedentePersonal.update(idHistoria, data);
  }
}
