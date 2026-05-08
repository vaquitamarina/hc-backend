/**
 * MotivoConsultaJpaRepository - Adaptador Secundario
 */
import { MotivoConsultaRepository } from '../../domain/ports/MotivoConsultaRepository.js';
import MotivoConsulta from '../../models/hc/anamnesis/motivoConsultaModel.js';

export class MotivoConsultaJpaRepository extends MotivoConsultaRepository {
  async create(data) {
    return MotivoConsulta.create(data);
  }

  async getByHistoria(idHistoria) {
    return MotivoConsulta.getByHistoria(idHistoria);
  }

  async update(idHistoria, data) {
    return MotivoConsulta.update(idHistoria, data);
  }
}
