import { describe, it, expect, vi, beforeEach } from 'vitest';

vi.mock('../models/hc/anamnesis/filiacionModel.js');

import * as controller from '../controllers/hc/anamnesis/filiacionController.js';
import Filiacion from '../models/hc/anamnesis/filiacionModel.js';

describe('Filiacion Controller', () => {
  let req, res;
  const historiaId = '550e8400-e29b-41d4-a716-446655440000';

  beforeEach(() => {
    req = { params: {}, body: {} };
    res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn(),
    };
    vi.mocked(Filiacion.create).mockReset();
    vi.mocked(Filiacion.update).mockReset();
    vi.mocked(Filiacion.getByHistoria).mockReset();
  });

  describe('createFiliacion', () => {
    it('should return 201 on success', async () => {
      req.body = { id_historia: historiaId };
      vi.mocked(Filiacion.create).mockResolvedValue(true);
      await controller.createFiliacion(req, res);
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Filiación registrada con éxito',
      });
    });

    it('should return 400 if not created', async () => {
      req.body = { id_historia: historiaId };
      vi.mocked(Filiacion.create).mockResolvedValue(false);
      await controller.createFiliacion(req, res);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        error: 'No se pudo registrar la filiación',
      });
    });

    it('should handle errors', async () => {
      req.body = { id_historia: historiaId };
      vi.mocked(Filiacion.create).mockRejectedValue(new Error('DB error'));
      await controller.createFiliacion(req, res);
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        error: 'DB error',
      });
    });
  });

  describe('getFiliacion', () => {
    it('should return 200 and data if found', async () => {
      req.params.id_historia = historiaId;
      const mockData = { id: 1, nombre: 'Test' };
      vi.mocked(Filiacion.getByHistoria).mockResolvedValue(mockData);
      await controller.getFiliacion(req, res);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Filiación obtenida correctamente',
        data: mockData,
      });
    });

    it('should return 404 if not found', async () => {
      req.params.id_historia = historiaId;
      vi.mocked(Filiacion.getByHistoria).mockResolvedValue(null);
      await controller.getFiliacion(req, res);
      expect(res.status).toHaveBeenCalledWith(404);
    });

    it('should handle errors', async () => {
      req.params.id_historia = historiaId;
      vi.mocked(Filiacion.getByHistoria).mockRejectedValue(
        new Error('DB error')
      );
      await controller.getFiliacion(req, res);
      expect(res.status).toHaveBeenCalledWith(500);
    });
  });

  describe('updateFiliacion', () => {
    it('should return 200 on success', async () => {
      req.params.id_historia = historiaId;
      req.body = { id_historia: historiaId };
      vi.mocked(Filiacion.getByHistoria).mockResolvedValue({ id: 1 });
      vi.mocked(Filiacion.update).mockResolvedValue(true);
      await controller.updateFiliacion(req, res);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Filiación actualizada correctamente',
      });
    });

    it('should return 404 if filiacion not found', async () => {
      req.params.id_historia = historiaId;
      vi.mocked(Filiacion.getByHistoria).mockResolvedValue(null);
      await controller.updateFiliacion(req, res);
      expect(res.status).toHaveBeenCalledWith(404);
    });

    it('should return 500 if not updated', async () => {
      req.params.id_historia = historiaId;
      req.body = { id_historia: historiaId };
      vi.mocked(Filiacion.getByHistoria).mockResolvedValue({ id: 1 });
      vi.mocked(Filiacion.update).mockResolvedValue(false);
      await controller.updateFiliacion(req, res);
      expect(res.status).toHaveBeenCalledWith(500);
    });

    it('should handle errors', async () => {
      req.params.id_historia = historiaId;
      req.body = { id_historia: historiaId };
      vi.mocked(Filiacion.getByHistoria).mockRejectedValue(
        new Error('DB error')
      );
      await controller.updateFiliacion(req, res);
      expect(res.status).toHaveBeenCalledWith(500);
    });
  });
});
