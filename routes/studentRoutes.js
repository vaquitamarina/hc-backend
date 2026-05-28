import { Router } from 'express';
import { ListaHcAdultosController } from '../listaHcAdultos/application/listaHcAdultosController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

export const studentRoutes = Router();

// GET /api/students/:id/patients/adult
studentRoutes.use(authMiddleware);
studentRoutes.get(
  '/:id/patients/adult',
  ListaHcAdultosController.listarHistoriasClinicasAdultasDeEstudiante
);
