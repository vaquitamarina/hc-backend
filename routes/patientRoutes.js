import { Router } from 'express';
import { PatientController } from '../patient/application/patientController.js';

export const patientRoutes = Router();

// POST /api/pacientes - Crear nuevo paciente
patientRoutes.post('/', PatientController.registrarPaciente);
patientRoutes.put('/:id', PatientController.actualizarPaciente);
