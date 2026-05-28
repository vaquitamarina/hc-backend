import {
  ExamenFisicoRegionalAggregate,
  DomainError,
} from '../../examenRegional/domain/examenRegionalDomain.js';

/**
 * Testing API: adaptador primario sustituto que invoca directamente la lógica de dominio
 * y persiste en el repositorio in-memory inyectado desde los steps.
 */
export default class ExamenRegionalTestingAPI {
  /**
   * @param {{ create: Function, getByHistoria: Function, update: Function }} repository
   */
  constructor(repository) {
    this.repository = repository;
  }

  async registerExamen(input) {
    try {
      const agregado = new ExamenFisicoRegionalAggregate(input);
      const result = await this.repository.create(agregado);
      return {
        success: true,
        message: 'Examen registrado con exito',
        id: agregado.idHistoria,
        row: result,
      };
    } catch (err) {
      if (err instanceof DomainError) {
        throw err;
      }
      throw err;
    }
  }

  async updateExamen(input) {
    try {
      const agregado = new ExamenFisicoRegionalAggregate(input);
      const existente = await this.repository.getByHistoria(
        agregado.idHistoria
      );
      if (!existente) {
        return {
          success: false,
          status: 404,
          message: 'No se encontro examen para la historia clinica indicada',
        };
      }
      await this.repository.update(agregado);
      return {
        success: true,
        message: 'Examen actualizado correctamente',
        id: agregado.idHistoria,
      };
    } catch (err) {
      if (err instanceof DomainError) {
        throw err;
      }
      throw err;
    }
  }

  async getExamen(id_historia) {
    return this.repository.getByHistoria(id_historia);
  }
}
