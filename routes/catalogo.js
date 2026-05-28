import express from 'express';
import { CatalogoController } from '../catalogo/application/catalogoController.js';

const router = express.Router();

// GET /api/catalogo/:nombre
router.get('/:nombre', CatalogoController.listarOpcionesCatalogoClinico);

// GET /api/catalogo/:nombre/:id
router.get(
  '/:nombre/:id',
  CatalogoController.obtenerNombreOpcionCatalogoClinico
);

export default router;
