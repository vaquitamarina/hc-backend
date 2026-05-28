import { Router } from 'express';
import { UserController } from '../user/application/userController.js';
import AuthController from '../auth/application/authController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

export const userRoutes = Router();

userRoutes.post('/register', UserController.registrarUsuario);
userRoutes.post('/login', AuthController.iniciarSesion);
userRoutes.use(authMiddleware);
userRoutes.post('/logout', AuthController.cerrarSesion);

userRoutes.get('/me', AuthController.obtenerSesionActual);
userRoutes.get('/:id', UserController.obtenerUsuarioPorId);

//midddlware de admins(a futuro)
userRoutes.get('/', UserController.listarUsuarios);
