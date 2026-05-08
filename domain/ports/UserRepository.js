/**
 * UserRepository - Puerto Secundario (Driven Port)
 * Define el contrato para persistencia de Usuarios
 */
export class UserRepository {
  /**
   * Registra un nuevo usuario
   * @param {string} userCode
   * @param {string} firstName
   * @param {string} lastName
   * @param {string} dni
   * @param {string} email
   * @param {string} role
   * @param {string} password (hasheado)
   * @returns {Promise<Object>} Usuario creado
   */
  async register(userCode, firstName, lastName, dni, email, role, password) {
    throw new Error('register() must be implemented');
  }

  /**
   * Obtiene un usuario por ID
   * @param {string} id - ID del usuario
   * @returns {Promise<Object|null>}
   */
  async getUserById(id) {
    throw new Error('getUserById() must be implemented');
  }

  /**
   * Obtiene un usuario para login
   * @param {string} userCode - Código del usuario
   * @returns {Promise<Object|null>}
   */
  async login(userCode) {
    throw new Error('login() must be implemented');
  }

  /**
   * Obtiene todos los usuarios
   * @returns {Promise<Array>}
   */
  async getAll() {
    throw new Error('getAll() must be implemented');
  }

  /**
   * Actualiza un usuario
   * @param {string} id
   * @param {Object} userData
   * @returns {Promise<boolean>}
   */
  async update(id, userData) {
    throw new Error('update() must be implemented');
  }
}
