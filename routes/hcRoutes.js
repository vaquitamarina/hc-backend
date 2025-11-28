import { Router } from 'express';

import { HcController } from '../controllers/hc/hcController.js';
import { HcModel } from '../models/hc/hcModel.js';
import authMiddleware from '../middlewares/authMiddleware.js';
import * as motivoConsultaController from '../controllers/hc/anamnesis/motivoConsultaController.js';
import * as antecedentePersonalController from '../controllers/hc/anamnesis/antecedentePersonalController.js';
import * as enfermedadActualController from '../controllers/hc/anamnesis/enfermedadActualController.js';
import * as filiacionController from '../controllers/hc/anamnesis/filiacionController.js';

export const hcRoutes = Router();

const hcController = new HcController(HcModel);

hcRoutes.use(authMiddleware);

// Endpoints motivo_consulta
hcRoutes.post(
  '/motivo-consulta',
  motivoConsultaController.createMotivoConsulta
);
hcRoutes.get(
  '/motivo-consulta/historia/:id_historia',
  motivoConsultaController.getMotivoConsulta
);
hcRoutes.put(
  '/motivo-consulta/historia/:id_historia',
  motivoConsultaController.updateMotivoConsulta
);

// Endpoints antecedente_personal
hcRoutes.post(
  '/antecedente-personal',
  antecedentePersonalController.createAntecedentePersonal
);
hcRoutes.get(
  '/antecedente-personal/historia/:id_historia',
  antecedentePersonalController.getAntecedentePersonal
);
hcRoutes.put(
  '/antecedente-personal/historia/:id_historia',
  antecedentePersonalController.updateAntecedentePersonal
);

// Endpoints enfermedad_actual
hcRoutes.post(
  '/enfermedad-actual',
  enfermedadActualController.createEnfermedadActual
);
hcRoutes.get(
  '/enfermedad-actual/historia/:id_historia',
  enfermedadActualController.getEnfermedadActual
);
hcRoutes.put(
  '/enfermedad-actual/historia/:id_historia',
  enfermedadActualController.updateEnfermedadActual
);

// Endpoints filiacion
hcRoutes.post('/filiacion', filiacionController.createFiliacion);
hcRoutes.get(
  '/filiacion/historia/:id_historia',
  filiacionController.getFiliacion
);
hcRoutes.put(
  '/filiacion/historia/:id_historia',
  filiacionController.updateFiliacion
);

hcRoutes.get('/:id/patient', hcController.getPatientByHistory);

hcRoutes.post('/review', hcController.createReview);

// Nuevas rutas para el flujo de borrador
hcRoutes.post('/draft', hcController.createDraft);
hcRoutes.patch('/assign-patient', hcController.assignPatient);

// --- RUTAS DE EXAMEN FÍSICO GENERAL ---
hcRoutes.get('/:id/examen-general', hcController.getGeneralExam);
hcRoutes.put('/:id/examen-general', hcController.updateGeneralExam);

// --- RUTAS DE EXAMEN REGIONAL (CABEZA, ATM, CUELLO) ---
hcRoutes.get('/:id/examen-regional', hcController.getRegionalExam);
hcRoutes.put('/:id/examen-regional', hcController.updateRegionalExam);
