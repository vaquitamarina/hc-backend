import * as diagnosticoModel from '../../models/hc/diagnosticoPresuntivoModel.js';

export const consultarDiagnosticoPresuntivo = async (req, res) => {
  try {
    const id = req.params.id_historia || req.params.id;
    const result = await diagnosticoModel.consultarDiagnosticoPresuntivo(id);
    res.status(200).json(result || {});
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const actualizarDiagnosticoPresuntivo = async (req, res) => {
  try {
    const id = req.params.id_historia || req.params.id;
    const { descripcion } = req.body;
    await diagnosticoModel.actualizarDiagnosticoPresuntivo({
      idHistory: id,
      descripcion,
      idUsuario: req.user.id,
    });
    res.status(200).json({ message: 'Diagnóstico presuntivo guardado' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
