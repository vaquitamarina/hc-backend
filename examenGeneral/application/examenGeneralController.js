import examenGeneralRepository from '../infrastructure/examenGeneralRepository.js';
import {
  DomainError,
  ExamenFisicoGeneralAggregate,
  IdHistoriaClinicaVO,
} from '../domain/examenGeneralDomain.js';

/**
 * Adaptador Primario del modulo de examen fisico general.
 */
class ExamenGeneralControllerClass {
  construirIdHistoria(req) {
    return req.params.id_historia || req.params.id || req.body.id_historia;
  }

  construirAgregado(req) {
    return new ExamenFisicoGeneralAggregate({
      id_historia: this.construirIdHistoria(req),
      body: req.body,
    });
  }

  registrarExamenFisicoGeneral = async (req, res) => {
    try {
      const agregado = this.construirAgregado(req);
      const result = await examenGeneralRepository.create(agregado);
      return res.status(201).json(result);
    } catch (error) {
      if (error instanceof DomainError) {
        return res.status(400).json({ error: error.message });
      }
      return res.status(500).json({ error: error.message });
    }
  };

  consultarExamenFisicoGeneral = async (req, res) => {
    try {
      const idHistoria = new IdHistoriaClinicaVO(this.construirIdHistoria(req));
      const result = await examenGeneralRepository.getByHistoria(
        idHistoria.value
      );
      return res.status(200).json(result || {});
    } catch (error) {
      if (error instanceof DomainError) {
        return res.status(400).json({ error: error.message });
      }
      return res.status(500).json({ error: error.message });
    }
  };

  actualizarExamenFisicoGeneral = async (req, res) => {
    try {
      const agregado = this.construirAgregado(req);
      await examenGeneralRepository.update(agregado);
      return res.json({ message: 'Actualizado' });
    } catch (error) {
      if (error instanceof DomainError) {
        return res.status(400).json({ error: error.message });
      }
      return res.status(500).json({ error: error.message });
    }
  };
}

export const ExamenGeneralController = new ExamenGeneralControllerClass();
