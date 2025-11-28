export class HcController {
  constructor(HcModel) {
    this.HcModel = HcModel;
  }

  createReview = async (req, res) => {
    const { idHistory, idTeacher, state, observations } = req.body;
    const result = await this.HcModel.createReview({
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

  getAllByStudentId = async (req, res) => {
    try {
      const { id } = req.params;
      const historias = await this.HcModel.getAllByStudentId(id);
      res.status(200).json(historias);
    } catch (error) {
      console.error('Error al obtener historias clínicas:', error);
      res.status(500).json({ error: 'Error al obtener historias clínicas' });
    }
  };

  getFiliationByIdHistory = async (req, res) => {
    const { id } = req.params;
    const filiation = await this.HcModel.getFiliationByIdHistory(id);
    if (!filiation) {
      return res.status(404).json({
        error: 'Filiación no encontrada',
      });
    }
    res.status(200).json(filiation);
  };

  registerHc = async (req, res) => {
    const { idStudent } = req.body;
    const hc = await this.HcModel.registerHc(idStudent);
    if (!hc) {
      return res.status(500).json({
        error: 'Error al registrar la historia clinica',
      });
    }
    res.status(201).json(hc);
  };

  createDraft = async (req, res) => {
    try {
      // El idStudent viene del token JWT (req.user.id)
      const result = await this.HcModel.createDraft(req.user.id);

      return res.status(200).json({
        id_historia: result.id_historia,
      });
    } catch (error) {
      console.error('Error al crear/obtener borrador:', error);
      return res.status(500).json({
        error: 'Error al crear historia clinica en borrador',
      });
    }
  };

  assignPatient = async (req, res) => {
    try {
      const { idHistory, idPatient } = req.body;

      await this.HcModel.assignPatient(idHistory, idPatient);

      return res.status(200).json({
        message: 'Paciente asignado a la historia clinica',
      });
    } catch (error) {
      console.error('Error al asignar paciente:', error);

      // Errores específicos de validación del procedure
      if (
        error.message.includes('no encontrada') ||
        error.message.includes('no está en estado borrador')
      ) {
        return res.status(400).json({
          error: error.message,
        });
      }

      return res.status(500).json({
        error: 'Error al asignar paciente a la historia',
      });
    }
  };

  getPatientByHistory = async (req, res) => {
    try {
      const { id } = req.params;
      const patient = await this.HcModel.getPatientByHistory(id);

      if (!patient) {
        return res.status(404).json({
          error: 'Paciente no encontrado o historia sin paciente asignado',
        });
      }

      return res.status(200).json(patient);
    } catch (error) {
      console.error('Error al obtener paciente:', error);
      return res.status(500).json({
        error: 'Error al obtener datos del paciente',
      });
    }
  };

  updateFiliation = async (req, res) => {
    const { id } = req.params;
    const data = req.body;

    try {
      await this.HcModel.updateFiliation({
        idHistory: id,
        ...data,
      });

      res.status(200).json({ message: 'Filiación guardada correctamente' });
    } catch (error) {
      if (error.message.includes('no encontrado')) {
        return res.status(400).json({ error: error.message });
      }
      return res.status(500).json({ error: 'Error al guardar la filiación' });
    }
  };

  // --- MÉTODOS EXAMEN GENERAL ---
  getGeneralExam = async (req, res) => {
    const { id } = req.params;
    try {
      const exam = await this.HcModel.getGeneralExam(id);
      res.status(200).json(exam || {});
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener el examen general' });
    }
  };

  updateGeneralExam = async (req, res) => {
    const { id } = req.params;
    const data = req.body;

    try {
      await this.HcModel.updateGeneralExam({
        idHistory: id,
        ...data,
      });
      res
        .status(200)
        .json({ message: 'Examen general guardado correctamente' });
    } catch (error) {
      res.status(500).json({ error: 'Error al guardar el examen general' });
    }
  };

  // --- MÉTODOS EXAMEN REGIONAL ---

  getRegionalExam = async (req, res) => {
    const { id } = req.params;
    try {
      const exam = await this.HcModel.getRegionalExam(id);
      res.status(200).json(exam || {});
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener el examen regional' });
    }
  };

  updateRegionalExam = async (req, res) => {
    const { id } = req.params;
    const data = req.body;

    try {
      await this.HcModel.updateRegionalExam({
        idHistory: id,
        ...data,
      });
      res
        .status(200)
        .json({ message: 'Examen regional guardado correctamente' });
    } catch (error) {
      res.status(500).json({ error: 'Error al guardar el examen regional' });
    }
  };
}
