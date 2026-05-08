/**
 * ExamenRegionalJpaRepository - Adaptador Secundario
 */
import { ExamenRegionalRepository } from '../../domain/ports/ExamenRegionalRepository.js';
import ExamenRegional from '../../models/hc/examenFisico/examenRegionalModel.js';

export class ExamenRegionalJpaRepository extends ExamenRegionalRepository {
  async getByHistoria(idHistoria) {
    return ExamenRegional.getByHistoria(idHistoria);
  }

  async create(data) {
    return ExamenRegional.create(data);
  }

  async update(idRegional, data) {
    return ExamenRegional.update(idRegional, data);
  }
}
