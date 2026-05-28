import {
  registrarExamenFisicoGeneral as modelRegistrar,
  consultarExamenFisicoGeneral as modelConsultar,
  actualizarExamenFisicoGeneral as modelActualizar,
  DomainError,
  ExamenFisicoGeneralAggregate,
} from '../../../models/hc/examenFisico/examenGeneralModel.js';

function esErrorDominio(err) {
  return err && (err instanceof DomainError || err.name === 'DomainError');
}

function construirIdHistoria(req) {
  return req.params.id_historia || req.params.id;
}

function construirAgregado(req) {
  const idHistory = construirIdHistoria(req);
  return new ExamenFisicoGeneralAggregate({ idHistory, body: req.body });
}

export const registrarExamenFisicoGeneral = async (req, res) => {
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

export const consultarExamenFisicoGeneral = async (req, res) => {
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

export const actualizarExamenFisicoGeneral = async (req, res) => {
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
