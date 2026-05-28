import examenBocaRepository from '../infrastructure/examenBocaRepository.js';
import {
  DomainError,
  ExamenBocaAggregate,
  IdHistoriaClinicaVO,
} from '../domain/examenBocaDomain.js';

/**
 * Adaptador Primario del modulo de examen de boca.
 */
class ExamenBocaControllerClass {
  construirIdHistoria(req) {
    return req.params.id_historia || req.params.id;
  }

  construirAgregado(req) {
    return new ExamenBocaAggregate({
      id_historia: this.construirIdHistoria(req),
      body: req.body,
    });
  }

  consultarExamenBucal = async (req, res) => {
    try {
      const idHistoria = new IdHistoriaClinicaVO(this.construirIdHistoria(req));
      const result = await examenBocaRepository.getByHistoria(idHistoria.value);
      return res.status(200).json(result || {});
    } catch (error) {
      if (error instanceof DomainError) {
        return res.status(400).json({ error: error.message });
      }
      return res.status(500).json({ error: error.message });
    }
  };

  actualizarExamenBucal = async (req, res) => {
    try {
      const agregado = this.construirAgregado(req);
      await examenBocaRepository.update(agregado);
      return res
        .status(200)
        .json({ message: 'Examen de boca guardado correctamente' });
    } catch (error) {
      if (error instanceof DomainError) {
        return res.status(400).json({ error: error.message });
      }
      return res.status(500).json({ error: error.message });
    }
  };
}

export const ExamenBocaController = new ExamenBocaControllerClass();
