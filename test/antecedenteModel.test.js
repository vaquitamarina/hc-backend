import { describe, it, expect, vi, afterEach } from 'vitest';
import * as AntecedenteModel from '../models/hc/anamnesis/antecedenteModel.js';
import pool from '../db/db.js';

const originalQuery = pool.query;

afterEach(() => {
  pool.query = originalQuery;
});

describe('AntecedentePersonal', () => {
  const historiaId = '550e8400-e29b-41d4-a716-446655440000';

  it('create: éxito', async () => {
    pool.query = vi.fn().mockResolvedValue({});
    const result = await AntecedenteModel.AntecedentePersonal.create({
      id_historia: historiaId,
    });
    expect(result).toBe(true);
  });

  it('create: error', async () => {
    pool.query = vi
      .fn()
      .mockRejectedValue({ message: 'fail', detail: 'detalle' });
    await expect(
      AntecedenteModel.AntecedentePersonal.create({ id_historia: historiaId })
    ).rejects.toThrow('fail');
  });

  it('getById: sin resultados', async () => {
    pool.query = vi.fn().mockResolvedValue({ rows: [] });
    const result =
      await AntecedenteModel.AntecedentePersonal.getById(historiaId);
    expect(result).toBeNull();
  });

  it('getById: con resultado', async () => {
    pool.query = vi
      .fn()
      .mockResolvedValue({ rows: [{ id_antecedente: historiaId }] });
    const result =
      await AntecedenteModel.AntecedentePersonal.getById(historiaId);
    expect(result).toEqual({ id_antecedente: historiaId });
  });

  it('update: éxito', async () => {
    pool.query = vi.fn().mockResolvedValue({});
    const result = await AntecedenteModel.AntecedentePersonal.update(
      historiaId,
      { id_historia: historiaId }
    );
    expect(result).toBe(true);
  });

  it('update: error', async () => {
    pool.query = vi
      .fn()
      .mockRejectedValue({ message: 'fail', detail: 'detalle' });
    await expect(
      AntecedenteModel.AntecedentePersonal.update(historiaId, {
        id_historia: historiaId,
      })
    ).rejects.toThrow('fail');
  });

  it('update: error sin message', async () => {
    pool.query = vi.fn().mockRejectedValue({});
    await expect(
      AntecedenteModel.AntecedentePersonal.update(historiaId, {
        id_historia: historiaId,
      })
    ).rejects.toThrow('Error al actualizar antecedente personal');
  });

  // Puedes replicar la misma estructura para AntecedenteMedico, AntecedenteFamiliar y AntecedenteCumplimiento
});

describe('AntecedenteMedico', () => {
  const historiaId = '550e8400-e29b-41d4-a716-446655440000';

  it('create: éxito', async () => {
    pool.query = vi.fn().mockResolvedValue({});
    const result = await AntecedenteModel.AntecedenteMedico.create({
      id_historia: historiaId,
    });
    expect(result).toBe(true);
  });

  it('create: error', async () => {
    pool.query = vi.fn().mockRejectedValue({ message: 'fail' });
    await expect(
      AntecedenteModel.AntecedenteMedico.create({ id_historia: historiaId })
    ).rejects.toThrow();
  });

  it('getByHistoria: sin resultados', async () => {
    pool.query = vi.fn().mockResolvedValue({ rows: [] });
    const result =
      await AntecedenteModel.AntecedenteMedico.getByHistoria(historiaId);
    expect(result).toBeNull();
  });

  it('getByHistoria: con resultado', async () => {
    pool.query = vi
      .fn()
      .mockResolvedValue({ rows: [{ id_historia: historiaId }] });
    const result =
      await AntecedenteModel.AntecedenteMedico.getByHistoria(historiaId);
    expect(result).toEqual({ id_historia: historiaId });
  });

  it('getByHistoria: error', async () => {
    pool.query = vi.fn().mockRejectedValue({ message: 'fail' });
    await expect(
      AntecedenteModel.AntecedenteMedico.getByHistoria(historiaId)
    ).rejects.toThrow();
  });

  it('update: éxito', async () => {
    pool.query = vi.fn().mockResolvedValue({});
    const result = await AntecedenteModel.AntecedenteMedico.update(historiaId, {
      id_historia: historiaId,
    });
    expect(result).toBe(true);
  });

  it('update: error', async () => {
    pool.query = vi.fn().mockRejectedValue({ message: 'fail' });
    await expect(
      AntecedenteModel.AntecedenteMedico.update(historiaId, {
        id_historia: historiaId,
      })
    ).rejects.toThrow();
  });
  it('update: error con detail', async () => {
    pool.query = vi
      .fn()
      .mockRejectedValue({ message: 'fail', detail: 'detalle' });
    await expect(
      AntecedenteModel.AntecedenteMedico.update(historiaId, {
        id_historia: historiaId,
      })
    ).rejects.toThrow();
  });
});

