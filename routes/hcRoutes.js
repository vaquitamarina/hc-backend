import { Router } from 'express';

import { HcController } from '../controllers/hc/hcController.js';
import { HcModel } from '../models/hc/hcModel.js';
import * as examenGeneralController from '../controllers/hc/examenFisico/examenGeneralController.js';
import * as examenRegionalController from '../controllers/hc/examenFisico/examenRegionalController.js';
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

// Endpoints examen general
hcRoutes.post('/examen-general', examenGeneralController.createExamenGeneral);
hcRoutes.get(
  '/examen-general/historia/:id_historia',
  examenGeneralController.getExamenGeneral
);
hcRoutes.put(
  '/examen-general/historia/:id_historia',
  examenGeneralController.updateExamenGeneral
);

// Endpoints examen regional
hcRoutes.post(
  '/examen-regional',
  examenRegionalController.createExamenRegional
);
hcRoutes.get(
  '/examen-regional/historia/:id_historia',
  examenRegionalController.getExamenRegional
);
hcRoutes.put(
  '/examen-regional/historia/:id_historia',
  examenRegionalController.updateExamenRegional
);
