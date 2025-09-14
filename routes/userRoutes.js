import { Router } from 'express';

import { UserController } from '../controllers/userController.js';
import { UserModel } from '../models/userModel.js';

export const userRoutes = Router();

const userController = new UserController(UserModel);

userRoutes.get('/', userController.getAll);
