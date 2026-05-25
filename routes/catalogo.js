import express from 'express';
import {
  listarOpcionesCatalogoClinicoController,
  obtenerNombreOpcionCatalogoClinicoController,
} from '../controllers/catologo/catalogoControllers.js';

const router = express.Router();

// GET /api/catalogo/:nombre
router.get('/:nombre', listarOpcionesCatalogoClinicoController);

// GET /api/catalogo/:nombre/:id
router.get('/:nombre/:id', obtenerNombreOpcionCatalogoClinicoController);

export default router;
