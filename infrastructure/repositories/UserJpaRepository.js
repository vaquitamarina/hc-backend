/**
 * UserJpaRepository
 * Adaptador Secundario (Driven Adapter)
 * Implementa el puerto UserRepository
 */
import { UserRepository } from '../../domain/ports/UserRepository.js';
import { UserModel } from '../../models/user/userModel.js';

export class UserJpaRepository extends UserRepository {
  async register(userCode, firstName, lastName, dni, email, role, password) {
    return UserModel.register(userCode, firstName, lastName, dni, email, role, password);
  }

  async getUserById(id) {
    return UserModel.getUserById(id);
  }

  async login(userCode) {
    return UserModel.login(userCode);
  }

  async getAll() {
    // Implementar si existe en UserModel
    throw new Error('getAll() not implemented in UserModel');
  }

  async update(id, userData) {
    // Implementar si existe en UserModel
    throw new Error('update() not implemented in UserModel');
  }
}
