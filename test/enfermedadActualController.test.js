import { describe, it, expect, vi, beforeEach } from 'vitest';

vi.mock('../models/hc/anamnesis/enfermedadActualModel.js');

import * as controller from '../controllers/hc/anamnesis/enfermedadActualController.js';
import EnfermedadActual from '../models/hc/anamnesis/enfermedadActualModel.js';

describe('EnfermedadActual Controller', () => {
  let req, res;
  const historiaId = '550e8400-e29b-41d4-a716-446655440000';

  beforeEach(() => {
    req = {
      params: { id_historia: historiaId },
      body: { id_historia: historiaId },
    };
    res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn(),
    };
    vi.mocked(EnfermedadActual.create).mockReset();
    vi.mocked(EnfermedadActual.update).mockReset();
    vi.mocked(EnfermedadActual.getByHistoria).mockReset();
  });

  describe('createEnfermedadActual', () => {
    it('should return 201 on success', async () => {
      const mockData = { id: 1 };
      vi.mocked(EnfermedadActual.create).mockResolvedValue(mockData);

      await controller.createEnfermedadActual(req, res);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({
        message: expect.stringContaining('registrada'),
        data: mockData,
      });
    });

    it('should return 500 if not created', async () => {
      vi.mocked(EnfermedadActual.create).mockResolvedValue(null);
      await controller.createEnfermedadActual(req, res);
      expect(res.status).toHaveBeenCalledWith(500);
    });

    it('should handle errors', async () => {
      vi.mocked(EnfermedadActual.create).mockRejectedValue(new Error('fail'));
      await controller.createEnfermedadActual(req, res);
      expect(res.status).toHaveBeenCalledWith(500);
    });
  });

  describe('getEnfermedadActual', () => {
    it('should return 200 if found', async () => {
      const mockData = { id: 1 };
      vi.mocked(EnfermedadActual.getByHistoria).mockResolvedValue(mockData);

      await controller.getEnfermedadActual(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: expect.stringContaining('obtenida'),
        data: mockData,
      });
    });

    it('should return 404 if not found', async () => {
      vi.mocked(EnfermedadActual.getByHistoria).mockResolvedValue(null);
      await controller.getEnfermedadActual(req, res);
      expect(res.status).toHaveBeenCalledWith(404);
    });

    it('should handle errors', async () => {
      vi.mocked(EnfermedadActual.getByHistoria).mockRejectedValue(
        new Error('fail')
      );
      await controller.getEnfermedadActual(req, res);
      expect(res.status).toHaveBeenCalledWith(500);
    });
  });

  describe('updateEnfermedadActual', () => {
    it('should return 200 on success', async () => {
      const mockData = { id: 1 };
      vi.mocked(EnfermedadActual.getByHistoria).mockResolvedValue(mockData);
      vi.mocked(EnfermedadActual.update).mockResolvedValue(mockData);

      await controller.updateEnfermedadActual(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: expect.stringContaining('actualizada'),
        data: mockData,
      });
    });

    it('should return 404 if not found', async () => {
      vi.mocked(EnfermedadActual.getByHistoria).mockResolvedValue(null);
      await controller.updateEnfermedadActual(req, res);
      expect(res.status).toHaveBeenCalledWith(404);
    });

    it('should return 500 if not updated', async () => {
      vi.mocked(EnfermedadActual.getByHistoria).mockResolvedValue({ id: 1 });
      vi.mocked(EnfermedadActual.update).mockResolvedValue(null);
      await controller.updateEnfermedadActual(req, res);
      expect(res.status).toHaveBeenCalledWith(500);
    });

    it('should handle errors', async () => {
      vi.mocked(EnfermedadActual.getByHistoria).mockRejectedValue(
        new Error('fail')
      );
      await controller.updateEnfermedadActual(req, res);
      expect(res.status).toHaveBeenCalledWith(500);
    });
  });
});
