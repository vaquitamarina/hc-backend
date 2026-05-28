import { Router } from 'express';
import { listarUsuariosEstudiantes } from '../controllers/users/studentUsersController.js';

export const studentUsersRoutes = Router();

studentUsersRoutes.get('/', listarUsuariosEstudiantes);
