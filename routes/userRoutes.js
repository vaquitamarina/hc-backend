import { Router } from 'express';

import { UserController } from '../controllers/users/userController.js';
import { UserModel } from '../models/users/userModel.js';

export const userRoutes = Router();

const userController = new UserController(UserModel);

userRoutes.get('/', userController.getAll);
