import {
  FiliacionAggregate,
  DomainError,
} from '../../filiacion/domain/filiacionDomain.js';

/**
 * Testing API: adaptador primario sustituto que invoca directamente la lógica de dominio.
 * Recibe un repositorio (stub) in-memory inyectado desde los step definitions.
 */
export default class FiliacionTestingAPI {
  /**
   * @param {{ create: Function, getByHistoria: Function, update: Function }} repository
   */
  constructor(repository) {
    this.repository = repository;
  }

  /**
   * Registra un agregado de filiacion en el repositorio in-memory.
   * @param {Object} input Datos planos (coinciden con el constructor de FiliacionAggregate)
   */
  async registerFiliacion(input) {
    try {
      const agregado = new FiliacionAggregate(input);
      await this.repository.create(agregado);
      return {
        success: true,
        message: 'Filiacion registrada con exito',
        id: agregado.idHistoria,
      };
    } catch (err) {
      if (err instanceof DomainError) {
        throw err;
      }
      throw err;
    }
  }

  /**
   * Actualiza un agregado de filiacion existente.
   * Devuelve un objeto con status adecuado cuando la entidad no existe.
   * @param {Object} input
   */
  async updateFiliacion(input) {
    try {
      const agregado = new FiliacionAggregate(input);
      const existente = await this.repository.getByHistoria(
        agregado.idHistoria
      );
      if (!existente) {
        return {
          success: false,
          status: 404,
          message: 'No se encontro filiacion para la historia clinica indicada',
        };
      }
      await this.repository.update(agregado);
      return {
        success: true,
        message: 'Filiacion actualizada correctamente',
        id: agregado.idHistoria,
      };
    } catch (err) {
      if (err instanceof DomainError) {
        throw err;
      }
      throw err;
    }
  }

  /**
   * Obtiene la representación persistida (simulada) de una filiacion.
   * @param {string} id_historia
   */
  async getFiliacion(id_historia) {
    return this.repository.getByHistoria(id_historia);
  }
}
