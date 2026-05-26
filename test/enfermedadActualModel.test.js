import { describe, it, expect, vi, afterEach } from 'vitest';
import EnfermedadActual from '../models/hc/anamnesis/enfermedadActualModel.js';
import pool from '../db/db.js';

const originalQuery = pool.query;
const historiaId = '550e8400-e29b-41d4-a716-446655440000';

afterEach(() => {
  pool.query = originalQuery;
});

describe('EnfermedadActual', () => {
  it('create: éxito', async () => {
    pool.query = vi.fn().mockResolvedValue({});
    const result = await EnfermedadActual.create({
      id_historia: historiaId,
      sintoma_principal: 'dolor',
    });
    expect(result).toEqual({ success: true, id_historia: historiaId });
  });

  it('create: error', async () => {
    pool.query = vi.fn().mockRejectedValue(new Error('fail'));
    const result = await EnfermedadActual.create({
      id_historia: historiaId,
      sintoma_principal: 'dolor',
    });
    expect(result).toBeNull();
  });

  it('getByHistoria: sin resultados', async () => {
    pool.query = vi.fn().mockResolvedValue({ rows: [] });
    const result = await EnfermedadActual.getByHistoria(historiaId);
    expect(result).toBeNull();
  });

  it('getByHistoria: con resultado', async () => {
    pool.query = vi
      .fn()
      .mockResolvedValue({ rows: [{ id_historia: historiaId }] });
    const result = await EnfermedadActual.getByHistoria(historiaId);
    expect(result).toEqual({ id_historia: historiaId });
  });

  it('getByHistoria: error', async () => {
    pool.query = vi.fn().mockRejectedValue(new Error('fail'));
    const result = await EnfermedadActual.getByHistoria(historiaId);
    expect(result).toBeNull();
  });

  it('update: éxito', async () => {
    pool.query = vi.fn().mockResolvedValue({});
    const result = await EnfermedadActual.update(historiaId, {
      id_historia: historiaId,
      sintoma_principal: 'dolor',
    });
    expect(result).toEqual({ success: true, id_historia: historiaId });
  });

  it('update: error', async () => {
    pool.query = vi.fn().mockRejectedValue(new Error('fail'));
    const result = await EnfermedadActual.update(historiaId, {
      id_historia: historiaId,
      sintoma_principal: 'dolor',
    });
    expect(result).toBeNull();
  });
});
