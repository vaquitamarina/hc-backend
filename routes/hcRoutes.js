import { Router } from 'express';

import { HcController } from '../controllers/hc/hcController.js';
import { HcModel } from '../models/hc/hcModel.js';
import authMiddleware from '../middlewares/authMiddleware.js';

export const hcRoutes = Router();

const hcController = new HcController(HcModel);

hcRoutes.use(authMiddleware);
hcRoutes.post('/review', hcController.createReview);
hcRoutes.get('/:id/filiacion', hcController.getFiliationByIdHistory);
hcRoutes.get('/:id/patient', hcController.getPatientByHistory);

// Nuevas rutas para el flujo de borrador
hcRoutes.post('/draft', hcController.createDraft);
hcRoutes.patch('/assign-patient', hcController.assignPatient);
