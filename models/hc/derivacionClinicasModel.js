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

class DestinosValueObject {
  constructor(value) {
    if (value === null || value === undefined || value === '') {
      this.value = {};
      return;
    }
    if (typeof value === 'string') {
      try {
        this.value = JSON.parse(value);
        return;
      } catch (e) {
        throw new DomainError('destinos inválidos');
      }
    }
    if (typeof value === 'object') {
      this.value = value;
      return;
    }
    throw new DomainError('destinos inválidos');
  }

  toJSON() {
    return this.value;
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

  toString() {
    return this.value;
  }
}

class DerivacionClinicasAggregate {
  constructor({
    idHistory,
    destinos,
    observaciones,
    alumno,
    docente,
    idUsuario,
  } = {}) {
    this._idHistory =
      idHistory instanceof IdHistoriaValueObject
        ? idHistory
        : new IdHistoriaValueObject(idHistory);
    this._destinos =
      destinos instanceof DestinosValueObject
        ? destinos
        : new DestinosValueObject(destinos);
    this._observaciones =
      observaciones instanceof TextoValueObject
        ? observaciones
        : new TextoValueObject(observaciones);
    this._alumno =
      alumno instanceof TextoValueObject
        ? alumno
        : new TextoValueObject(alumno);
    this._docente =
      docente instanceof TextoValueObject
        ? docente
        : new TextoValueObject(docente);
    this._idUsuario =
      idUsuario instanceof IdUsuarioValueObject
        ? idUsuario
        : new IdUsuarioValueObject(idUsuario);
  }

  _normalizePrimitive(value) {
    if (value === null || value === undefined) {
      return null;
    }
    if (typeof value === 'object') {
      return value;
    }
    const s = String(value).trim();
    return s === '' ? null : s;
  }

  obtenerParametros() {
    return [
      this._idHistory.toString(),
      JSON.stringify(this._destinos.toJSON()),
      this._normalizePrimitive(this._observaciones.value),
      this._normalizePrimitive(this._alumno.value),
      this._normalizePrimitive(this._docente.value),
      this._idUsuario.toString(),
    ];
  }
}

export { DomainError, DerivacionClinicasAggregate };

export async function consultarDerivacionClinicas(idHistory) {
  try {
    const id = stripHCPrefix(String(idHistory || ''));
    if (!id) {
      return null;
    }
    const result = await pool.query(
      'SELECT * FROM derivacion_clinicas WHERE id_historia = $1',
      [id]
    );
    const data = result.rows[0];
    if (!data) {
      return null;
    }

    let destinos = {};
    try {
      destinos = data.destinos ? JSON.parse(data.destinos) : {};
    } catch {
      destinos = data.destinos || {};
    }

    return {
      destinos,
      observaciones: data.observaciones,
      fechaDerivacion: data.fecha_derivacion,
      alumno: data.alumno_diagnostico,
      docente: data.docente,
    };
  } catch (error) {
    throw error;
  }
}

export async function actualizarDerivacionClinicas(aggregateOrObj) {
  try {
    let agg = null;
    if (aggregateOrObj instanceof DerivacionClinicasAggregate) {
      agg = aggregateOrObj;
    } else {
      agg = new DerivacionClinicasAggregate(aggregateOrObj);
    }

    await pool.query(
      'CALL i_derivacion_clinicas($1, $2, $3, $4, $5, $6)',
      agg.obtenerParametros()
    );
    return true;
  } catch (error) {
    throw error;
  }
}
