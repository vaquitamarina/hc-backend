import {
  consultarExamenBoca as modelConsultar,
  actualizarExamenBoca as modelActualizar,
  DomainError,
  ExamenBocaAggregate,
} from '../../../models/hc/examenFisico/examenBocaModel.js';

function esErrorDominio(err) {
  return err && (err instanceof DomainError || err.name === 'DomainError');
}

function construirIdHistoria(req) {
  return req.params.id_historia || req.params.id;
}

function construirAgregado(req) {
  const idHistory = construirIdHistoria(req);
  return new ExamenBocaAggregate({ idHistory, body: req.body });
}

export const consultarExamenBucal = async (req, res) => {
  try {
    const id = construirIdHistoria(req);
    const result = await modelConsultar(id);
    return res.status(200).json(result || {});
  } catch (err) {
    if (esErrorDominio(err)) {
      return res.status(400).json({ error: err.message });
    }
    return res.status(500).json({ error: err.message });
  }
};

export const actualizarExamenBucal = async (req, res) => {
  try {
    const agregado = construirAgregado(req);
    await modelActualizar(agregado);
    return res
      .status(200)
      .json({ message: 'Examen de boca guardado correctamente' });
  } catch (err) {
    if (esErrorDominio(err)) {
      return res.status(400).json({ error: err.message });
    }
    return res.status(500).json({ error: err.message });
  }
};
