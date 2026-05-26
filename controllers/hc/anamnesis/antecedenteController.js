import {
  DomainError,
  IdentificadorUuidValueObject,
  AntecedentePersonalAggregate,
  AntecedenteMedicoAggregate,
  AntecedenteFamiliarAggregate,
  SeguimientoDelTratamientoAggregate,
  AntecedentePersonal,
  AntecedenteMedico,
  AntecedenteFamiliar,
  AntecedenteCumplimiento,
} from '../../../models/hc/anamnesis/antecedenteModel.js';

const construirAgregado = (req) => ({
  ...req.body,
  id_historia: req.params.id_historia ?? req.body.id_historia,
});

const esErrorDominio = (error) =>
  error instanceof DomainError || error?.name === 'DomainError';

const obtenerHistoriaId = (req) =>
  new IdentificadorUuidValueObject(
    req.params.id_historia ?? req.body.id_historia
  ).value;
// --- Antecedente Cumplimiento ---
export const registrarSeguimientoDelTratamiento = async (req, res) => {
  let agregado;
  try {
    agregado = new SeguimientoDelTratamientoAggregate(construirAgregado(req));
  } catch (err) {
    if (esErrorDominio(err)) {
      return res.status(400).json({ error: err.message });
    }
    return res.status(500).json({ error: err.message });
  }

  try {
    const ok = await AntecedenteCumplimiento.create(agregado);
    if (ok) {
      return res.status(201).json({
        message: 'Seguimiento del tratamiento registrado correctamente',
      });
    }
    return res
      .status(500)
      .json({ error: 'No se pudo registrar el seguimiento del tratamiento' });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

export const consultarSeguimientoDelTratamiento = async (req, res) => {
  try {
    const idHistoria = obtenerHistoriaId(req);
    const result = await AntecedenteCumplimiento.getByHistoria(idHistoria);
    if (!result) {
      return res.status(404).json({ error: 'No encontrado' });
    }
    return res.status(200).json(result);
  } catch (err) {
    if (esErrorDominio(err)) {
      return res.status(400).json({ error: err.message });
    }
    return res.status(500).json({ error: err.message });
  }
};

export const actualizarSeguimientoDelTratamiento = async (req, res) => {
  let idHistoria;
  try {
    idHistoria = obtenerHistoriaId(req);
  } catch (err) {
    if (esErrorDominio(err)) {
      return res.status(400).json({ error: err.message });
    }
    return res.status(500).json({ error: err.message });
  }

  try {
    const agregado = new SeguimientoDelTratamientoAggregate(
      construirAgregado(req)
    );
    const ok = await AntecedenteCumplimiento.update(idHistoria, agregado);
    if (ok) {
      return res.status(200).json({
        message: 'Seguimiento del tratamiento actualizado correctamente',
      });
    }
    return res
      .status(500)
      .json({ error: 'No se pudo actualizar el seguimiento del tratamiento' });
  } catch (err) {
    if (esErrorDominio(err)) {
      return res.status(400).json({ error: err.message });
    }
    return res.status(500).json({ error: err.message });
  }
};
// --- Antecedente Familiar ---
export const registrarAntecedentesHeredoFamiliares = async (req, res) => {
  let agregado;
  try {
    agregado = new AntecedenteFamiliarAggregate(construirAgregado(req));
  } catch (err) {
    if (esErrorDominio(err)) {
      return res.status(400).json({ error: err.message });
    }
    return res.status(500).json({ error: err.message });
  }

  try {
    const ok = await AntecedenteFamiliar.create(agregado);
    if (ok) {
      return res.status(201).json({
        message: 'Antecedentes heredo familiares registrados correctamente',
      });
    }
    return res.status(500).json({
      error: 'No se pudieron registrar los antecedentes heredo familiares',
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

export const consultarAntecedentesHeredoFamiliares = async (req, res) => {
  try {
    const idHistoria = obtenerHistoriaId(req);
    const result = await AntecedenteFamiliar.getByHistoria(idHistoria);
    if (!result) {
      return res.status(404).json({ error: 'No encontrado' });
    }
    return res.status(200).json(result);
  } catch (err) {
    if (esErrorDominio(err)) {
      return res.status(400).json({ error: err.message });
    }
    return res.status(500).json({ error: err.message });
  }
};

export const actualizarAntecedentesHeredoFamiliares = async (req, res) => {
  let idHistoria;
  try {
    idHistoria = obtenerHistoriaId(req);
  } catch (err) {
    if (esErrorDominio(err)) {
      return res.status(400).json({ error: err.message });
    }
    return res.status(500).json({ error: err.message });
  }

  try {
    const agregado = new AntecedenteFamiliarAggregate(construirAgregado(req));
    const ok = await AntecedenteFamiliar.update(idHistoria, agregado);
    if (ok) {
      return res.status(200).json({
        message: 'Antecedentes heredo familiares actualizados correctamente',
      });
    }
    return res.status(500).json({
      error: 'No se pudieron actualizar los antecedentes heredo familiares',
    });
  } catch (err) {
    if (esErrorDominio(err)) {
      return res.status(400).json({ error: err.message });
    }
    return res.status(500).json({ error: err.message });
  }
};

// --- Antecedente Personal ---
export const registrarAntecedentesPersonalesNoPatologicos = async (
  req,
  res
) => {
  let agregado;
  try {
    agregado = new AntecedentePersonalAggregate(construirAgregado(req));
  } catch (err) {
    if (esErrorDominio(err)) {
      return res.status(400).json({
        error:
          err.message ||
          'Error al registrar los antecedentes personales no patológicos',
      });
    }
    return res.status(500).json({ error: err.message });
  }

  try {
    const ok = await AntecedentePersonal.create(agregado);
    if (ok) {
      return res.status(201).json({
        message:
          'Antecedentes personales no patológicos registrados correctamente',
      });
    }
    return res.status(500).json({
      error:
        'No se pudieron registrar los antecedentes personales no patológicos',
    });
  } catch (err) {
    if (esErrorDominio(err)) {
      return res.status(400).json({
        error:
          err.message ||
          'Error al registrar los antecedentes personales no patológicos',
      });
    }
    return res.status(500).json({
      error:
        err.message ||
        'Error al registrar los antecedentes personales no patológicos',
    });
  }
};

export const consultarAntecedentesPersonalesNoPatologicos = async (
  req,
  res
) => {
  try {
    const idHistoria = obtenerHistoriaId(req);
    const result = await AntecedentePersonal.getByHistoria(idHistoria);
    if (!result) {
      return res.status(404).json({ error: 'No encontrado' });
    }
    return res.status(200).json(result);
  } catch (err) {
    if (esErrorDominio(err)) {
      return res.status(400).json({ error: err.message });
    }
    return res.status(500).json({ error: err.message });
  }
};

export const actualizarAntecedentesPersonalesNoPatologicos = async (
  req,
  res
) => {
  let idHistoria;
  try {
    idHistoria = obtenerHistoriaId(req);
  } catch (err) {
    if (esErrorDominio(err)) {
      return res.status(400).json({
        error:
          err.message ||
          'Error al actualizar los antecedentes personales no patológicos',
      });
    }
    return res.status(500).json({ error: err.message });
  }

  try {
    const agregado = new AntecedentePersonalAggregate(construirAgregado(req));
    const ok = await AntecedentePersonal.update(idHistoria, agregado);
    if (ok) {
      return res.status(200).json({
        message:
          'Antecedentes personales no patológicos actualizados correctamente',
      });
    }
    return res.status(500).json({
      error:
        'No se pudieron actualizar los antecedentes personales no patológicos',
    });
  } catch (err) {
    if (esErrorDominio(err)) {
      return res.status(400).json({
        error:
          err.message ||
          'Error al actualizar los antecedentes personales no patológicos',
      });
    }
    return res.status(400).json({
      error:
        err.message ||
        'Error al actualizar los antecedentes personales no patológicos',
    });
  }
};

// --- Antecedente Médico ---
export const registrarAntecedentesPersonalesPatologicos = async (req, res) => {
  let agregado;
  try {
    agregado = new AntecedenteMedicoAggregate(construirAgregado(req));
  } catch (err) {
    if (esErrorDominio(err)) {
      return res.status(400).json({
        error:
          err.message ||
          'Error al registrar los antecedentes personales patológicos',
      });
    }
    return res.status(500).json({ error: err.message });
  }

  try {
    const ok = await AntecedenteMedico.create(agregado);
    if (ok) {
      return res.status(201).json({
        message:
          'Antecedentes personales patológicos registrados correctamente',
      });
    }
    return res.status(500).json({
      error: 'No se pudieron registrar los antecedentes personales patológicos',
    });
  } catch (err) {
    if (esErrorDominio(err)) {
      return res.status(400).json({
        error:
          err.message ||
          'Error al registrar los antecedentes personales patológicos',
      });
    }
    return res.status(500).json({ error: err.message });
  }
};

export const consultarAntecedentesPersonalesPatologicos = async (req, res) => {
  try {
    const idHistoria = obtenerHistoriaId(req);
    const result = await AntecedenteMedico.getByHistoria(idHistoria);
    if (!result) {
      return res.status(404).json({ error: 'No encontrado' });
    }
    return res.status(200).json(result);
  } catch (err) {
    if (esErrorDominio(err)) {
      return res.status(400).json({ error: err.message });
    }
    return res.status(500).json({ error: err.message });
  }
};

export const actualizarAntecedentesPersonalesPatologicos = async (req, res) => {
  let idHistoria;
  try {
    idHistoria = obtenerHistoriaId(req);
  } catch (err) {
    if (esErrorDominio(err)) {
      return res.status(400).json({
        error:
          err.message ||
          'Error al actualizar los antecedentes personales patológicos',
      });
    }
    return res.status(500).json({ error: err.message });
  }

  try {
    const agregado = new AntecedenteMedicoAggregate(construirAgregado(req));
    const ok = await AntecedenteMedico.update(idHistoria, agregado);
    if (ok) {
      return res.status(200).json({
        message:
          'Antecedentes personales patológicos actualizados correctamente',
      });
    }
    return res.status(500).json({
      error:
        'No se pudieron actualizar los antecedentes personales patológicos',
    });
  } catch (err) {
    if (esErrorDominio(err)) {
      return res.status(400).json({
        error:
          err.message ||
          'Error al actualizar los antecedentes personales patológicos',
      });
    }
    return res.status(500).json({ error: err.message });
  }
};

export const createAntecedenteCumplimiento = registrarSeguimientoDelTratamiento;
export const getAntecedenteCumplimiento = consultarSeguimientoDelTratamiento;
export const updateAntecedenteCumplimiento =
  actualizarSeguimientoDelTratamiento;

export const createAntecedenteFamiliar = registrarAntecedentesHeredoFamiliares;
export const getAntecedenteFamiliar = consultarAntecedentesHeredoFamiliares;
export const updateAntecedenteFamiliar = actualizarAntecedentesHeredoFamiliares;

export const createAntecedentePersonal =
  registrarAntecedentesPersonalesNoPatologicos;
export const getAntecedentePersonal =
  consultarAntecedentesPersonalesNoPatologicos;
export const updateAntecedentePersonal =
  actualizarAntecedentesPersonalesNoPatologicos;

export const createAntecedenteMedico =
  registrarAntecedentesPersonalesPatologicos;
export const getAntecedenteMedico = consultarAntecedentesPersonalesPatologicos;
export const updateAntecedenteMedico =
  actualizarAntecedentesPersonalesPatologicos;
