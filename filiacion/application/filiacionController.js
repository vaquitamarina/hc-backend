import filiacionRepository from '../infrastructure/filiacionRepository.js';
import { DomainError, FiliacionAggregate } from '../domain/filiacionDomain.js';

/**
 * Adaptador Primario del modulo de filiacion.
 * Recibe peticiones HTTP y orquesta casos de uso con el dominio.
 */
class FiliacionController {
  /**
   * @param {import('express').Request} req
   * @returns {FiliacionAggregate}
   */
  construirAgregado(req) {
    return new FiliacionAggregate({
      ...req.body,
      id_historia: req.params.id_historia ?? req.body.id_historia,
    });
  }

  /**
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   * @returns {Promise<import('express').Response>}
   */
  registrarDatosPersonalesPaciente = async (req, res) => {
    try {
      const agregado = this.construirAgregado(req);
      await filiacionRepository.create(agregado);
      return res
        .status(201)
        .json({ message: 'Filiacion registrada con exito' });
    } catch (error) {
      if (error instanceof DomainError) {
        return res.status(400).json({ error: error.message });
      }
      return res.status(500).json({ error: 'Error al registrar la filiacion' });
    }
  };

  /**
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   * @returns {Promise<import('express').Response>}
   */
  consultarDatosPersonalesPaciente = async (req, res) => {
    try {
      const agregado = this.construirAgregado({ params: req.params, body: {} });
      const result = await filiacionRepository.getByHistoria(
        agregado.idHistoria
      );

      if (!result) {
        return res.status(404).json({
          error: 'No se encontro filiacion para la historia clinica indicada',
        });
      }

      return res.status(200).json({
        message: 'Filiacion obtenida correctamente',
        data: result,
      });
    } catch (error) {
      if (error instanceof DomainError) {
        return res.status(400).json({ error: error.message });
      }
      return res.status(500).json({ error: 'Error al obtener la filiacion' });
    }
  };

  /**
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   * @returns {Promise<import('express').Response>}
   */
  actualizarDatosPersonalesPaciente = async (req, res) => {
    try {
      const agregado = this.construirAgregado(req);
      const existente = await filiacionRepository.getByHistoria(
        agregado.idHistoria
      );

      if (!existente) {
        return res.status(404).json({
          error: 'No se encontro filiacion para la historia clinica indicada',
        });
      }

      await filiacionRepository.update(agregado);
      return res
        .status(200)
        .json({ message: 'Filiacion actualizada correctamente' });
    } catch (error) {
      if (error instanceof DomainError) {
        return res.status(400).json({ error: error.message });
      }
      return res
        .status(500)
        .json({ error: 'Error al actualizar la filiacion' });
    }
  };
}

export const ModuloController = new FiliacionController();
