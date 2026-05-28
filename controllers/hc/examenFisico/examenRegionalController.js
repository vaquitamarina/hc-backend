import {
  registrarExamenFisicoRegional as modelRegistrar,
  consultarExamenFisicoRegional as modelConsultar,
  actualizarExamenFisicoRegional as modelActualizar,
  DomainError,
  ExamenFisicoRegionalAggregate,
} from '../../../models/hc/examenFisico/examenRegionalModel.js';

function esErrorDominio(err) {
  return err && (err instanceof DomainError || err.name === 'DomainError');
}

function construirIdHistoria(req) {
  return req.params.id_historia || req.params.id;
}

function construirAgregado(req) {
  const idHistory = construirIdHistoria(req);
  return new ExamenFisicoRegionalAggregate({ idHistory, body: req.body });
}

export const registrarExamenFisicoRegional = async (req, res) => {
  try {
    const result = await modelRegistrar(req.body);
    return res.status(201).json(result);
  } catch (err) {
    if (esErrorDominio(err)) {
      return res.status(400).json({ error: err.message });
    }
    return res.status(500).json({ error: err.message });
  }
};

export const consultarExamenFisicoRegional = async (req, res) => {
  try {
    const idHistory = construirIdHistoria(req);
    const result = await modelConsultar(idHistory);
    return res.json(result || {});
  } catch (err) {
    if (esErrorDominio(err)) {
      return res.status(400).json({ error: err.message });
    }
    return res.status(500).json({ error: err.message });
  }
};

export const actualizarExamenFisicoRegional = async (req, res) => {
  try {
    const agregado = construirAgregado(req);
    await modelActualizar(agregado);
    return res.json({ message: 'Actualizado' });
  } catch (err) {
    if (esErrorDominio(err)) {
      return res.status(400).json({ error: err.message });
    }
    return res.status(500).json({ error: err.message });
  }
};
