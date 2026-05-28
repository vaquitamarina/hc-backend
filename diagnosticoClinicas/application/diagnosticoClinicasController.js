import {
  DomainError,
  DiagnosticoClinicasAggregate,
} from '../domain/diagnosticoClinicasDomain.js';
import { DiagnosticoClinicasRepository } from '../infrastructure/diagnosticoClinicasRepository.js';

const repo = new DiagnosticoClinicasRepository();

const esErrorDominio = (err) =>
  err && (err instanceof DomainError || err.name === 'DomainError');

const stripHCPrefix = (id) => {
  if (!id) {
    return id;
  }
  return id.startsWith('HC-') ? id.slice(3) : id;
};

const construirIdHistoria = (req) => {
  const id = req.params.id_historia || req.params.id;
  if (!id) {
    throw new DomainError('id_historia es requerido');
  }
  return stripHCPrefix(String(id));
};

const normalizarDatos = (body = {}) => ({
  fechaRespuesta: body.fechaRespuesta || body.fecha,
  clinicaRespuesta:
    body.clinicaRespuesta || body.clinica || body.clinica_respuesta,
  descripcionRespuesta:
    body.descripcionRespuesta ||
    body.descripcion ||
    body.diagnosticoDefinitivo ||
    body.diagnostico_definitivo,
  examenes:
    body.examenes || body.examenesAuxiliares || body.examenes_auxiliares,
  interconsultaTipo:
    body.interconsultaTipo ||
    body.interconsultaMotivo ||
    body.interconsultaDetalle ||
    body.motivo,
  interconsultaFecha:
    body.interconsultaFecha ||
    body.fechaInterconsulta ||
    body.fecha_interconsulta,
  interconsultaClinica:
    body.interconsultaClinica ||
    body.clinicaInterconsulta ||
    body.clinica_interconsulta,
  diagnosticoDefinitivo:
    body.diagnosticoDefinitivo || body.diagnostico_definitivo,
  tratamiento:
    body.tratamiento || body.tratamientoARealizar || body.tratamiento_realizar,
  pronostico: body.pronostico,
  alumnoTratante: body.alumnoTratante || body.alumno_tratante || body.alumno,
});

const construirAgregado = (req) => {
  const idHistory = req.params.id_historia || req.params.id;
  return new DiagnosticoClinicasAggregate({
    idHistory,
    data: normalizarDatos(req.body),
    idUsuario: req.user && req.user.id,
  });
};

export const DiagnosticoClinicasController = {
  consultarDiagnosticoClinico: async (req, res) => {
    try {
      const id = construirIdHistoria(req);
      const data = await repo.consultarPorHistoria(id);
      res.status(200).json(data || {});
    } catch (err) {
      if (esErrorDominio(err)) {
        return res.status(400).json({ error: err.message });
      }
      res
        .status(500)
        .json({ error: 'Error al obtener diagnóstico de clínicas' });
    }
  },

  actualizarDiagnosticoClinico: async (req, res) => {
    try {
      const agregado = construirAgregado(req);
      await repo.actualizarDiagnosticoClinicas(agregado);
      res
        .status(200)
        .json({ message: 'Información clínica guardada correctamente' });
    } catch (err) {
      if (esErrorDominio(err)) {
        return res.status(400).json({ error: err.message });
      }
      res.status(500).json({ error: 'Error al guardar información clínica' });
    }
  },
};
