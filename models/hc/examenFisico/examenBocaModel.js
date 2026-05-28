import pool from '../../../db/db.js';

class DomainError extends Error {
  constructor(message) {
    super(message);
    this.name = 'DomainError';
  }
}

// Value Objects (for categorical/numeric-like fields) — forgiving: preserve text and map blanks to null
class OclusionCodeVO {
  constructor(value) {
    if (value === null || value === undefined) {
      this.value = null;
      return Object.freeze(this);
    }
    const text = String(value).trim();
    this.value = text === '' ? null : text;
    Object.freeze(this);
  }
}

class OverbiteVO {
  constructor(value) {
    if (value === null || value === undefined) {
      this.value = null;
      return Object.freeze(this);
    }
    const text = String(value).trim();
    this.value = text === '' ? null : text;
    Object.freeze(this);
  }
}

class OverjetVO {
  constructor(value) {
    if (value === null || value === undefined) {
      this.value = null;
      return Object.freeze(this);
    }
    const text = String(value).trim();
    this.value = text === '' ? null : text;
    Object.freeze(this);
  }
}

class ExamenBocaAggregate {
  constructor({ idHistory, body = {} } = {}) {
    this._idHistory = ExamenBocaAggregate._validateId(idHistory);

    this._labiosSin = ExamenBocaAggregate._normalizePrimitive(
      body.labiosSin || body.labios_sin_lesiones
    );
    this._labiosCon = ExamenBocaAggregate._normalizePrimitive(
      body.labiosCon || body.labios_con_lesiones
    );
    this._vestibuloSin = ExamenBocaAggregate._normalizePrimitive(
      body.vestibuloSin || body.vestibulo_sin_lesiones
    );
    this._vestibuloCon = ExamenBocaAggregate._normalizePrimitive(
      body.vestibuloCon || body.vestibulo_con_lesiones
    );
    this._carrillosSin = ExamenBocaAggregate._normalizePrimitive(
      body.carrillosSin || body.carrillos_retromolar_sin_lesiones
    );
    this._carrillosCon = ExamenBocaAggregate._normalizePrimitive(
      body.carrillosCon || body.carrillos_retromolar_con_lesiones
    );
    this._paladarSin = ExamenBocaAggregate._normalizePrimitive(
      body.paladarSin || body.paladar_sin_lesiones
    );
    this._paladarCon = ExamenBocaAggregate._normalizePrimitive(
      body.paladarCon || body.paladar_con_lesiones
    );
    this._orofaringeSin = ExamenBocaAggregate._normalizePrimitive(
      body.orofaringeSin || body.orofaringe_sin_lesiones
    );
    this._orofaringeCon = ExamenBocaAggregate._normalizePrimitive(
      body.orofaringeCon || body.orofaringe_con_lesiones
    );
    this._pisoBocaSin = ExamenBocaAggregate._normalizePrimitive(
      body.pisoBocaSin || body.piso_boca_sin_lesiones
    );
    this._pisoBocaCon = ExamenBocaAggregate._normalizePrimitive(
      body.pisoBocaCon || body.piso_boca_con_lesiones
    );
    this._lenguaSin = ExamenBocaAggregate._normalizePrimitive(
      body.lenguaSin || body.lengua_sin_lesiones
    );
    this._lenguaCon = ExamenBocaAggregate._normalizePrimitive(
      body.lenguaCon || body.lengua_con_lesiones
    );
    this._enciaSin = ExamenBocaAggregate._normalizePrimitive(
      body.enciaSin || body.encia_sin_lesiones
    );
    this._enciaCon = ExamenBocaAggregate._normalizePrimitive(
      body.enciaCon || body.encia_con_lesiones
    );

    this._oclusionMolarDer = new OclusionCodeVO(
      body.oclusionMolarDer || body.oclusion_molar_der
    );
    this._oclusionMolarIzq = new OclusionCodeVO(
      body.oclusionMolarIzq || body.oclusion_molar_izq
    );
    this._oclusionCaninaDer = new OclusionCodeVO(
      body.oclusionCaninaDer || body.oclusion_canina_der
    );
    this._oclusionCaninaIzq = new OclusionCodeVO(
      body.oclusionCaninaIzq || body.oclusion_canina_izq
    );

    this._oclusionMordidaCruzada = ExamenBocaAggregate._normalizePrimitive(
      body.oclusionMordidaCruzada || body.oclusion_mordida_cruzada
    );
    this._oclusionVestibuloclusion = ExamenBocaAggregate._normalizePrimitive(
      body.oclusionVestibuloclusion || body.oclusion_vestibuloclusion
    );

    this._oclusionOverbite = new OverbiteVO(
      body.oclusionOverbite || body.oclusion_overbite
    );
    this._oclusionMordidaAbierta = ExamenBocaAggregate._normalizePrimitive(
      body.oclusionMordidaAbierta || body.oclusion_mordida_abierta
    );
    this._oclusionSobremordida = ExamenBocaAggregate._normalizePrimitive(
      body.oclusionSobremordida || body.oclusion_sobremordida
    );
    this._oclusionVerticalOtros = ExamenBocaAggregate._normalizePrimitive(
      body.oclusionVerticalOtros || body.oclusion_relacion_vertical_otros
    );

    this._oclusionOverjet = new OverjetVO(
      body.oclusionOverjet || body.oclusion_overjet
    );
    this._oclusionProtrusion = ExamenBocaAggregate._normalizePrimitive(
      body.oclusionProtrusion || body.oclusion_protrusion
    );
    this._oclusionGuiaIncisiva = ExamenBocaAggregate._normalizePrimitive(
      body.oclusionGuiaIncisiva || body.oclusion_guia_incisiva
    );
    this._oclusionContactoPosterior = ExamenBocaAggregate._normalizePrimitive(
      body.oclusionContactoPosterior || body.oclusion_contacto_posterior
    );

    this._latDerGuiaCanina = ExamenBocaAggregate._normalizePrimitive(
      body.latDerGuiaCanina || body.lat_der_guia_canina
    );
    this._latDerFuncionGrupo = ExamenBocaAggregate._normalizePrimitive(
      body.latDerFuncionGrupo || body.lat_der_funcion_grupo
    );
    this._latDerContactoBalance = ExamenBocaAggregate._normalizePrimitive(
      body.latDerContactoBalance || body.lat_der_contacto_balance
    );
    this._latDerDescriba = ExamenBocaAggregate._normalizePrimitive(
      body.latDerDescriba || body.lat_der_describa
    );

    this._latIzqGuiaCanina = ExamenBocaAggregate._normalizePrimitive(
      body.latIzqGuiaCanina || body.lat_izq_guia_canina
    );
    this._latIzqFuncionGrupo = ExamenBocaAggregate._normalizePrimitive(
      body.latIzqFuncionGrupo || body.lat_izq_funcion_grupo
    );
    this._latIzqContactoBalance = ExamenBocaAggregate._normalizePrimitive(
      body.latIzqContactoBalance || body.lat_izq_contacto_balance
    );
    this._latIzqDescriba = ExamenBocaAggregate._normalizePrimitive(
      body.latIzqDescriba || body.lat_izq_describa
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
    return [
      this._idHistory,
      this._labiosSin,
      this._labiosCon,
      this._vestibuloSin,
      this._vestibuloCon,
      this._carrillosSin,
      this._carrillosCon,
      this._paladarSin,
      this._paladarCon,
      this._orofaringeSin,
      this._orofaringeCon,
      this._pisoBocaSin,
      this._pisoBocaCon,
      this._lenguaSin,
      this._lenguaCon,
      this._enciaSin,
      this._enciaCon,
      this._oclusionMolarDer.value,
      this._oclusionMolarIzq.value,
      this._oclusionCaninaDer.value,
      this._oclusionCaninaIzq.value,
      this._oclusionMordidaCruzada,
      this._oclusionVestibuloclusion,
      this._oclusionOverbite.value,
      this._oclusionMordidaAbierta,
      this._oclusionSobremordida,
      this._oclusionVerticalOtros,
      this._oclusionOverjet.value,
      this._oclusionProtrusion,
      this._oclusionGuiaIncisiva,
      this._oclusionContactoPosterior,
      this._latDerGuiaCanina,
      this._latDerFuncionGrupo,
      this._latDerContactoBalance,
      this._latDerDescriba,
      this._latIzqGuiaCanina,
      this._latIzqFuncionGrupo,
      this._latIzqContactoBalance,
      this._latIzqDescriba,
    ];
  }
}

export { DomainError, ExamenBocaAggregate };

export async function consultarExamenBoca(idHistory) {
  try {
    const result = await pool.query(
      'SELECT * FROM examen_clinico_boca WHERE id_historia = $1',
      [idHistory]
    );
    const data = result.rows[0];
    if (!data) {
      return null;
    }
    return {
      labiosSin: data.labios_sin_lesiones,
      labiosCon: data.labios_con_lesiones,
      vestibuloSin: data.vestibulo_sin_lesiones,
      vestibuloCon: data.vestibulo_con_lesiones,
      carrillosSin: data.carrillos_retromolar_sin_lesiones,
      carrillosCon: data.carrillos_retromolar_con_lesiones,
      paladarSin: data.paladar_sin_lesiones,
      paladarCon: data.paladar_con_lesiones,
      orofaringeSin: data.orofaringe_sin_lesiones,
      orofaringeCon: data.orofaringe_con_lesiones,
      pisoBocaSin: data.piso_boca_sin_lesiones,
      pisoBocaCon: data.piso_boca_con_lesiones,
      lenguaSin: data.lengua_sin_lesiones,
      lenguaCon: data.lengua_con_lesiones,
      enciaSin: data.encia_sin_lesiones,
      enciaCon: data.encia_con_lesiones,

      oclusionMolarDer: data.oclusion_molar_der,
      oclusionMolarIzq: data.oclusion_molar_izq,
      oclusionCaninaDer: data.oclusion_canina_der,
      oclusionCaninaIzq: data.oclusion_canina_izq,

      oclusionMordidaCruzada: data.oclusion_mordida_cruzada,
      oclusionVestibuloclusion: data.oclusion_vestibuloclusion,

      oclusionOverbite: data.oclusion_overbite,
      oclusionMordidaAbierta: data.oclusion_mordida_abierta,
      oclusionSobremordida: data.oclusion_sobremordida,
      oclusionVerticalOtros: data.oclusion_relacion_vertical_otros,

      oclusionOverjet: data.oclusion_overjet,
      oclusionProtrusion: data.oclusion_protrusion,
      oclusionGuiaIncisiva: data.oclusion_guia_incisiva,
      oclusionContactoPosterior: data.oclusion_contacto_posterior,

      latDerGuiaCanina: data.lat_der_guia_canina,
      latDerFuncionGrupo: data.lat_der_funcion_grupo,
      latDerContactoBalance: data.lat_der_contacto_balance,
      latDerDescriba: data.lat_der_describa,

      latIzqGuiaCanina: data.lat_izq_guia_canina,
      latIzqFuncionGrupo: data.lat_izq_funcion_grupo,
      latIzqContactoBalance: data.lat_izq_contacto_balance,
      latIzqDescriba: data.lat_izq_describa,
    };
  } catch (error) {
    throw error;
  }
}

export async function actualizarExamenBoca(dataOrAggregate) {
  try {
    let params;
    if (
      dataOrAggregate &&
      typeof dataOrAggregate.obtenerParametros === 'function'
    ) {
      params = dataOrAggregate.obtenerParametros();
    } else {
      const d = dataOrAggregate || {};
      params = [
        d.idHistory,
        d.labiosSin || null,
        d.labiosCon || null,
        d.vestibuloSin || null,
        d.vestibuloCon || null,
        d.carrillosSin || null,
        d.carrillosCon || null,
        d.paladarSin || null,
        d.paladarCon || null,
        d.orofaringeSin || null,
        d.orofaringeCon || null,
        d.pisoBocaSin || null,
        d.pisoBocaCon || null,
        d.lenguaSin || null,
        d.lenguaCon || null,
        d.enciaSin || null,
        d.enciaCon || null,
        d.oclusionMolarDer || null,
        d.oclusionMolarIzq || null,
        d.oclusionCaninaDer || null,
        d.oclusionCaninaIzq || null,
        d.oclusionMordidaCruzada || null,
        d.oclusionVestibuloclusion ?? null,
        d.oclusionOverbite || null,
        d.oclusionMordidaAbierta || null,
        d.oclusionSobremordida ?? null,
        d.oclusionVerticalOtros || null,
        d.oclusionOverjet || null,
        d.oclusionProtrusion ?? null,
        d.oclusionGuiaIncisiva || null,
        d.oclusionContactoPosterior || null,
        d.latDerGuiaCanina ?? null,
        d.latDerFuncionGrupo ?? null,
        d.latDerContactoBalance ?? null,
        d.latDerDescriba || null,
        d.latIzqGuiaCanina ?? null,
        d.latIzqFuncionGrupo ?? null,
        d.latIzqContactoBalance ?? null,
        d.latIzqDescriba || null,
      ];
    }

    await pool.query(
      `CALL u_examen_clinico_boca(
          $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, 
          $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, 
          $21, $22, $23, $24, $25, $26, $27, $28, $29, $30, 
          $31, $32, $33, $34, $35, $36, $37, $38, $39
        )`,
      params
    );
    return true;
  } catch (error) {
    throw error;
  }
}
