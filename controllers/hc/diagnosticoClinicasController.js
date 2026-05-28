import {
  consultarDiagnosticoClinicas as modelConsultar,
  actualizarDiagnosticoClinicas as modelActualizar,
  DiagnosticoClinicasAggregate,
  DomainError,
} from '../../models/hc/diagnosticoClinicasModel.js';

const stripHCPrefix = (id) => {
  if (!id) {
    return id;
  }
  return id.startsWith('HC-') ? id.slice(3) : id;
};

const esErrorDominio = (err) => err && err.name === 'DomainError';

const primerValor = (obj, claves) => {
  for (const clave of claves) {
    const valor = obj?.[clave];
    if (valor !== undefined) {
      return valor;
    }
  }
  return undefined;
};

const normalizarDatosDiagnosticoClinicas = (body = {}) => ({
  fechaRespuesta: primerValor(body, ['fechaRespuesta', 'fecha']),
  clinicaRespuesta: primerValor(body, [
    'clinicaRespuesta',
    'clinica',
    'clinica_respuesta',
  ]),
  descripcionRespuesta: primerValor(body, [
    'descripcionRespuesta',
    'descripcion',
    'diagnosticoDefinitivo',
    'diagnostico_definitivo',
  ]),
  examenes: primerValor(body, [
    'examenes',
    'examenesAuxiliares',
    'examenes_auxiliares',
  ]),
  interconsultaTipo: primerValor(body, [
    'interconsultaTipo',
    'interconsultaMotivo',
    'interconsultaDetalle',
    'motivo',
  ]),
  interconsultaFecha: primerValor(body, [
    'interconsultaFecha',
    'fechaInterconsulta',
    'fecha_interconsulta',
  ]),
  interconsultaClinica: primerValor(body, [
    'interconsultaClinica',
    'clinicaInterconsulta',
    'clinica_interconsulta',
  ]),
  diagnosticoDefinitivo: primerValor(body, [
    'diagnosticoDefinitivo',
    'diagnostico_definitivo',
  ]),
  tratamiento: primerValor(body, [
    'tratamiento',
    'tratamientoARealizar',
    'tratamiento_realizar',
  ]),
  pronostico: primerValor(body, ['pronostico']),
  alumnoTratante: primerValor(body, [
    'alumnoTratante',
    'alumno_tratante',
    'alumno',
  ]),
});

const construirIdHistoria = (req) => {
  const id = req.params.id_historia || req.params.id;
  if (!id) {
    throw new DomainError('id_historia es requerido');
  }
  return stripHCPrefix(String(id));
};

const construirAgregado = (req) => {
  const idHistory = req.params.id_historia || req.params.id;
  return new DiagnosticoClinicasAggregate({
    idHistory,
    data: normalizarDatosDiagnosticoClinicas(req.body),
    idUsuario: req.user && req.user.id,
  });
};

export const consultarDiagnosticoClinico = async (req, res) => {
  try {
    const id = construirIdHistoria(req);
    const data = await modelConsultar(id);
    res.status(200).json(data || {});
  } catch (err) {
    if (esErrorDominio(err)) {
      return res.status(400).json({ error: err.message });
    }
    res.status(500).json({ error: 'Error al obtener diagnóstico de clínicas' });
  }
};

export const actualizarDiagnosticoClinico = async (req, res) => {
  try {
    const agregado = construirAgregado(req);
    await modelActualizar(agregado);
    res
      .status(200)
      .json({ message: 'Información clínica guardada correctamente' });
  } catch (err) {
    if (esErrorDominio(err)) {
      return res.status(400).json({ error: err.message });
    }
    res.status(500).json({ error: 'Error al guardar información clínica' });
  }
};
