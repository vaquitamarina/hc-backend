import { Router } from 'express';
import StudentUsersController from '../studentUsers/application/studentUsersController.js';

export const studentUsersRoutes = Router();

studentUsersRoutes.get('/', StudentUsersController.listarUsuariosEstudiantes);
