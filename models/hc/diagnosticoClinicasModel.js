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
    const d = new Date(value);
    if (Number.isNaN(d.getTime())) {
      throw new DomainError('fecha inválida');
    }
    // Format as YYYY-MM-DD for Postgres date
    this.value = d.toISOString().slice(0, 10);
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

class JSONValueObject {
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
        throw new DomainError('JSON inválido');
      }
    }
    if (typeof value === 'object') {
      this.value = value;
      return;
    }
    throw new DomainError('JSON inválido');
  }

  toJSON() {
    return this.value;
  }
}

class DiagnosticoClinicasAggregate {
  constructor({ idHistory, data = {}, idUsuario } = {}) {
    this._idHistory =
      idHistory instanceof IdHistoriaValueObject
        ? idHistory
        : new IdHistoriaValueObject(idHistory);
    this._fechaRespuesta =
      data.fechaRespuesta instanceof FechaValueObject
        ? data.fechaRespuesta
        : new FechaValueObject(data.fechaRespuesta);
    this._clinicaRespuesta =
      data.clinicaRespuesta instanceof TextoValueObject
        ? data.clinicaRespuesta
        : new TextoValueObject(data.clinicaRespuesta);
    this._descripcionRespuesta =
      data.descripcionRespuesta instanceof TextoValueObject
        ? data.descripcionRespuesta
        : new TextoValueObject(data.descripcionRespuesta);
    this._examenes =
      data.examenes instanceof JSONValueObject
        ? data.examenes
        : new JSONValueObject(data.examenes);
    this._interconsultaTipo =
      data.interconsultaTipo instanceof TextoValueObject
        ? data.interconsultaTipo
        : new TextoValueObject(data.interconsultaTipo);
    this._interconsultaFecha =
      data.interconsultaFecha instanceof FechaValueObject
        ? data.interconsultaFecha
        : new FechaValueObject(data.interconsultaFecha);
    this._interconsultaClinica =
      data.interconsultaClinica instanceof TextoValueObject
        ? data.interconsultaClinica
        : new TextoValueObject(data.interconsultaClinica);
    this._diagnosticoDefinitivo =
      data.diagnosticoDefinitivo instanceof TextoValueObject
        ? data.diagnosticoDefinitivo
        : new TextoValueObject(data.diagnosticoDefinitivo);
    this._tratamiento =
      data.tratamiento instanceof TextoValueObject
        ? data.tratamiento
        : new TextoValueObject(data.tratamiento);
    this._pronostico =
      data.pronostico instanceof TextoValueObject
        ? data.pronostico
        : new TextoValueObject(data.pronostico);
    this._alumnoTratante =
      data.alumnoTratante instanceof TextoValueObject
        ? data.alumnoTratante
        : new TextoValueObject(data.alumnoTratante);
    this._idUsuario =
      idUsuario instanceof IdUsuarioValueObject
        ? idUsuario
        : new IdUsuarioValueObject(idUsuario);
  }

  obtenerParametros() {
    return [
      this._idHistory.toString(),
      this._fechaRespuesta.value,
      this._clinicaRespuesta.value,
      this._descripcionRespuesta.value,
      JSON.stringify(this._examenes.toJSON()),
      this._interconsultaTipo.value,
      this._interconsultaFecha.value,
      this._interconsultaClinica.value,
      this._diagnosticoDefinitivo.value,
      this._tratamiento.value,
      this._pronostico.value,
      this._alumnoTratante.value,
      this._idUsuario.toString(),
    ];
  }
}

export { DomainError, DiagnosticoClinicasAggregate };

export async function consultarDiagnosticoClinicas(idHistory) {
  try {
    const id = stripHCPrefix(String(idHistory || ''));
    if (!id) {
      return {};
    }
    const mapRow = (row) => {
      if (!row) {
        return {};
      }

      let examAux = {};
      try {
        examAux = row.examenes_auxiliares
          ? JSON.parse(row.examenes_auxiliares)
          : {};
      } catch {
        examAux = row.examenes_auxiliares || {};
      }

      return {
        ...row,
        fecha: row.fecha,
        fechaRespuesta: row.fecha,
        clinica_respuesta: row.clinica_respuesta,
        clinicaRespuesta: row.clinica_respuesta,
        descripcionRespuesta: row.descripcion,
        descripcion: row.descripcion,
        examenes_auxiliares: row.examenes_auxiliares,
        examenes: examAux,
        interconsulta_detalle: row.interconsulta_detalle,
        interconsultaDetalle: row.interconsulta_detalle,
        fecha_interconsulta: row.fecha_interconsulta,
        fechaInterconsulta: row.fecha_interconsulta,
        clinica_interconsulta: row.clinica_interconsulta,
        clinicaInterconsulta: row.clinica_interconsulta,
        diagnostico_definitivo: row.diagnostico_definitivo,
        diagnosticoDefinitivo: row.diagnostico_definitivo,
        tratamiento_realizar: row.tratamiento_realizar,
        tratamiento: row.tratamiento_realizar,
        pronostico: row.pronostico,
        alumno_tratante: row.alumno_tratante,
        alumnoTratante: row.alumno_tratante,
      };
    };

    const result = await pool.query(
      `SELECT 
            fecha, 
            clinica_respuesta, 
            descripcion,
            examenes_auxiliares, 
            interconsulta_detalle, 
            fecha_interconsulta, 
            clinica_interconsulta, 
            diagnostico_definitivo, 
            tratamiento_realizar, 
            pronostico, 
            alumno_tratante 
         FROM diagnostico 
         WHERE id_historia = $1 AND tipo = 'definitivo_clinicas'`,
      [id]
    );

    if (result.rows[0]) {
      return mapRow(result.rows[0]);
    }

    const fallbackResult = await pool.query(
      `SELECT 
            fecha, 
            clinica_respuesta, 
            descripcion,
            examenes_auxiliares, 
            interconsulta_detalle, 
            fecha_interconsulta, 
            clinica_interconsulta, 
            diagnostico_definitivo, 
            tratamiento_realizar, 
            pronostico, 
            alumno_tratante 
         FROM diagnostico 
         WHERE id_historia = $1 
         ORDER BY fecha DESC NULLS LAST 
         LIMIT 1`,
      [id]
    );

    return mapRow(fallbackResult.rows[0]);
  } catch (error) {
    throw error;
  }
}

export async function actualizarDiagnosticoClinicas(aggregateOrObj) {
  try {
    let agg = null;
    if (aggregateOrObj instanceof DiagnosticoClinicasAggregate) {
      agg = aggregateOrObj;
    } else {
      agg = new DiagnosticoClinicasAggregate(aggregateOrObj);
    }

    await pool.query(
      `CALL i_diagnostico_clinicas(
          $1::uuid, $2::date, $3::varchar, $4::text, 
          $5::jsonb, 
          $6::text, $7::date, $8::varchar, 
          $9::text, $10::text, $11::text, $12::varchar, 
          $13::uuid
        )`,
      agg.obtenerParametros()
    );
    return true;
  } catch (error) {
    throw error;
  }
}
