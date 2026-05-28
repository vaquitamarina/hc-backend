import {
  RevisionHistoriaClinicaAggregate,
  RegistroHistoriaClinicaAggregate,
  AsignacionPacienteAggregate,
  ConsultaPacienteHistoriaClinicaAggregate,
  ConsultaHistoriasEstudianteAggregate,
  DomainError,
} from '../domain/hcDomain.js';
import HcRepository from '../infrastructure/hcRepository.js';

function esErrorDominio(err) {
  return err && (err instanceof DomainError || err.name === 'DomainError');
}

function construirAgregadoRevision(req) {
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

function construirAgregadoRegistro(req) {
  const payload = {
    idStudent: req.body.idStudent ?? req.body.id_estudiante ?? req.user?.id,
  };
  return new RegistroHistoriaClinicaAggregate(payload);
}

function construirAgregadoAsignacion(req) {
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

function construirAgregadoConsultaPaciente(req) {
  const payload = { id: req.params.id ?? req.query.id ?? req.body.id };
  return new ConsultaPacienteHistoriaClinicaAggregate(payload);
}

function construirAgregadoConsultaEstudiante(req) {
  const payload = { id: req.params.id ?? req.query.id ?? req.body.id };
  return new ConsultaHistoriasEstudianteAggregate(payload);
}

const registrarRevisionHistoriaClinica = async (req, res) => {
  try {
    const agregado = construirAgregadoRevision(req);
    const ok = await HcRepository.registrarRevisionHistoriaClinica(agregado);
    if (ok) {
      return res.status(201).json({ message: 'Revision registrada con exito' });
    }
    return res.status(500).json({ error: 'Error al registrar la revision' });
  } catch (err) {
    if (esErrorDominio(err)) {
      return res.status(400).json({ error: err.message });
    }
    return res.status(500).json({ error: err.message || 'Error del servidor' });
  }
};

const consultarPacientePorHistoriaClinica = async (req, res) => {
  try {
    const agregado = construirAgregadoConsultaPaciente(req);
    const patient =
      await HcRepository.consultarPacientePorHistoriaClinica(agregado);
    if (!patient) {
      return res.status(404).json({
        error: 'Paciente no encontrado o historia sin paciente asignado',
      });
    }
    return res.status(200).json(patient);
  } catch (err) {
    if (esErrorDominio(err)) {
      return res.status(400).json({ error: err.message });
    }
    return res
      .status(500)
      .json({ error: err.message || 'Error al obtener datos del paciente' });
  }
};

const listarHistoriasClinicasPorEstudiante = async (req, res) => {
  try {
    const agregado = construirAgregadoConsultaEstudiante(req);
    const historias =
      await HcRepository.listarHistoriasClinicasPorEstudiante(agregado);
    return res.status(200).json(historias);
  } catch (err) {
    if (esErrorDominio(err)) {
      return res.status(400).json({ error: err.message });
    }
    return res
      .status(500)
      .json({ error: err.message || 'Error al obtener historias clínicas' });
  }
};

const registrarHistoriaClinica = async (req, res) => {
  try {
    const agregado = construirAgregadoRegistro(req);
    const hc = await HcRepository.registrarHistoriaClinica(agregado);
    if (!hc) {
      return res
        .status(500)
        .json({ error: 'Error al registrar la historia clinica' });
    }
    return res.status(201).json(hc);
  } catch (err) {
    if (esErrorDominio(err)) {
      return res.status(400).json({ error: err.message });
    }
    return res.status(500).json({ error: err.message || 'Error del servidor' });
  }
};

const obtenerBorradorHistoriaClinica = async (req, res) => {
  try {
    const agregado = construirAgregadoConsultaEstudiante(req);
    const result = await HcRepository.obtenerBorradorHistoriaClinica(agregado);
    return res.status(200).json({ id_historia: result.id_historia });
  } catch (err) {
    if (esErrorDominio(err)) {
      return res.status(400).json({ error: err.message });
    }
    return res.status(500).json({
      error: err.message || 'Error al crear historia clinica en borrador',
    });
  }
};

const asignarPacienteAHistoriaClinica = async (req, res) => {
  try {
    const agregado = construirAgregadoAsignacion(req);
    await HcRepository.asignarPacienteAHistoriaClinica(agregado);
    return res
      .status(200)
      .json({ message: 'Paciente asignado a la historia clinica' });
  } catch (err) {
    if (esErrorDominio(err)) {
      return res.status(400).json({ error: err.message });
    }
    return res.status(500).json({
      error: err.message || 'Error al asignar paciente a la historia',
    });
  }
};

export default {
  registrarRevisionHistoriaClinica,
  consultarPacientePorHistoriaClinica,
  listarHistoriasClinicasPorEstudiante,
  registrarHistoriaClinica,
  obtenerBorradorHistoriaClinica,
  asignarPacienteAHistoriaClinica,
};
