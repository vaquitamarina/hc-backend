/**
 * ExamenGeneralJpaRepository - Adaptador Secundario
 */
import { ExamenGeneralRepository } from '../../domain/ports/ExamenGeneralRepository.js';
import ExamenGeneral from '../../models/hc/examenFisico/examenGeneralModel.js';

export class ExamenGeneralJpaRepository extends ExamenGeneralRepository {
  async getByHistoria(idHistoria) {
    return ExamenGeneral.getByHistoria(idHistoria);
  }

  async create(data) {
    return ExamenGeneral.create(data);
  }

  async update(idExamen, data) {
    return ExamenGeneral.update(idExamen, data);
  }
}
