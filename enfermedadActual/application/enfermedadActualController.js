import enfermedadActualRepository from '../infrastructure/enfermedadActualRepository.js';
import {
  DomainError,
  EnfermedadActualAggregate,
  IdHistoriaClinicaVO,
} from '../domain/enfermedadActualDomain.js';

/**
 * Adaptador Primario del modulo de enfermedad actual.
 * Recibe peticiones HTTP y orquesta casos de uso con el dominio.
 */
class EnfermedadActualControllerClass {
  /**
   * @param {import('express').Request} req
   * @returns {EnfermedadActualAggregate}
   */
  construirAgregado(req) {
    return new EnfermedadActualAggregate({
      ...req.body,
      id_historia: req.params.id_historia ?? req.body.id_historia,
    });
  }

  /**
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   * @returns {Promise<import('express').Response>}
   */
  registrarEnfermedadActual = async (req, res) => {
    try {
      const agregado = this.construirAgregado(req);
      const result = await enfermedadActualRepository.create(agregado);

      return res.status(201).json({
        message: 'Enfermedad actual registrada con exito',
        data: result,
      });
    } catch (error) {
      if (error instanceof DomainError) {
        return res.status(400).json({ error: error.message });
      }
      return res
        .status(500)
        .json({ error: 'Error al registrar la enfermedad actual' });
    }
  };

  /**
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   * @returns {Promise<import('express').Response>}
   */
  consultarEnfermedadActual = async (req, res) => {
    try {
      const idHistoria = new IdHistoriaClinicaVO(req.params.id_historia);
      const result = await enfermedadActualRepository.getByHistoria(
        idHistoria.value
      );

      if (!result) {
        return res.status(404).json({
          error:
            'No se encontro enfermedad actual para la historia clinica indicada',
        });
      }

      return res.status(200).json({
        message: 'Enfermedad actual obtenida correctamente',
        data: result,
      });
    } catch (error) {
      if (error instanceof DomainError) {
        return res.status(400).json({ error: error.message });
      }
      return res
        .status(500)
        .json({ error: 'Error al obtener la enfermedad actual' });
    }
  };

  /**
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   * @returns {Promise<import('express').Response>}
   */
  actualizarEnfermedadActual = async (req, res) => {
    try {
      const agregado = this.construirAgregado(req);
      const existente = await enfermedadActualRepository.getByHistoria(
        agregado.idHistoria
      );

      if (!existente) {
        return res.status(404).json({
          error:
            'No se encontro enfermedad actual para la historia clinica indicada',
        });
      }

      const result = await enfermedadActualRepository.update(agregado);
      return res.status(200).json({
        message: 'Enfermedad actual actualizada correctamente',
        data: result,
      });
    } catch (error) {
      if (error instanceof DomainError) {
        return res.status(400).json({ error: error.message });
      }
      return res
        .status(500)
        .json({ error: 'Error al actualizar la enfermedad actual' });
    }
  };
}

export const EnfermedadActualController = new EnfermedadActualControllerClass();
