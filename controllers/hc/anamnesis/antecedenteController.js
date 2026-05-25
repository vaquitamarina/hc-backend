import {
  AntecedentesPersonalesNoPatologicos,
  AntecedentesPersonalesPatologicos,
  AntecedentesHeredoFamiliares,
  SeguimientoDelTratamiento,
} from '../../../models/hc/anamnesis/antecedenteModel.js';
// --- Antecedente Cumplimiento ---
export const registrarSeguimientoDelTratamiento = async (req, res) => {
  try {
    const ok = await SeguimientoDelTratamiento.registrar(req.body);
    if (ok) {
      return res.status(201).json({
        message: 'Seguimiento del tratamiento registrado correctamente',
      });
    }
    return res
      .status(500)
      .json({ error: 'No se pudo registrar el seguimiento del tratamiento' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const consultarSeguimientoDelTratamiento = async (req, res) => {
  try {
    const { id_historia } = req.params;
    const result =
      await SeguimientoDelTratamiento.consultarPorHistoria(id_historia);
    if (!result) {
      return res.status(404).json({ error: 'No encontrado' });
    }
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const actualizarSeguimientoDelTratamiento = async (req, res) => {
  try {
    const { id_historia } = req.params;
    const ok = await SeguimientoDelTratamiento.actualizarPorHistoria(
      id_historia,
      req.body
    );
    if (ok) {
      return res.status(200).json({
        message: 'Seguimiento del tratamiento actualizado correctamente',
      });
    }
    return res
      .status(500)
      .json({ error: 'No se pudo actualizar el seguimiento del tratamiento' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
// --- Antecedente Familiar ---
export const registrarAntecedentesHeredoFamiliares = async (req, res) => {
  try {
    const ok = await AntecedentesHeredoFamiliares.registrar(req.body);
    if (ok) {
      return res.status(201).json({
        message: 'Antecedentes heredo familiares registrados correctamente',
      });
    }
    return res.status(500).json({
      error: 'No se pudieron registrar los antecedentes heredo familiares',
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const consultarAntecedentesHeredoFamiliares = async (req, res) => {
  try {
    const { id_historia } = req.params;
    const result =
      await AntecedentesHeredoFamiliares.consultarPorHistoria(id_historia);
    if (!result) {
      return res.status(404).json({ error: 'No encontrado' });
    }
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const actualizarAntecedentesHeredoFamiliares = async (req, res) => {
  try {
    const { id_historia } = req.params;
    const ok = await AntecedentesHeredoFamiliares.actualizarPorHistoria(
      id_historia,
      req.body
    );
    if (ok) {
      return res.status(200).json({
        message: 'Antecedentes heredo familiares actualizados correctamente',
      });
    }
    return res.status(500).json({
      error: 'No se pudieron actualizar los antecedentes heredo familiares',
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// --- Antecedente Personal ---
export const registrarAntecedentesPersonalesNoPatologicos = async (
  req,
  res
) => {
  try {
    const ok = await AntecedentesPersonalesNoPatologicos.registrar(req.body);
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
    // console.error('Error en registrarAntecedentesPersonalesNoPatologicos:', err);
    return res.status(400).json({
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
    const { id_historia } = req.params;
    const result =
      await AntecedentesPersonalesNoPatologicos.consultarPorHistoria(
        id_historia
      );
    if (!result) {
      return res.status(404).json({ error: 'No encontrado' });
    }
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const actualizarAntecedentesPersonalesNoPatologicos = async (
  req,
  res
) => {
  try {
    const { id_historia } = req.params;
    const ok = await AntecedentesPersonalesNoPatologicos.actualizarPorHistoria(
      id_historia,
      req.body
    );
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
    // console.error('Error en actualizarAntecedentesPersonalesNoPatologicos:', err);
    return res.status(400).json({
      error:
        err.message ||
        'Error al actualizar los antecedentes personales no patológicos',
    });
  }
};

// --- Antecedente Médico ---
export const registrarAntecedentesPersonalesPatologicos = async (req, res) => {
  try {
    const ok = await AntecedentesPersonalesPatologicos.registrar(req.body);
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
    res.status(500).json({ error: err.message });
  }
};

export const consultarAntecedentesPersonalesPatologicos = async (req, res) => {
  try {
    const { id_historia } = req.params;
    const result =
      await AntecedentesPersonalesPatologicos.consultarPorHistoria(id_historia);
    if (!result) {
      return res.status(404).json({ error: 'No encontrado' });
    }
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const actualizarAntecedentesPersonalesPatologicos = async (req, res) => {
  try {
    const { id_historia } = req.params;
    const ok = await AntecedentesPersonalesPatologicos.actualizarPorHistoria(
      id_historia,
      req.body
    );
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
    res.status(500).json({ error: err.message });
  }
};
