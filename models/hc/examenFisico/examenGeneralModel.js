import pool from '../../../db/db.js';

class DomainError extends Error {
  constructor(message) {
    super(message);
    this.name = 'DomainError';
  }
}

// Value Objects
class TemperaturaVO {
  constructor(value) {
    if (value === null || value === undefined) {
      this.value = null;
      return Object.freeze(this);
    }
    const num = Number(value);
    if (Number.isNaN(num)) {
      // No bloquear: origen UI permite texto; persistimos NULL en DB
      this.value = null;
      return Object.freeze(this);
    }
    if (num < 30 || num > 45) {
      // Fuera de rango, persistir null en lugar de fallar
      this.value = null;
      return Object.freeze(this);
    }
    this.value = num;
    Object.freeze(this);
  }
}

class PesoVO {
  constructor(value) {
    if (value === null || value === undefined) {
      this.value = null;
      return Object.freeze(this);
    }
    const num = Number(value);
    if (Number.isNaN(num) || num <= 0 || num > 500) {
      // No bloquear; persistir NULL si no es un número válido
      this.value = null;
      return Object.freeze(this);
    }
    this.value = num;
    Object.freeze(this);
  }
}

class PresionArterialVO {
  constructor(value) {
    if (value === null || value === undefined) {
      this.value = null;
      return Object.freeze(this);
    }
    const v = String(value).trim();
    const re = /^\d{2,3}\/\d{2,3}$/;
    if (!re.test(v)) {
      // No bloquear; persistir NULL si formato no válido
      this.value = null;
      return Object.freeze(this);
    }
    this.value = v;
    Object.freeze(this);
  }
}

// Aggregate
class ExamenFisicoGeneralAggregate {
  constructor({ idHistory, body = {} } = {}) {
    this._idHistory = ExamenFisicoGeneralAggregate._validateId(idHistory);
    this._posicion = ExamenFisicoGeneralAggregate._normalizePrimitive(
      body.posicion
    );
    this._actitud = ExamenFisicoGeneralAggregate._normalizePrimitive(
      body.actitud
    );
    this._deambulacion = ExamenFisicoGeneralAggregate._normalizePrimitive(
      body.deambulacion
    );
    this._facies = ExamenFisicoGeneralAggregate._normalizePrimitive(
      body.facies
    );
    this._faciesObs = ExamenFisicoGeneralAggregate._normalizePrimitive(
      body.faciesObs || body.facies_obs
    );
    this._conciencia = ExamenFisicoGeneralAggregate._normalizePrimitive(
      body.conciencia
    );
    this._constitucion = ExamenFisicoGeneralAggregate._normalizePrimitive(
      body.constitucion
    );
    this._estadoNutritivo = ExamenFisicoGeneralAggregate._normalizePrimitive(
      body.estadoNutritivo || body.estado_nutritivo
    );

    // Value Objects
    this._temperatura = new TemperaturaVO(body.temperatura);
    this._presionArterial = new PresionArterialVO(
      body.presionArterial || body.presion_arterial
    );
    this._frecuenciaRespiratoria =
      ExamenFisicoGeneralAggregate._normalizePrimitive(
        body.frecuenciaRespiratoria || body.frecuencia_respiratoria
      );
    this._pulso = ExamenFisicoGeneralAggregate._normalizePrimitive(body.pulso);
    this._peso = new PesoVO(body.peso);
    this._talla = ExamenFisicoGeneralAggregate._normalizePrimitive(body.talla);

    this._pielColor = ExamenFisicoGeneralAggregate._normalizePrimitive(
      body.pielColor || body.piel_color
    );
    this._pielHumedad = ExamenFisicoGeneralAggregate._normalizePrimitive(
      body.pielHumedad || body.piel_humedad
    );
    this._pielLesiones = ExamenFisicoGeneralAggregate._normalizePrimitive(
      body.pielLesiones || body.piel_lesiones
    );
    this._pielLesionesObs = ExamenFisicoGeneralAggregate._normalizePrimitive(
      body.pielLesionesObs || body.piel_lesiones_obs
    );
    this._pielAnexos = ExamenFisicoGeneralAggregate._normalizePrimitive(
      body.pielAnexos || body.piel_anexos
    );
    this._pielAnexosObs = ExamenFisicoGeneralAggregate._normalizePrimitive(
      body.pielAnexosObs || body.piel_anexos_obs
    );

    this._tcsDistribucion = ExamenFisicoGeneralAggregate._normalizePrimitive(
      body.tcsDistribucion || body.tcs_distribucion
    );
    this._tcsDistribucionObs = ExamenFisicoGeneralAggregate._normalizePrimitive(
      body.tcsDistribucionObs || body.tcs_distribucion_obs
    );
    this._tcsCantidad = ExamenFisicoGeneralAggregate._normalizePrimitive(
      body.tcsCantidad || body.tcs_cantidad
    );

    this._ganglios = ExamenFisicoGeneralAggregate._normalizePrimitive(
      body.ganglios
    );
    this._gangliosObs = ExamenFisicoGeneralAggregate._normalizePrimitive(
      body.gangliosObs || body.ganglios_obs
    );
  }

