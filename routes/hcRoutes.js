import { Router } from 'express';

import { HcController } from '../controllers/hc/hcController.js';
import { HcModel } from '../models/hc/hcModel.js';
import authMiddleware from '../middlewares/authMiddleware.js';

export const hcRoutes = Router();

const hcController = new HcController(HcModel);

hcRoutes.use(authMiddleware);
hcRoutes.post('/review', hcController.createReview);
hcRoutes.get('/:id/filiacion', hcController.getFiliationByIdHistory);
hcRoutes.put('/:id/filiacion', hcController.updateFiliation);
hcRoutes.get('/:id/patient', hcController.getPatientByHistory);

// Nuevas rutas para el flujo de borrador
hcRoutes.post('/draft', hcController.createDraft);
hcRoutes.patch('/assign-patient', hcController.assignPatient);

// --- RUTAS DE EXAMEN FÍSICO GENERAL ---
hcRoutes.get('/:id/examen-general', hcController.getGeneralExam);
hcRoutes.put('/:id/examen-general', hcController.updateGeneralExam);

// --- RUTAS DE EXAMEN REGIONAL (CABEZA, ATM, CUELLO) ---
hcRoutes.get('/:id/examen-regional', hcController.getRegionalExam);
hcRoutes.put('/:id/examen-regional', hcController.updateRegionalExam);
