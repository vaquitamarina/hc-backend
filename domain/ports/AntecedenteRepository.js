/**
 * AntecedenteRepository - Puerto Secundario
 * Persistencia de Antecedentes Personales
 */
export class AntecedenteRepository {
  async create(data) {
    throw new Error('create() must be implemented');
  }

  async getById(id) {
    throw new Error('getById() must be implemented');
  }

  async getByHistoria(idHistoria) {
    throw new Error('getByHistoria() must be implemented');
  }

  async update(idHistoria, data) {
    throw new Error('update() must be implemented');
  }
}
