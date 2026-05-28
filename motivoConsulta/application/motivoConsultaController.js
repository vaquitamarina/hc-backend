import motivoConsultaRepository from '../infrastructure/motivoConsultaRepository.js';
import {
  DomainError,
  IdHistoriaClinicaVO,
  MotivoConsultaAggregate,
} from '../domain/motivoConsultaDomain.js';

/**
 * Adaptador Primario del modulo de motivo de consulta.
 * Recibe peticiones HTTP y orquesta casos de uso con el dominio.
 */
class MotivoConsultaControllerClass {
  /**
   * @param {import('express').Request} req
   * @returns {MotivoConsultaAggregate}
   */
  construirAgregado(req) {
    return new MotivoConsultaAggregate({
      ...req.body,
      id_historia: req.params.id_historia ?? req.body.id_historia,
    });
  }

  /**
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   * @returns {Promise<import('express').Response>}
   */
  registrarMotivoConsulta = async (req, res) => {
    try {
      await motivoConsultaRepository.create(this.construirAgregado(req));
      return res
        .status(201)
        .json({ message: 'Motivo de consulta registrado con exito' });
    } catch (error) {
      if (error instanceof DomainError) {
        return res.status(400).json({ error: error.message });
      }
      return res
        .status(500)
        .json({ error: 'Error al registrar el motivo de consulta' });
    }
  };

  /**
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   * @returns {Promise<import('express').Response>}
   */
  consultarMotivoConsulta = async (req, res) => {
    try {
      const idHistoria = new IdHistoriaClinicaVO(req.params.id_historia);
      const result = await motivoConsultaRepository.getByHistoria(
        idHistoria.value
      );

      if (!result) {
        return res.status(404).json({
          error:
            'No se encontro motivo de consulta para la historia clinica indicada',
        });
      }

      return res.status(200).json({
        message: 'Motivo de consulta obtenido correctamente',
        data: result,
      });
    } catch (error) {
      if (error instanceof DomainError) {
        return res.status(400).json({ error: error.message });
      }
      return res
        .status(500)
        .json({ error: 'Error al obtener el motivo de consulta' });
    }
  };

  /**
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   * @returns {Promise<import('express').Response>}
   */
  actualizarMotivoConsulta = async (req, res) => {
    try {
      const agregado = this.construirAgregado(req);
      const existente = await motivoConsultaRepository.getByHistoria(
        agregado.idHistoria
      );

      if (!existente) {
        return res.status(404).json({
          error:
            'No se encontro motivo de consulta para la historia clinica indicada',
        });
      }

      await motivoConsultaRepository.update(agregado);
      return res
        .status(200)
        .json({ message: 'Motivo de consulta actualizado correctamente' });
    } catch (error) {
      if (error instanceof DomainError) {
        return res.status(400).json({ error: error.message });
      }
      return res
        .status(500)
        .json({ error: 'Error al actualizar el motivo de consulta' });
    }
  };
}

export const MotivoConsultaController = new MotivoConsultaControllerClass();
