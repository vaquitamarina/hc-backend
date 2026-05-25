import { Router } from 'express';
import { HcController } from '../controllers/hc/hcController.js';
import { HcModel } from '../models/hc/hcModel.js';
import { listarHistoriasClinicasAdultasDeEstudiante } from '../controllers/hc/hcController/listaHcAdultos.js';
import * as examenGeneralController from '../controllers/hc/examenFisico/examenGeneralController.js';
import * as examenRegionalController from '../controllers/hc/examenFisico/examenRegionalController.js';
import authMiddleware from '../middlewares/authMiddleware.js';
import * as motivoConsultaController from '../controllers/hc/anamnesis/motivoConsultaController.js';
import * as antecedentePersonalController from '../controllers/hc/anamnesis/antecedenteController.js';
import * as enfermedadActualController from '../controllers/hc/anamnesis/enfermedadActualController.js';
import * as filiacionController from '../controllers/hc/anamnesis/filiacionController.js';

export const hcRoutes = Router();

const hcController = new HcController(HcModel);

hcRoutes.use(authMiddleware);

// Endpoints motivo_consulta
hcRoutes.post(
  '/motivo-consulta',
  motivoConsultaController.registrarMotivoConsulta
);
hcRoutes.get(
  '/motivo-consulta/historia/:id_historia',
  motivoConsultaController.consultarMotivoConsulta
);
hcRoutes.put(
  '/motivo-consulta/historia/:id_historia',
  motivoConsultaController.actualizarMotivoConsulta
);

// Endpoints antecedente_personal
hcRoutes.post(
  '/antecedente-personal',
  antecedentePersonalController.registrarAntecedentesPersonalesNoPatologicos
);
hcRoutes.get(
  '/antecedente-personal/historia/:id_historia',
  antecedentePersonalController.consultarAntecedentesPersonalesNoPatologicos
);
hcRoutes.put(
  '/antecedente-personal/historia/:id_historia',
  antecedentePersonalController.actualizarAntecedentesPersonalesNoPatologicos
);
// Endpoints antecedente_medico
hcRoutes.post(
  '/antecedente-medico',
  antecedentePersonalController.registrarAntecedentesPersonalesPatologicos
);
hcRoutes.get(
  '/antecedente-medico/historia/:id_historia',
  antecedentePersonalController.consultarAntecedentesPersonalesPatologicos
);
hcRoutes.put(
  '/antecedente-medico/historia/:id_historia',
  antecedentePersonalController.actualizarAntecedentesPersonalesPatologicos
);
// Endpoints antecedente_familiar
hcRoutes.post(
  '/antecedente-familiar',
  antecedentePersonalController.registrarAntecedentesHeredoFamiliares
);
hcRoutes.get(
  '/antecedente-familiar/historia/:id_historia',
  antecedentePersonalController.consultarAntecedentesHeredoFamiliares
);
hcRoutes.put(
  '/antecedente-familiar/historia/:id_historia',
  antecedentePersonalController.actualizarAntecedentesHeredoFamiliares
);
// Endpoints antecedente_cumplimiento
hcRoutes.post(
  '/antecedente-cumplimiento',
  antecedentePersonalController.registrarSeguimientoDelTratamiento
);
hcRoutes.get(
  '/antecedente-cumplimiento/historia/:id_historia',
  antecedentePersonalController.consultarSeguimientoDelTratamiento
);
hcRoutes.put(
  '/antecedente-cumplimiento/historia/:id_historia',
  antecedentePersonalController.actualizarSeguimientoDelTratamiento
);

// Endpoints enfermedad_actual
hcRoutes.post(
  '/enfermedad-actual',
  enfermedadActualController.registrarEnfermedadActual
);
hcRoutes.get(
  '/enfermedad-actual/historia/:id_historia',
  enfermedadActualController.consultarEnfermedadActual
);
hcRoutes.put(
  '/enfermedad-actual/historia/:id_historia',
  enfermedadActualController.actualizarEnfermedadActual
);

// Endpoints filiacion
hcRoutes.post(
  '/filiacion',
  filiacionController.registrarDatosPersonalesPaciente
);
hcRoutes.get(
  '/filiacion/historia/:id_historia',
  filiacionController.consultarDatosPersonalesPaciente
);
hcRoutes.put(
  '/filiacion/historia/:id_historia',
  filiacionController.actualizarDatosPersonalesPaciente
);