describe('AntecedenteFamiliar', () => {
  const historiaId = '550e8400-e29b-41d4-a716-446655440000';

  it('create: éxito', async () => {
    pool.query = vi.fn().mockResolvedValue({});
    const result = await AntecedenteModel.AntecedenteFamiliar.create({
      id_historia: historiaId,
    });
    expect(result).toBe(true);
  });

  it('create: error', async () => {
    pool.query = vi.fn().mockRejectedValue({ message: 'fail' });
    await expect(
      AntecedenteModel.AntecedenteFamiliar.create({ id_historia: historiaId })
    ).rejects.toThrow();
  });

  it('getByHistoria: sin resultados', async () => {
    pool.query = vi.fn().mockResolvedValue({ rows: [] });
    const result =
      await AntecedenteModel.AntecedenteFamiliar.getByHistoria(historiaId);
    expect(result).toBeNull();
  });

  it('getByHistoria: con resultado', async () => {
    pool.query = vi
      .fn()
      .mockResolvedValue({ rows: [{ id_historia: historiaId }] });
    const result =
      await AntecedenteModel.AntecedenteFamiliar.getByHistoria(historiaId);
    expect(result).toEqual({ id_historia: historiaId });
  });
  it('getByHistoria: error', async () => {
    pool.query = vi.fn().mockRejectedValue({ message: 'fail' });
    await expect(
      AntecedenteModel.AntecedenteFamiliar.getByHistoria(historiaId)
    ).rejects.toThrow();
  });

  it('update: éxito', async () => {
    pool.query = vi.fn().mockResolvedValue({});
    const result = await AntecedenteModel.AntecedenteFamiliar.update(
      historiaId,
      { id_historia: historiaId }
    );
    expect(result).toBe(true);
  });

  it('update: error', async () => {
    pool.query = vi.fn().mockRejectedValue({ message: 'fail' });
    await expect(
      AntecedenteModel.AntecedenteFamiliar.update(historiaId, {
        id_historia: historiaId,
      })
    ).rejects.toThrow();
  });
  it('update: error con detail', async () => {
    pool.query = vi
      .fn()
      .mockRejectedValue({ message: 'fail', detail: 'detalle' });
    await expect(
      AntecedenteModel.AntecedenteFamiliar.update(historiaId, {
        id_historia: historiaId,
      })
    ).rejects.toThrow();
  });
});

describe('AntecedenteCumplimiento', () => {
  const historiaId = '550e8400-e29b-41d4-a716-446655440000';

  it('create: éxito', async () => {
    pool.query = vi.fn().mockResolvedValue({});
    const result = await AntecedenteModel.AntecedenteCumplimiento.create({
      id_historia: historiaId,
    });
    expect(result).toBe(true);
  });

  it('create: error', async () => {
    pool.query = vi.fn().mockRejectedValue({ message: 'fail' });
    await expect(
      AntecedenteModel.AntecedenteCumplimiento.create({
        id_historia: historiaId,
      })
    ).rejects.toThrow();
  });

  it('getByHistoria: sin resultados', async () => {
    pool.query = vi.fn().mockResolvedValue({ rows: [] });
    const result =
      await AntecedenteModel.AntecedenteCumplimiento.getByHistoria(historiaId);
    expect(result).toBeNull();
  });

  it('getByHistoria: con resultado', async () => {
    pool.query = vi
      .fn()
      .mockResolvedValue({ rows: [{ id_historia: historiaId }] });
    const result =
      await AntecedenteModel.AntecedenteCumplimiento.getByHistoria(historiaId);
    expect(result).toEqual({ id_historia: historiaId });
  });
  it('getByHistoria: error', async () => {
    pool.query = vi.fn().mockRejectedValue({ message: 'fail' });
    await expect(
      AntecedenteModel.AntecedenteCumplimiento.getByHistoria(historiaId)
    ).rejects.toThrow();
  });

  it('update: éxito', async () => {
    pool.query = vi.fn().mockResolvedValue({});
    const result = await AntecedenteModel.AntecedenteCumplimiento.update(
      historiaId,
      { id_historia: historiaId }
    );
    expect(result).toBe(true);
  });

  it('update: error', async () => {
    pool.query = vi.fn().mockRejectedValue({ message: 'fail' });
    await expect(
      AntecedenteModel.AntecedenteCumplimiento.update(historiaId, {
        id_historia: historiaId,
      })
    ).rejects.toThrow();
  });
  it('update: error con detail', async () => {
    pool.query = vi
      .fn()
      .mockRejectedValue({ message: 'fail', detail: 'detalle' });
    await expect(
      AntecedenteModel.AntecedenteCumplimiento.update(historiaId, {
        id_historia: historiaId,
      })
    ).rejects.toThrow();
  });
});
