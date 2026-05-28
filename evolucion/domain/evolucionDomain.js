import pool from '../../db/db.js';

class DomainError extends Error {
  constructor(message) {
    super(message);
    this.name = 'DomainError';
  }
}

const UUID_V4_REGEX =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
function stripHCPrefix(id) {
  if (!id) {
    return id;
  }
  return id.startsWith('HC-') ? id.slice(3) : id;
}

class IdHistoriaValueObject {
  constructor(value) {
    const normalized = stripHCPrefix(String(value || '')).trim();
    if (!normalized) {
      throw new DomainError('id_historia es requerido');
    }
    if (!UUID_V4_REGEX.test(normalized)) {
      throw new DomainError('id_historia inválido');
    }
    this.value = normalized;
  }
  toString() {
    return this.value;
  }
}

class IdUsuarioValueObject {
  constructor(value) {
    if (!value) {
      throw new DomainError('idUsuario es requerido');
    }
    const normalized = String(value).trim();
    if (!UUID_V4_REGEX.test(normalized)) {
      throw new DomainError('idUsuario inválido');
    }
    this.value = normalized;
  }
  toString() {
    return this.value;
  }
}

class FechaValueObject {
  constructor(value) {
    if (value === null || value === undefined || value === '') {
      this.value = null;
      return;
    }
    const fecha = new Date(value);
    if (Number.isNaN(fecha.getTime())) {
      throw new DomainError('fecha inválida');
    }
    this.value = fecha.toISOString().slice(0, 10);
  }
}

class TextoValueObject {
  constructor(value) {
    if (value === null || value === undefined) {
      this.value = null;
      return;
    }
    const normalized = String(value).trim();
    this.value = normalized === '' ? null : normalized;
  }
}

class EvolucionAggregate {
  constructor({ idHistory, fecha, actividad, alumno, idUsuario } = {}) {
    this._idHistory =
      idHistory instanceof IdHistoriaValueObject
        ? idHistory
        : new IdHistoriaValueObject(idHistory);
    this._fecha =
      fecha instanceof FechaValueObject ? fecha : new FechaValueObject(fecha);
    this._actividad =
      actividad instanceof TextoValueObject
        ? actividad
        : new TextoValueObject(actividad);
    this._alumno =
      alumno instanceof TextoValueObject
        ? alumno
        : new TextoValueObject(alumno);
    this._idUsuario =
      idUsuario instanceof IdUsuarioValueObject
        ? idUsuario
        : new IdUsuarioValueObject(idUsuario);
  }
  obtenerParametros() {
    return [
      this._idHistory.toString(),
      this._fecha.value,
      this._actividad.value,
      this._alumno.value,
      this._idUsuario.toString(),
    ];
  }
}

export { DomainError, EvolucionAggregate };

export async function consultarEvoluciones(idHistory) {
  const id = stripHCPrefix(String(idHistory || ''));
  if (!id) {
    return [];
  }
  const result = await pool.query(
    'SELECT * FROM evolucion WHERE id_historia = $1 ORDER BY fecha DESC, id_evolucion DESC',
    [id]
  );
  return result.rows;
}

export async function registrarEvolucion(aggregateOrObj) {
  try {
    const agregado =
      aggregateOrObj instanceof EvolucionAggregate
        ? aggregateOrObj
        : new EvolucionAggregate(aggregateOrObj);
    await pool.query('CALL i_evolucion($1, $2, $3, $4, $5)', [
      ...agregado.obtenerParametros(),
    ]);
    return true;
  } catch (error) {
    throw error;
  }
}
