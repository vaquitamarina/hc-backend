import {
  consultarDerivacionClinicas as modelConsultar,
  actualizarDerivacionClinicas as modelActualizar,
  DerivacionClinicasAggregate,
  DomainError,
} from '../../models/hc/derivacionClinicasModel.js';

const stripHCPrefix = (id) => {
  if (!id) {
    return id;
  }
  return id.startsWith('HC-') ? id.slice(3) : id;
};

const esErrorDominio = (err) => err && err.name === 'DomainError';

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

export const consultarDerivacionClinicas = async (req, res) => {
  try {
    const id = construirIdHistoria(req);
    const data = await modelConsultar(id);
    res.status(200).json(data || {});
  } catch (err) {
    if (esErrorDominio(err)) {
      return res.status(400).json({ error: err.message });
    }
    res.status(500).json({ error: 'Error al obtener derivaciones' });
  }
};

export const actualizarDerivacionClinicas = async (req, res) => {
  try {
    const agregado = construirAgregado(req);
    await modelActualizar(agregado);
    res.status(200).json({ message: 'Derivación guardada correctamente' });
  } catch (err) {
    if (esErrorDominio(err)) {
      return res.status(400).json({ error: err.message });
    }
    res.status(500).json({ error: 'Error al guardar derivación' });
  }
};
