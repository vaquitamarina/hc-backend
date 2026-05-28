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

class DiagnosticoPresuntivoAggregate {
  constructor({ idHistory, descripcion, idUsuario } = {}) {
    this._idHistory =
      idHistory instanceof IdHistoriaValueObject
        ? idHistory
        : new IdHistoriaValueObject(idHistory);
    this._descripcion =
      descripcion instanceof TextoValueObject
        ? descripcion
        : new TextoValueObject(descripcion);
    this._idUsuario =
      idUsuario instanceof IdUsuarioValueObject
        ? idUsuario
        : new IdUsuarioValueObject(idUsuario);
  }

  obtenerParametros() {
    return [
      this._idHistory.toString(),
      this._descripcion.value,
      this._idUsuario.toString(),
    ];
  }
}

export { DomainError, DiagnosticoPresuntivoAggregate };

export async function consultarDiagnosticoPresuntivo(idHistory) {
  const id = stripHCPrefix(String(idHistory || ''));
  if (!id) {
    return { descripcion: '' };
  }

  const result = await pool.query(
    `SELECT descripcion
       FROM diagnostico
      WHERE id_historia = $1
        AND tipo = 'presuntivo'
      ORDER BY fecha DESC NULLS LAST
      LIMIT 1`,
    [id]
  );

  if (!result.rows[0]) {
    return { descripcion: '' };
  }

  return {
    descripcion: result.rows[0].descripcion || '',
  };
}

export async function actualizarDiagnosticoPresuntivo(aggregateOrObj) {
  try {
    let agg = null;
    if (aggregateOrObj instanceof DiagnosticoPresuntivoAggregate) {
      agg = aggregateOrObj;
    } else {
      agg = new DiagnosticoPresuntivoAggregate(aggregateOrObj);
    }

    await pool.query('CALL i_diagnostico_presuntivo($1, $2, $3)', [
      agg._idHistory.toString(),
      agg._descripcion.value,
      agg._idUsuario.toString(),
    ]);

    return true;
  } catch (error) {
    throw error;
  }
}
