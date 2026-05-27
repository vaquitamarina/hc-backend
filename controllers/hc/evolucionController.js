import {
  consultarEvoluciones as modelConsultar,
  registrarEvolucion as modelRegistrar,
} from '../../models/hc/evolucionModel.js';

export const consultarEvoluciones = async (req, res) => {
  try {
    const id = req.params.id_historia || req.params.id;
    const list = await modelConsultar(id);
    res.status(200).json(list);
  } catch {
    res.status(500).json({ error: 'Error al obtener evoluciones' });
  }
};

export const registrarEvolucion = async (req, res) => {
  const id = req.params.id_historia || req.params.id;
  const { fecha, actividad, alumno } = req.body;

  if (!fecha || !actividad || !alumno) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios' });
  }

  try {
    await modelRegistrar({
      idHistory: id,
      fecha,
      actividad,
      alumno,
      idUsuario: req.user.id,
    });
    res.status(201).json({ message: 'Evolución registrada correctamente' });
  } catch {
    res.status(500).json({ error: 'Error al registrar evolución' });
  }
};
