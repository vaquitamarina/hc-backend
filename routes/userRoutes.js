import { Router } from 'express';
import { UserController } from '../controllers/users/userController.js';
import { UserModel } from '../models/user/userModel.js';
import { AuthController } from '../controllers/users/authController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

export const userRoutes = Router();

const userController = new UserController(UserModel);
const authController = new AuthController(UserModel);

userRoutes.post('/register', userController.registrarUsuario);
userRoutes.post('/login', authController.iniciarSesion);
userRoutes.use(authMiddleware);
userRoutes.post('/logout', authController.cerrarSesion);

userRoutes.get('/me', authController.obtenerSesionActual);
userRoutes.get('/:id', userController.obtenerUsuarioPorId);

//midddlware de admins(a futuro)
userRoutes.get('/', userController.listarUsuarios);
