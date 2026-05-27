export class HcController {
  constructor(HcModel) {
    this.HcModel = HcModel;
  }

  registrarRevisionHistoriaClinica = async (req, res) => {
    const { idHistory, idTeacher, state, observations } = req.body;
    const result = await this.HcModel.registrarRevisionHistoriaClinica({
      idHistory,
      idTeacher,
      state,
      observations,
    });
    if (result) {
      return res.status(201).json({
        message: 'Revision registrada con exito',
      });
    } else {
      return res.status(500).json({
        error: 'Error al registrar la revision',
      });
    }
  };

  listarHistoriasClinicasPorEstudiante = async (req, res) => {
    try {
      const { id } = req.params;
      const historias =
        await this.HcModel.listarHistoriasClinicasPorEstudiante(id);
      res.status(200).json(historias);
    } catch {
      // console.error('Error al obtener historias clínicas:', error);
      res.status(500).json({ error: 'Error al obtener historias clínicas' });
    }
  };

  consultarDatosPersonalesPorHistoriaClinica = async (req, res) => {
    const { id } = req.params;
    const filiation =
      await this.HcModel.consultarDatosPersonalesPorHistoriaClinica(id);
    if (!filiation) {
      return res.status(404).json({
        error: 'Filiación no encontrada',
      });
    }
    res.status(200).json(filiation);
  };

  registrarHistoriaClinica = async (req, res) => {
    const { idStudent } = req.body;
    const hc = await this.HcModel.registrarHistoriaClinica(idStudent);
    if (!hc) {
      return res.status(500).json({
        error: 'Error al registrar la historia clinica',
      });
    }
    res.status(201).json(hc);
  };

  obtenerBorradorHistoriaClinica = async (req, res) => {
    try {
      // El idStudent viene del token JWT (req.user.id)
      const result = await this.HcModel.obtenerBorradorHistoriaClinica(
        req.user.id
      );

      return res.status(200).json({
        id_historia: result.id_historia,
      });
    } catch {
      // console.error('Error al crear/obtener borrador:', error);
      return res.status(500).json({
        error: 'Error al crear historia clinica en borrador',
      });
    }
  };

  asignarPacienteAHistoriaClinica = async (req, res) => {
    try {
      const { idHistory, idPatient } = req.body;

      await this.HcModel.asignarPacienteAHistoriaClinica(idHistory, idPatient);

      return res.status(200).json({
        message: 'Paciente asignado a la historia clinica',
      });
    } catch (error) {
      // console.error('Error al asignar paciente:', error);
      if (error.message && error.message.includes('no encontrada')) {
        return res.status(400).json({
          error: error.message,
        });
      }
      return res.status(500).json({
        error: 'Error al asignar paciente a la historia',
      });
    }
  };

  consultarPacientePorHistoriaClinica = async (req, res) => {
    try {
      const { id } = req.params;
      const patient =
        await this.HcModel.consultarPacientePorHistoriaClinica(id);

      if (!patient) {
        return res.status(404).json({
          error: 'Paciente no encontrado o historia sin paciente asignado',
        });
      }

      return res.status(200).json(patient);
    } catch {
      // console.error('Error al obtener paciente:', error);
      return res.status(500).json({
        error: 'Error al obtener datos del paciente',
      });
    }
  };

  actualizarDatosPersonalesHistoriaClinica = async (req, res) => {
    const { id } = req.params;
    const data = req.body;

    try {
      await this.HcModel.actualizarDatosPersonalesHistoriaClinica({
        idHistory: id,
        ...data,
      });

      res.status(200).json({ message: 'Filiación guardada correctamente' });
    } catch (error) {
      if (error.message && error.message.includes('no encontrado')) {
        return res.status(400).json({ error: error.message });
      }
      return res.status(500).json({ error: 'Error al guardar la filiación' });
    }
  };

  // --- CONTROLADORES SECCIÓN III (PRESUNTIVO) ---
  consultarDiagnosticoPresuntivoPorHistoria = async (req, res) => {
    const { id } = req.params;
    try {
      const data =
        await this.HcModel.consultarDiagnosticoPresuntivoPorHistoria(id);
      res.status(200).json(data);
    } catch {
      res
        .status(500)
        .json({ error: 'Error al obtener diagnóstico presuntivo' });
    }
  };

  actualizarDiagnosticoPresuntivoPorHistoria = async (req, res) => {
    const { id } = req.params;
    const { descripcion } = req.body;
    try {
      await this.HcModel.actualizarDiagnosticoPresuntivoPorHistoria({
        idHistory: id,
        descripcion,
        idUsuario: req.user.id,
      });
      res.status(200).json({ message: 'Diagnóstico presuntivo guardado' });
    } catch {
      res.status(500).json({ error: 'Error al guardar diagnóstico' });
    }
  };
}
