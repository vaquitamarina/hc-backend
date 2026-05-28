import { DomainError, EvolucionAggregate } from '../domain/evolucionDomain.js';
import { EvolucionRepository } from '../infrastructure/evolucionRepository.js';

const repo = new EvolucionRepository();

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
  const { fecha, actividad, alumno } = req.body;
  return new EvolucionAggregate({
    idHistory,
    fecha,
    actividad,
    alumno,
    idUsuario: req.user && req.user.id,
  });
};

export const EvolucionController = {
  consultarEvoluciones: async (req, res) => {
    try {
      const id = construirIdHistoria(req);
      const list = await repo.consultarEvoluciones(id);
      res.status(200).json(list);
    } catch (err) {
      if (esErrorDominio(err)) {
        return res.status(400).json({ error: err.message });
      }
      res.status(500).json({ error: 'Error al obtener evoluciones' });
    }
  },

  registrarEvolucion: async (req, res) => {
    try {
      const agregado = construirAgregado(req);
      await repo.registrarEvolucion(agregado);
      res.status(201).json({ message: 'Evolución registrada correctamente' });
    } catch (err) {
      if (esErrorDominio(err)) {
        return res.status(400).json({ error: err.message });
      }
      res.status(500).json({ error: 'Error al registrar evolución' });
    }
  },
};
