import {
  DomainError,
  HigieneBocalAggregate,
} from '../domain/higieneBocalDomain.js';
import { HigieneBocalRepository } from '../infrastructure/higieneBocalRepository.js';

const repo = new HigieneBocalRepository();

function esErrorDominio(err) {
  return err && (err instanceof DomainError || err.name === 'DomainError');
}

function construirIdHistoria(req) {
  return req.params.id_historia || req.params.id;
}

function construirAgregado(req) {
  const idHistory = construirIdHistoria(req);
  return new HigieneBocalAggregate({
    idHistory,
    body: req.body,
    idUsuario: req.user?.id,
  });
}

export const HigieneBocalController = {
  consultarHigieneBucal: async (req, res) => {
    try {
      const id = construirIdHistoria(req);
      const result = await repo.consultarPorHistoria(id);
      return res.status(200).json(result || {});
    } catch (err) {
      if (esErrorDominio(err)) {
        return res.status(400).json({ error: err.message });
      }
      return res
        .status(500)
        .json({ error: 'Error al obtener el examen de higiene oral' });
    }
  },

  actualizarHigieneBucal: async (req, res) => {
    try {
      const agregado = construirAgregado(req);
      await repo.actualizarHigieneBocal(agregado);
      return res
        .status(200)
        .json({ message: 'Higiene bucal guardada correctamente' });
    } catch (err) {
      if (esErrorDominio(err)) {
        return res.status(400).json({ error: err.message });
      }
      return res
        .status(500)
        .json({ error: 'Error al guardar la higiene bucal' });
    }
  },
};
