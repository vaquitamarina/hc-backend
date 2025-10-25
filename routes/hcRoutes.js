import { Router } from 'express';

import { HcController } from '../controllers/hc/hcController.js';
import { HcModel } from '../models/hc/hcModel.js';

export const hcRoutes = Router();

const hcController = new HcController(HcModel);

hcRoutes.post('/review', hcController.createReview);
hcRoutes.get('/:id/filiacion', hcController.getFiliationByIdHistory);

// Nuevas rutas para el flujo de borrador
hcRoutes.post('/draft', hcController.createDraft);
hcRoutes.patch('/assign-patient', hcController.assignPatient);
