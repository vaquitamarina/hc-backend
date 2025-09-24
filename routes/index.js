import { Router } from 'express';

import { userRoutes } from './userRoutes.js';
import { pacientRoutes } from './pacientRoutes.js';
import { hcRoutes } from './hcRoutes.js';

export const router = Router();

router.use('/users', userRoutes);
router.use('/pacient', pacientRoutes);
router.use('/hc', hcRoutes);
