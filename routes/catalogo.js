import express from 'express';

import { getCatalogoController } from '../controllers/catologo/catalogoControllers.js';

const router = express.Router();

// GET /api/catalogo/:nombre
router.get('/:nombre', getCatalogoController);

export default router;
