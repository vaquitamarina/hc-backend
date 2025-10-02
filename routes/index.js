import { Router } from 'express';

import { userRoutes } from './userRoutes.js';
import { pacientRoutes } from './pacientRoutes.js';
import { hcRoutes } from './hcRoutes.js';
import { studentRoutes } from './studentRoutes.js';

export const router = Router();

router.use('/users', userRoutes);
router.use('/pacients', pacientRoutes);
router.use('/hc', hcRoutes);
router.use('/students', studentRoutes);
