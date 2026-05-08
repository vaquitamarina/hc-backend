/**
 * EnfermedadActualJpaRepository - Adaptador Secundario
 */
import { EnfermedadActualRepository } from '../../domain/ports/EnfermedadActualRepository.js';
import EnfermedadActual from '../../models/hc/anamnesis/enfermedadActualModel.js';

export class EnfermedadActualJpaRepository extends EnfermedadActualRepository {
  async create(data) {
    return EnfermedadActual.create(data);
  }

  async getByHistoria(idHistoria) {
    return EnfermedadActual.getByHistoria(idHistoria);
  }

  async update(idHistoria, data) {
    return EnfermedadActual.update(idHistoria, data);
  }
}
