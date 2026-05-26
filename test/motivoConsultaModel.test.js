import { describe, it, expect, vi, afterEach } from 'vitest';
import MotivoConsulta from '../models/hc/anamnesis/motivoConsultaModel.js';
import pool from '../db/db.js';

const originalQuery = pool.query;

afterEach(() => {
  pool.query = originalQuery;
});

describe('MotivoConsulta', () => {
  it('create: éxito', async () => {
    pool.query = vi.fn().mockResolvedValue({});
    const result = await MotivoConsulta.create({
      id_historia: '550e8400-e29b-41d4-a716-446655440000',
      motivo: 'dolor',
    });
    expect(result).toBe(true);
  });

  it('create: error', async () => {
    pool.query = vi.fn().mockRejectedValue({ message: 'fail' });
    await expect(
      MotivoConsulta.create({
        id_historia: '550e8400-e29b-41d4-a716-446655440000',
        motivo: 'dolor',
      })
    ).rejects.toThrow('fail');
  });

  it('getById: con resultado', async () => {
    pool.query = vi.fn().mockResolvedValue({ rows: [{ id_motivo: 1 }] });
    const result = await MotivoConsulta.getById(1);
    expect(result).toEqual({ id_motivo: 1 });
  });

  it('getById: sin resultado', async () => {
    pool.query = vi.fn().mockResolvedValue({ rows: [] });
    const result = await MotivoConsulta.getById(1);
    expect(result).toBeNull();
  });

  it('getById: error', async () => {
    pool.query = vi.fn().mockRejectedValue({ message: 'fail' });
    const result = await MotivoConsulta.getById(1);
    expect(result).toBeNull();
  });

  it('getByHistoria: con resultado', async () => {
    pool.query = vi.fn().mockResolvedValue({ rows: [{ id_historia: 1 }] });
    const result = await MotivoConsulta.getByHistoria(
      '550e8400-e29b-41d4-a716-446655440000'
    );
    expect(result).toEqual({ id_historia: 1 });
  });

  it('getByHistoria: sin resultado', async () => {
    pool.query = vi.fn().mockResolvedValue({ rows: [] });
    const result = await MotivoConsulta.getByHistoria(
      '550e8400-e29b-41d4-a716-446655440000'
    );
    expect(result).toBeNull();
  });

  it('getByHistoria: error', async () => {
    pool.query = vi.fn().mockRejectedValue({ message: 'fail' });
    const result = await MotivoConsulta.getByHistoria(
      '550e8400-e29b-41d4-a716-446655440000'
    );
    expect(result).toBeNull();
  });

  it('update: éxito', async () => {
    pool.query = vi.fn().mockResolvedValue({});
    const result = await MotivoConsulta.update(
      '550e8400-e29b-41d4-a716-446655440000',
      { motivo: 'dolor' }
    );
    expect(result).toBe(true);
  });

  it('update: error', async () => {
    pool.query = vi.fn().mockRejectedValue({ message: 'fail' });
    await expect(
      MotivoConsulta.update('550e8400-e29b-41d4-a716-446655440000', {
        motivo: 'dolor',
      })
    ).rejects.toThrow('fail');
  });
});