hcRoutes.get('/:id/patient', hcController.consultarPacientePorHistoriaClinica);

hcRoutes.post('/review', hcController.registrarRevisionHistoriaClinica);

// Nuevas rutas para el flujo de borrador
hcRoutes.post('/draft', hcController.obtenerBorradorHistoriaClinica);
hcRoutes.patch('/assign-patient', hcController.asignarPacienteAHistoriaClinica);
// Endpoint para registrar una historia clínica
hcRoutes.post('/register', hcController.registrarHistoriaClinica);
// Nuevo endpoint para asignar alumno a una historia clínica

// --- RUTAS DE EXAMEN FÍSICO GENERAL ---

// Endpoints examen general
hcRoutes.post(
  '/examen-general',
  examenGeneralController.registrarExamenFisicoGeneral
);
hcRoutes.get(
  '/examen-general/historia/:id_historia',
  examenGeneralController.consultarExamenFisicoGeneral
);
hcRoutes.put(
  '/examen-general/historia/:id_historia',
  examenGeneralController.actualizarExamenFisicoGeneral
);

// Endpoints examen regional
hcRoutes.post(
  '/examen-regional',
  examenRegionalController.registrarExamenFisicoRegional
);
hcRoutes.get(
  '/examen-regional/historia/:id_historia',
  examenRegionalController.consultarExamenFisicoRegional
);
hcRoutes.put(
  '/examen-regional/historia/:id_historia',
  examenRegionalController.actualizarExamenFisicoRegional
);

// --- RUTAS DE EXAMEN FÍSICO GENERAL ---
hcRoutes.get(
  '/:id/examen-general',
  hcController.consultarExamenFisicoGeneralPorHistoria
);
hcRoutes.put(
  '/:id/examen-general',
  hcController.actualizarExamenFisicoGeneralPorHistoria
);

// --- RUTAS DE EXAMEN REGIONAL (CABEZA, ATM, CUELLO) ---
hcRoutes.get(
  '/:id/examen-regional',
  hcController.consultarExamenFisicoRegionalPorHistoria
);
hcRoutes.put(
  '/:id/examen-regional',
  hcController.actualizarExamenFisicoRegionalPorHistoria
);

// --- RUTAS DE EXAMEN CLÍNICO DE LA BOCA ---
hcRoutes.get('/:id/examen-boca', hcController.consultarExamenBucalPorHistoria);
hcRoutes.put('/:id/examen-boca', hcController.actualizarExamenBucalPorHistoria);

// --- RUTAS DE HIGIENE BUCAL ---
hcRoutes.get('/:id/higiene', hcController.consultarHigieneBucalPorHistoria);
hcRoutes.put('/:id/higiene', hcController.actualizarHigieneBucal);

// SECCIÓN III
hcRoutes.get(
  '/:id/diagnostico-presuntivo',
  hcController.consultarDiagnosticoPresuntivoPorHistoria
);
hcRoutes.put(
  '/:id/diagnostico-presuntivo',
  hcController.actualizarDiagnosticoPresuntivoPorHistoria
);

// SECCIÓN IV
hcRoutes.get('/:id/derivacion', hcController.consultarDerivacionPorHistoria);
hcRoutes.put('/:id/derivacion', hcController.actualizarDerivacionPorHistoria);

// SECCIÓN V
hcRoutes.get(
  '/:id/diagnostico-clinicas',
  hcController.consultarDiagnosticoClinicoPorHistoria
);
hcRoutes.put(
  '/:id/diagnostico-clinicas',
  hcController.actualizarDiagnosticoClinicoPorHistoria
);

// --- RUTAS DE EVOLUCIÓN ---
hcRoutes.get('/:id/evolucion', hcController.consultarEvolucionesPorHistoria);
hcRoutes.post('/:id/evolucion', hcController.registrarEvolucionClinica);

// Endpoint para obtener todas las historias clínicas de un estudiante
hcRoutes.get('/student/:id', hcController.listarHistoriasClinicasPorEstudiante);
// Endpoint para obtener historias clínicas adultas de un estudiante específico
hcRoutes.get(
  '/student/:id/adult-historias',
  listarHistoriasClinicasAdultasDeEstudiante
);
