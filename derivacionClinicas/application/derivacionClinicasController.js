import {
  DomainError,
  DerivacionClinicasAggregate,
} from '../domain/derivacionClinicasDomain.js';
import { DerivacionClinicasRepository } from '../infrastructure/derivacionClinicasRepository.js';

const repo = new DerivacionClinicasRepository();

const esErrorDominio = (err) =>
  err && (err instanceof DomainError || err.name === 'DomainError');

const stripHCPrefix = (id) => {
  if (!id) {
    return id;
  }
  return id.startsWith('HC-') ? id.slice(3) : id;
};

const construirIdHistoria = (req) => {
  const id = req.params.id_historia || req.params.id;
  if (!id) {
    throw new DomainError('id_historia es requerido');
  }
  return stripHCPrefix(String(id));
};

const construirAgregado = (req) => {
  const idHistory = req.params.id_historia || req.params.id;
  const { destinos, observaciones, alumno, docente } = req.body;
  return new DerivacionClinicasAggregate({
    idHistory,
    destinos,
    observaciones,
    alumno,
    docente,
    idUsuario: req.user && req.user.id,
  });
};

export const DerivacionClinicasController = {
  consultarDerivacionClinicas: async (req, res) => {
    try {
      const id = construirIdHistoria(req);
      const data = await repo.consultarPorHistoria(id);
      res.status(200).json(data || {});
    } catch (err) {
      if (esErrorDominio(err)) {
        return res.status(400).json({ error: err.message });
      }
      res.status(500).json({ error: 'Error al obtener derivaciones' });
    }
  },

  actualizarDerivacionClinicas: async (req, res) => {
    try {
      const agregado = construirAgregado(req);
      await repo.actualizarDerivacionClinicas(agregado);
      res.status(200).json({ message: 'Derivación guardada correctamente' });
    } catch (err) {
      if (esErrorDominio(err)) {
        return res.status(400).json({ error: err.message });
      }
      res.status(500).json({ error: 'Error al guardar derivación' });
    }
  },
};