  static _validateId(id) {
    if (!id || typeof id !== 'string') {
      throw new DomainError('id_historia inválido: debe ser UUIDv4');
    }
    const re =
      /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    if (!re.test(id)) {
      throw new DomainError('id_historia inválido: formato UUIDv4 esperado');
    }
    return id;
  }

  static _normalizePrimitive(value) {
    if (value === undefined || value === null) {
      return null;
    }
    if (typeof value === 'string') {
      const t = value.trim();
      return t === '' ? null : t;
    }
    return value;
  }

  obtenerParametros() {
    // Respect the stored procedure order ($1..$26)
    return [
      this._idHistory,
      this._posicion,
      this._actitud,
      this._deambulacion,
      this._facies,
      this._faciesObs,
      this._conciencia,
      this._constitucion,
      this._estadoNutritivo,
      this._temperatura.value,
      this._presionArterial.value,
      this._frecuenciaRespiratoria,
      this._pulso,
      this._peso.value,
      this._talla,
      this._pielColor,
      this._pielHumedad,
      this._pielLesiones,
      this._pielLesionesObs,
      this._pielAnexos,
      this._pielAnexosObs,
      this._tcsDistribucion,
      this._tcsDistribucionObs,
      this._tcsCantidad,
      this._ganglios,
      this._gangliosObs,
    ];
  }
}

export { DomainError, ExamenFisicoGeneralAggregate };

export async function registrarExamenFisicoGeneral(data) {
  try {
    const keys = Object.keys(data);
    const values = Object.values(data);
    const fields = keys.join(', ');
    const params = keys.map((_, i) => `$${i + 1}`).join(', ');
    const query = `INSERT INTO examen_general (${fields}) VALUES (${params}) RETURNING *`;
    const { rows } = await pool.query(query, values);
    if (rows.length === 0) {
      return null;
    }
    return rows[0];
  } catch (error) {
    throw error;
  }
}

export async function consultarExamenFisicoGeneral(idHistory) {
  try {
    const result = await pool.query(
      'SELECT * FROM examen_general WHERE id_historia = $1',
      [idHistory]
    );
    const data = result.rows[0];
    if (!data) {
      return null;
    }
    return {
      posicion: data.posicion,
      actitud: data.actitud,
      deambulacion: data.deambulacion,
      facies: data.facies,
      faciesObs: data.facies_obs,
      conciencia: data.conciencia,
      constitucion: data.constitucion,
      estadoNutritivo: data.estado_nutritivo,
      temperatura: data.temperatura,
      presionArterial: data.presion_arterial,
      frecuenciaRespiratoria: data.frecuencia_respiratoria,
      pulso: data.pulso,
      peso: data.peso,
      talla: data.talla,
      pielColor: data.piel_color,
      pielHumedad: data.piel_humedad,
      pielLesiones: data.piel_lesiones,
      pielLesionesObs: data.piel_lesiones_obs,
      pielAnexos: data.piel_anexos,
      pielAnexosObs: data.piel_anexos_obs,
      tcsDistribucion: data.tcs_distribucion,
      tcsDistribucionObs: data.tcs_distribucion_obs,
      tcsCantidad: data.tcs_cantidad,
      ganglios: data.ganglios,
      gangliosObs: data.ganglios_obs,
    };
  } catch (error) {
    throw error;
  }
}

export async function actualizarExamenFisicoGeneral(examDataOrAggregate) {
  try {
    let params;
    if (
      examDataOrAggregate &&
      typeof examDataOrAggregate.obtenerParametros === 'function'
    ) {
      params = examDataOrAggregate.obtenerParametros();
    } else {
      // fallback for backward compatibility: expect plain object
      const {
        idHistory,
        posicion,
        actitud,
        deambulacion,
        facies,
        faciesObs,
        conciencia,
        constitucion,
        estadoNutritivo,
        temperatura,
        presionArterial,
        frecuenciaRespiratoria,
        pulso,
        peso,
        talla,
        pielColor,
        pielHumedad,
        pielLesiones,
        pielLesionesObs,
        pielAnexos,
        pielAnexosObs,
        tcsDistribucion,
        tcsDistribucionObs,
        tcsCantidad,
        ganglios,
        gangliosObs,
      } = examDataOrAggregate || {};
      params = [
        idHistory,
        posicion || null,
        actitud || null,
        deambulacion || null,
        facies || null,
        faciesObs || null,
        conciencia || null,
        constitucion || null,
        estadoNutritivo || null,
        temperatura || null,
        presionArterial || null,
        frecuenciaRespiratoria || null,
        pulso || null,
        peso || null,
        talla || null,
        pielColor || null,
        pielHumedad || null,
        pielLesiones || null,
        pielLesionesObs || null,
        pielAnexos || null,
        pielAnexosObs || null,
        tcsDistribucion || null,
        tcsDistribucionObs || null,
        tcsCantidad || null,
        ganglios || null,
        gangliosObs || null,
      ];
    }

    await pool.query(
      `CALL u_examen_general(
        $1, $2, $3, $4, $5, $6, $7, $8, $9, $10,
        $11, $12, $13, $14, $15, $16, $17, $18, $19, $20,
        $21, $22, $23, $24, $25, $26
      )`,
      params
    );
    return true;
  } catch (error) {
    throw error;
  }
}
