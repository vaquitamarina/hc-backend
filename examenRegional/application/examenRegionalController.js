import examenRegionalRepository from '../infrastructure/examenRegionalRepository.js';
import {
  DomainError,
  ExamenFisicoRegionalAggregate,
  IdHistoriaClinicaVO,
} from '../domain/examenRegionalDomain.js';

/**
 * Adaptador Primario del modulo de examen fisico regional.
 */
class ExamenRegionalControllerClass {
  construirIdHistoria(req) {
    return req.params.id_historia || req.params.id || req.body.id_historia;
  }

  construirAgregado(req) {
    return new ExamenFisicoRegionalAggregate({
      id_historia: this.construirIdHistoria(req),
      body: req.body,
    });
  }

  registrarExamenFisicoRegional = async (req, res) => {
    try {
      const agregado = this.construirAgregado(req);
      const result = await examenRegionalRepository.create(agregado);
      return res.status(201).json(result);
    } catch (error) {
      if (error instanceof DomainError) {
        return res.status(400).json({ error: error.message });
      }
      return res.status(500).json({ error: error.message });
    }
  };

  consultarExamenFisicoRegional = async (req, res) => {
    try {
      const idHistoria = new IdHistoriaClinicaVO(this.construirIdHistoria(req));
      const result = await examenRegionalRepository.getByHistoria(
        idHistoria.value
      );
      return res.json(result || {});
    } catch (error) {
      if (error instanceof DomainError) {
        return res.status(400).json({ error: error.message });
      }
      return res.status(500).json({ error: error.message });
    }
  };

  actualizarExamenFisicoRegional = async (req, res) => {
    try {
      const agregado = this.construirAgregado(req);
      await examenRegionalRepository.update(agregado);
      return res.json({ message: 'Actualizado' });
    } catch (error) {
      if (error instanceof DomainError) {
        return res.status(400).json({ error: error.message });
      }
      return res.status(500).json({ error: error.message });
    }
  };
}

export const ExamenRegionalController = new ExamenRegionalControllerClass();
