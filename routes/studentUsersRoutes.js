import { Router } from 'express';
import { StudentUsersController } from '../studentUsers/application/studentUsersController.js';

export const studentUsersRoutes = Router();

const studentUsersController = new StudentUsersController();

studentUsersRoutes.get('/', studentUsersController.listarUsuariosEstudiantes);
