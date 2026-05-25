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

  // --- MÉTODOS EXAMEN GENERAL ---
  consultarExamenFisicoGeneralPorHistoria = async (req, res) => {
    const { id } = req.params;
    try {
      const exam =
        await this.HcModel.consultarExamenFisicoGeneralPorHistoria(id);
      res.status(200).json(exam || {});
    } catch {
      res.status(500).json({ error: 'Error al obtener el examen general' });
    }
  };

  actualizarExamenFisicoGeneralPorHistoria = async (req, res) => {
    const { id } = req.params;
    const data = req.body;

    try {
      await this.HcModel.actualizarExamenFisicoGeneralPorHistoria({
        idHistory: id,
        ...data,
      });
      res
        .status(200)
        .json({ message: 'Examen general guardado correctamente' });
    } catch {
      res.status(500).json({ error: 'Error al guardar el examen general' });
    }
  };

  // --- MÉTODOS EXAMEN REGIONAL ---

  consultarExamenFisicoRegionalPorHistoria = async (req, res) => {
    const { id } = req.params;
    try {
      const exam =
        await this.HcModel.consultarExamenFisicoRegionalPorHistoria(id);
      res.status(200).json(exam || {});
    } catch {
      res.status(500).json({ error: 'Error al obtener el examen regional' });
    }
  };

  actualizarExamenFisicoRegionalPorHistoria = async (req, res) => {
    const { id } = req.params;
    const data = req.body;

    try {
      await this.HcModel.actualizarExamenFisicoRegionalPorHistoria({
        idHistory: id,
        ...data,
      });
      res
        .status(200)
        .json({ message: 'Examen regional guardado correctamente' });
    } catch {
      res.status(500).json({ error: 'Error al guardar el examen regional' });
    }
  };

  // --- MÉTODOS EXAMEN BOCA ---

  consultarExamenBucalPorHistoria = async (req, res) => {
    const { id } = req.params;
    try {
      const exam = await this.HcModel.consultarExamenBucalPorHistoria(id);
      res.status(200).json(exam || {});
    } catch {
      res.status(500).json({ error: 'Error al obtener el examen de boca' });
    }
  };

  actualizarExamenBucalPorHistoria = async (req, res) => {
    const { id } = req.params;
    const data = req.body;
    try {
      await this.HcModel.actualizarExamenBucalPorHistoria({
        idHistory: id,
        ...data,
      });
      res
        .status(200)
        .json({ message: 'Examen de boca guardado correctamente' });
    } catch {
      res.status(500).json({ error: 'Error al guardar el examen de boca' });
    }
  };

  // --- CONTROLADORES HIGIENE BUCAL ---

  consultarHigieneBucalPorHistoria = async (req, res) => {
    const { id } = req.params;
    try {
      const result = await this.HcModel.consultarHigieneBucalPorHistoria(id);
      // Si no hay datos, devolvemos un objeto vacío para que el frontend no falle
      res.status(200).json(result || {});
    } catch {
      res
        .status(500)
        .json({ error: 'Error al obtener el examen de higiene oral' });
    }
  };

  actualizarHigieneBucal = async (req, res) => {
    const { id } = req.params; // ID de la Historia
    const { estadoHigiene } = req.body;

    // Obtenemos el ID del usuario autenticado desde el middleware
    const idUsuario = req.user.id;

    try {
      await this.HcModel.actualizarHigieneBucal({
        idHistory: id,
        estadoHigiene,
        idUsuario,
      });
      res.status(200).json({ message: 'Higiene bucal guardada correctamente' });
    } catch {
      res.status(500).json({ error: 'Error al guardar la higiene bucal' });
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

  // --- CONTROLADORES SECCIÓN IV (DERIVACIÓN) ---
  consultarDerivacionPorHistoria = async (req, res) => {
    const { id } = req.params;
    try {
      const data = await this.HcModel.consultarDerivacionPorHistoria(id);
      res.status(200).json(data || {});
    } catch {
      res.status(500).json({ error: 'Error al obtener derivaciones' });
    }
  };

  actualizarDerivacionPorHistoria = async (req, res) => {
    const { id } = req.params;
    const { destinos, observaciones, alumno, docente } = req.body;
    try {
      await this.HcModel.actualizarDerivacionPorHistoria({
        idHistory: id,
        destinos,
        observaciones,
        alumno,
        docente,
        idUsuario: req.user.id,
      });
      res.status(200).json({ message: 'Derivación guardada correctamente' });
    } catch {
      res.status(500).json({ error: 'Error al guardar derivación' });
    }
  };

  // --- CONTROLADORES SECCIÓN V (CLÍNICAS) ---
  consultarDiagnosticoClinicoPorHistoria = async (req, res) => {
    const { id } = req.params;
    try {
      const data =
        await this.HcModel.consultarDiagnosticoClinicoPorHistoria(id);
      res.status(200).json(data || {});
    } catch {
      res
        .status(500)
        .json({ error: 'Error al obtener diagnóstico de clínicas' });
    }
  };

  actualizarDiagnosticoClinicoPorHistoria = async (req, res) => {
    const { id } = req.params;
    try {
      await this.HcModel.actualizarDiagnosticoClinicoPorHistoria({
        idHistory: id,
        data: req.body,
        idUsuario: req.user.id,
      });
      res
        .status(200)
        .json({ message: 'Información clínica guardada correctamente' });
    } catch {
      // console.error(error);
      res.status(500).json({ error: 'Error al guardar información clínica' });
    }
  };

  // --- CONTROLADORES SECCIÓN VI (EVOLUCIÓN) ---

  consultarEvolucionesPorHistoria = async (req, res) => {
    const { id } = req.params;
    try {
      const list = await this.HcModel.consultarEvolucionesPorHistoria(id);
      res.status(200).json(list);
    } catch {
      res.status(500).json({ error: 'Error al obtener evoluciones' });
    }
  };

  registrarEvolucionClinica = async (req, res) => {
    const { id } = req.params;
    const { fecha, actividad, alumno } = req.body;

    // Validación básica
    if (!fecha || !actividad || !alumno) {
      return res
        .status(400)
        .json({ error: 'Todos los campos son obligatorios' });
    }

    try {
      await this.HcModel.registrarEvolucionClinica({
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
}
