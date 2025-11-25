// BaseService: Servicio genérico para operaciones CRUD
// Recibe un modelo con métodos SQL y expone métodos reutilizables

class BaseService {
  constructor(model) {
    this.model = model;
  }

  async create(data) {
    return await this.model.create(data);
  }

  async findById(id) {
    return await this.model.getById(id);
  }

  async updateById(id, data) {
    return await this.model.update(id, data);
  }

  async deleteById(id) {
    return await this.model.deleteById(id);
  }
}

export default BaseService;
