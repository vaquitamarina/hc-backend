import {
  RevisionHistoriaClinicaAggregate,
  RegistroHistoriaClinicaAggregate,
  AsignacionPacienteAggregate,
  ConsultaPacienteHistoriaClinicaAggregate,
  ConsultaHistoriasEstudianteAggregate,
  DomainError,
} from '../../models/hc/hcModel.js';

export class HcController {
  constructor(HcModel) {
    this.HcModel = HcModel;
  }

  esErrorDominio(err) {
    return err && err.name === 'DomainError';
  }

  construirAgregadoRevision(req) {
    const payload = {
      idHistory:
        req.body.idHistory ??
        req.body.id_historia ??
        req.params.id ??
        req.body.id,
      idTeacher: req.body.idTeacher ?? req.user?.id ?? req.body.id_docente,
      state: req.body.state ?? req.body.estado ?? req.body.estadoRevision,
      observations: req.body.observations ?? req.body.observaciones,
    };

    return new RevisionHistoriaClinicaAggregate(payload);
  }

  construirAgregadoRegistro(req) {
    const payload = {
      idStudent: req.body.idStudent ?? req.body.id_estudiante ?? req.user?.id,
    };
    return new RegistroHistoriaClinicaAggregate(payload);
  }

  construirAgregadoAsignacion(req) {
    const payload = {
      idHistory:
        req.body.idHistory ??
        req.body.id_historia ??
        req.body.idHistoria ??
        req.params.id,
      idPatient:
        req.body.idPatient ?? req.body.id_paciente ?? req.body.pacienteId,
    };
    return new AsignacionPacienteAggregate(payload);
  }

  construirAgregadoConsultaPaciente(req) {
    const payload = { id: req.params.id ?? req.query.id ?? req.body.id };
    return new ConsultaPacienteHistoriaClinicaAggregate(payload);
  }

  construirAgregadoConsultaEstudiante(req) {
    const payload = { id: req.params.id ?? req.query.id ?? req.body.id };
    return new ConsultaHistoriasEstudianteAggregate(payload);
  }

  registrarRevisionHistoriaClinica = async (req, res) => {
    try {
      const agregado = this.construirAgregadoRevision(req);
      const ok = await this.HcModel.registrarRevisionHistoriaClinica(agregado);
      if (ok) {
        return res
          .status(201)
          .json({ message: 'Revision registrada con exito' });
      }
      return res.status(500).json({ error: 'Error al registrar la revision' });
    } catch (err) {
      if (this.esErrorDominio(err)) {
        return res.status(400).json({ error: err.message });
      }
      return res
        .status(500)
        .json({ error: err.message || 'Error del servidor' });
    }
  };

  consultarPacientePorHistoriaClinica = async (req, res) => {
    try {
      const agregado = this.construirAgregadoConsultaPaciente(req);
      const patient =
        await this.HcModel.consultarPacientePorHistoriaClinica(agregado);
      if (!patient) {
        return res.status(404).json({
          error: 'Paciente no encontrado o historia sin paciente asignado',
        });
      }
      return res.status(200).json(patient);
    } catch (err) {
      if (this.esErrorDominio(err)) {
        return res.status(400).json({ error: err.message });
      }
      return res
        .status(500)
        .json({ error: err.message || 'Error al obtener datos del paciente' });
    }
  };

  listarHistoriasClinicasPorEstudiante = async (req, res) => {
    try {
      const agregado = this.construirAgregadoConsultaEstudiante(req);
      const historias =
        await this.HcModel.listarHistoriasClinicasPorEstudiante(agregado);
      return res.status(200).json(historias);
    } catch (err) {
      if (this.esErrorDominio(err)) {
        return res.status(400).json({ error: err.message });
      }
      return res
        .status(500)
        .json({ error: err.message || 'Error al obtener historias clínicas' });
    }
  };

  registrarHistoriaClinica = async (req, res) => {
    try {
      const agregado = this.construirAgregadoRegistro(req);
      const hc = await this.HcModel.registrarHistoriaClinica(agregado);
      if (!hc) {
        return res
          .status(500)
          .json({ error: 'Error al registrar la historia clinica' });
      }
      return res.status(201).json(hc);
    } catch (err) {
      if (this.esErrorDominio(err)) {
        return res.status(400).json({ error: err.message });
      }
      return res
        .status(500)
        .json({ error: err.message || 'Error del servidor' });
    }
  };

  obtenerBorradorHistoriaClinica = async (req, res) => {
    try {
      const agregado = this.construirAgregadoConsultaEstudiante(req);
      const result =
        await this.HcModel.obtenerBorradorHistoriaClinica(agregado);
      return res.status(200).json({ id_historia: result.id_historia });
    } catch (err) {
      if (this.esErrorDominio(err)) {
        return res.status(400).json({ error: err.message });
      }
      return res.status(500).json({
        error: err.message || 'Error al crear historia clinica en borrador',
      });
    }
  };

  asignarPacienteAHistoriaClinica = async (req, res) => {
    try {
      const agregado = this.construirAgregadoAsignacion(req);
      await this.HcModel.asignarPacienteAHistoriaClinica(agregado);
      return res
        .status(200)
        .json({ message: 'Paciente asignado a la historia clinica' });
    } catch (err) {
      if (this.esErrorDominio(err)) {
        return res.status(400).json({ error: err.message });
      }
      return res.status(500).json({
        error: err.message || 'Error al asignar paciente a la historia',
      });
    }
  };

  // Compatibilidad de nombres antiguos que usan las rutas
  createReview = this.registrarRevisionHistoriaClinica;
  getPatientByHistory = this.consultarPacientePorHistoriaClinica;
  getAllByStudentId = this.listarHistoriasClinicasPorEstudiante;
  registerHc = this.registrarHistoriaClinica;
  createDraft = this.obtenerBorradorHistoriaClinica;
  assignPatient = this.asignarPacienteAHistoriaClinica;
}
