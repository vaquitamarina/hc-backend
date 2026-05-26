import { describe, it, expect, vi, afterEach } from 'vitest';
import Filiacion from '../models/hc/anamnesis/filiacionModel.js';
import pool from '../db/db.js';

const originalQuery = pool.query;

afterEach(() => {
  pool.query = originalQuery;
});

describe('Filiacion', () => {
  const historiaId = '550e8400-e29b-41d4-a716-446655440000';

  it('create: éxito', async () => {
    pool.query = vi.fn().mockResolvedValue({});
    const result = await Filiacion.create({ id_historia: historiaId });
    expect(result).toEqual({ success: true, id_historia: historiaId });
  });

  it('getById: con resultado', async () => {
    pool.query = vi.fn().mockResolvedValue({ rows: [{ id_filiacion: 1 }] });
    const result = await Filiacion.getById(1);
    expect(result).toEqual({ id_filiacion: 1 });
  });

  it('getById: sin resultado', async () => {
    pool.query = vi.fn().mockResolvedValue({ rows: [] });
    const result = await Filiacion.getById(1);
    expect(result).toBeUndefined();
  });

  it('getByHistoria: con resultado', async () => {
    pool.query = vi.fn().mockResolvedValue({ rows: [{ id_historia: 1 }] });
    const result = await Filiacion.getByHistoria(historiaId);
    expect(result).toEqual({ id_historia: 1 });
  });

  it('getByHistoria: sin resultado', async () => {
    pool.query = vi.fn().mockResolvedValue({ rows: [] });
    const result = await Filiacion.getByHistoria(1);
    expect(result).toBeUndefined();
  });

  it('update: éxito', async () => {
    pool.query = vi.fn().mockResolvedValue({});
    const result = await Filiacion.update({ id_historia: historiaId });
    expect(result).toEqual({ success: true, id_historia: historiaId });
  });
});
