import pool from '../../../db/db.js';

class DomainError extends Error {
  constructor(message) {
    super(message);
    this.name = 'DomainError';
  }
}

// Value Objects (for critical numeric/text fields) — forgiving: map invalid inputs to null
class AgudezaVisualVO {
  constructor(value) {
    if (value === null || value === undefined) {
      this.value = null;
      return Object.freeze(this);
    }
    const num = Number(value);
    if (Number.isNaN(num) || num <= 0 || num > 10) {
      this.value = null;
      return Object.freeze(this);
    }
    this.value = num;
    Object.freeze(this);
  }
}

class AperturaMaximaVO {
  constructor(value) {
    if (value === null || value === undefined) {
      this.value = null;
      return Object.freeze(this);
    }
    const num = Number(value);
    if (Number.isNaN(num) || num < 0 || num > 100) {
      this.value = null;
      return Object.freeze(this);
    }
    this.value = num;
    Object.freeze(this);
  }
}

class MusculosDolorGradoVO {
  constructor(value) {
    if (value === null || value === undefined) {
      this.value = null;
      return Object.freeze(this);
    }
    const num = Number(value);
    if (Number.isNaN(num) || num < 0 || num > 10) {
      this.value = null;
      return Object.freeze(this);
    }
    this.value = num;
    Object.freeze(this);
  }
}

class ExamenFisicoRegionalAggregate {
  constructor({ idHistory, body = {} } = {}) {
    this._idHistory = ExamenFisicoRegionalAggregate._validateId(idHistory);

    this._cabezaPosicion = ExamenFisicoRegionalAggregate._normalizePrimitive(
      body.cabezaPosicion || body.cabeza_posicion
    );
    this._cabezaMovimientos = ExamenFisicoRegionalAggregate._normalizePrimitive(
      body.cabezaMovimientos || body.cabeza_movimientos
    );
    this._cabezaMovimientosObs =
      ExamenFisicoRegionalAggregate._normalizePrimitive(
        body.cabezaMovimientosObs || body.cabeza_movimientos_obs
      );
    this._craneoTamano = ExamenFisicoRegionalAggregate._normalizePrimitive(
      body.craneoTamano || body.craneo_tamano
    );
    this._craneoForma = ExamenFisicoRegionalAggregate._normalizePrimitive(
      body.craneoForma || body.craneo_forma
    );
    this._caraFormaFrente = ExamenFisicoRegionalAggregate._normalizePrimitive(
      body.caraFormaFrente || body.cara_forma_frente
    );
    this._caraFormaPerfil = ExamenFisicoRegionalAggregate._normalizePrimitive(
      body.caraFormaPerfil || body.cara_forma_perfil
    );

    this._ojosCejasAdecuada = ExamenFisicoRegionalAggregate._normalizePrimitive(
      body.ojosCejasAdecuada || body.ojos_cejas_adecuada
    );
    this._ojosImplantacionObs =
      ExamenFisicoRegionalAggregate._normalizePrimitive(
        body.ojosImplantacionObs || body.ojos_implantacion_obs
      );
    this._ojosEscleroticas = ExamenFisicoRegionalAggregate._normalizePrimitive(
      body.ojosEscleroticas || body.ojos_escleroticas
    );
    this._ojosAgudezaVisual = new AgudezaVisualVO(
      body.ojosAgudezaVisual || body.ojos_agudeza_visual
    );
    this._ojosIrisColor = ExamenFisicoRegionalAggregate._normalizePrimitive(
      body.ojosIrisColor || body.ojos_iris_color
    );
    this._ojosArcoSenil = ExamenFisicoRegionalAggregate._normalizePrimitive(
      body.ojosArcoSenil || body.ojos_arco_senil
    );

    this._narizForma = ExamenFisicoRegionalAggregate._normalizePrimitive(
      body.narizForma || body.nariz_forma
    );
    this._narizPermeables = ExamenFisicoRegionalAggregate._normalizePrimitive(
      body.narizPermeables || body.nariz_permeables
    );
    this._narizSecreciones = ExamenFisicoRegionalAggregate._normalizePrimitive(
      body.narizSecreciones || body.nariz_secreciones
    );
    this._narizSenosDolorosos =
      ExamenFisicoRegionalAggregate._normalizePrimitive(
        body.narizSenosDolorosos || body.nariz_senos_dolorosos
      );

    this._oidosAnomaliasMorfologicas =
      ExamenFisicoRegionalAggregate._normalizePrimitive(
        body.oidosAnomaliasMorfologicas || body.oidos_anomalias_morfologicas
      );
    this._oidosAnomaliasObs = ExamenFisicoRegionalAggregate._normalizePrimitive(
      body.oidosAnomaliasObs || body.oidos_anomalias_obs
    );
    this._oidosSecreciones = ExamenFisicoRegionalAggregate._normalizePrimitive(
      body.oidosSecreciones || body.oidos_secreciones
    );
    this._oidosAudicionConservada =
      ExamenFisicoRegionalAggregate._normalizePrimitive(
        body.oidosAudicionConservada || body.oidos_audicion_conservada
      );

    this._atmTrayectoria = ExamenFisicoRegionalAggregate._normalizePrimitive(
      body.atmTrayectoria || body.atm_trayectoria
    );

    this._atmLatIzqDolor = ExamenFisicoRegionalAggregate._normalizePrimitive(
      body.atmLatIzqDolor || body.atm_lat_izq_dolor
    );
    this._atmLatIzqRuido = ExamenFisicoRegionalAggregate._normalizePrimitive(
      body.atmLatIzqRuido || body.atm_lat_izq_ruido
    );
    this._atmLatIzqSalto = ExamenFisicoRegionalAggregate._normalizePrimitive(
      body.atmLatIzqSalto || body.atm_lat_izq_salto
    );

    this._atmLatDerDolor = ExamenFisicoRegionalAggregate._normalizePrimitive(
      body.atmLatDerDolor || body.atm_lat_der_dolor
    );
    this._atmLatDerRuido = ExamenFisicoRegionalAggregate._normalizePrimitive(
      body.atmLatDerRuido || body.atm_lat_der_ruido
    );
    this._atmLatDerSalto = ExamenFisicoRegionalAggregate._normalizePrimitive(
      body.atmLatDerSalto || body.atm_lat_der_salto
    );

    this._atmProtDolor = ExamenFisicoRegionalAggregate._normalizePrimitive(
      body.atmProtDolor || body.atm_prot_dolor
    );
    this._atmProtRuido = ExamenFisicoRegionalAggregate._normalizePrimitive(
      body.atmProtRuido || body.atm_prot_ruido
    );
    this._atmProtSalto = ExamenFisicoRegionalAggregate._normalizePrimitive(
      body.atmProtSalto || body.atm_prot_salto
    );

    this._atmAperDolor = ExamenFisicoRegionalAggregate._normalizePrimitive(
      body.atmAperDolor || body.atm_aper_dolor
    );
    this._atmAperRuido = ExamenFisicoRegionalAggregate._normalizePrimitive(
      body.atmAperRuido || body.atm_aper_ruido
    );
    this._atmAperSalto = ExamenFisicoRegionalAggregate._normalizePrimitive(
      body.atmAperSalto || body.atm_aper_salto
    );

    this._atmCierreDolor = ExamenFisicoRegionalAggregate._normalizePrimitive(
      body.atmCierreDolor || body.atm_cierre_dolor
    );
    this._atmCierreRuido = ExamenFisicoRegionalAggregate._normalizePrimitive(
      body.atmCierreRuido || body.atm_cierre_ruido
    );
    this._atmCierreSalto = ExamenFisicoRegionalAggregate._normalizePrimitive(
      body.atmCierreSalto || body.atm_cierre_salto
    );

    this._atmCoordinacionCondilar =
      ExamenFisicoRegionalAggregate._normalizePrimitive(
        body.atmCoordinacionCondilar || body.atm_coordinacion_condilar
      );
    this._atmAperturaMaximaMm = new AperturaMaximaVO(
      body.atmAperturaMaximaMm || body.atm_apertura_maxima_mm
    );
    this._atmObservaciones = ExamenFisicoRegionalAggregate._normalizePrimitive(
      body.atmObservaciones || body.atm_observaciones
    );
    this._atmMusculosDolor = ExamenFisicoRegionalAggregate._normalizePrimitive(
      body.atmMusculosDolor || body.atm_musculos_dolor
    );
    this._atmMusculosDolorGrado = new MusculosDolorGradoVO(
      body.atmMusculosDolorGrado || body.atm_musculos_dolor_grado
    );
    this._atmMusculosDolorZona =
      ExamenFisicoRegionalAggregate._normalizePrimitive(
        body.atmMusculosDolorZona || body.atm_musculos_dolor_zona
      );

    this._cuelloSimetrico = ExamenFisicoRegionalAggregate._normalizePrimitive(
      body.cuelloSimetrico || body.cuello_simetrico
    );
    this._cuelloSimetricoObs =
      ExamenFisicoRegionalAggregate._normalizePrimitive(
        body.cuelloSimetricoObs || body.cuello_simetrico_obs
      );
    this._cuelloMovilidadConservada =
      ExamenFisicoRegionalAggregate._normalizePrimitive(
        body.cuelloMovilidadConservada || body.cuello_movilidad_conservada
      );
    this._cuelloMovilidadObs =
      ExamenFisicoRegionalAggregate._normalizePrimitive(
        body.cuelloMovilidadObs || body.cuello_movilidad_obs
      );
    this._laringeAlineada = ExamenFisicoRegionalAggregate._normalizePrimitive(
      body.laringeAlineada || body.laringe_alineada
    );
    this._laringeaAlineadaObs =
      ExamenFisicoRegionalAggregate._normalizePrimitive(
        body.laringeAlineadaObs || body.laringe_alineada_obs
      );
    this._cuelloOtros = ExamenFisicoRegionalAggregate._normalizePrimitive(
      body.cuelloOtros || body.cuello_otros
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
      this._cabezaPosicion,
      this._cabezaMovimientos,
      this._cabezaMovimientosObs,
      this._craneoTamano,
      this._craneoForma,
      this._caraFormaFrente,
      this._caraFormaPerfil,
      this._ojosCejasAdecuada,
      this._ojosImplantacionObs,
      this._ojosEscleroticas,
      this._ojosAgudezaVisual.value,
      this._ojosIrisColor,
      this._ojosArcoSenil,
      this._narizForma,
      this._narizPermeables,
      this._narizSecreciones,
      this._narizSenosDolorosos,
      this._oidosAnomaliasMorfologicas,
      this._oidosAnomaliasObs,
      this._oidosSecreciones,
      this._oidosAudicionConservada,
      this._atmTrayectoria,
      this._atmLatIzqDolor,
      this._atmLatIzqRuido,
      this._atmLatIzqSalto,
      this._atmLatDerDolor,
      this._atmLatDerRuido,
      this._atmLatDerSalto,
      this._atmProtDolor,
      this._atmProtRuido,
      this._atmProtSalto,
      this._atmAperDolor,
      this._atmAperRuido,
      this._atmAperSalto,
      this._atmCierreDolor,
      this._atmCierreRuido,
      this._atmCierreSalto,
      this._atmCoordinacionCondilar,
      this._atmAperturaMaximaMm.value,
      this._atmObservaciones,
      this._atmMusculosDolor,
      this._atmMusculosDolorGrado.value,
      this._atmMusculosDolorZona,
      this._cuelloSimetrico,
      this._cuelloSimetricoObs,
      this._cuelloMovilidadConservada,
      this._cuelloMovilidadObs,
      this._laringeAlineada,
      this._laringeaAlineadaObs,
      this._cuelloOtros,
    ];
  }
}

export { DomainError, ExamenFisicoRegionalAggregate };

export async function registrarExamenFisicoRegional(data) {
  try {
    const keys = Object.keys(data);
    const values = Object.values(data);
    const fields = keys.join(', ');
    const params = keys.map((_, i) => `$${i + 1}`).join(', ');
    const query = `INSERT INTO examen_regional (${fields}) VALUES (${params}) RETURNING *`;
    const { rows } = await pool.query(query, values);
    if (rows.length === 0) {
      return null;
    }
    return rows[0];
  } catch (error) {
    throw error;
  }
}

export async function consultarExamenFisicoRegional(idHistory) {
  try {
    const result = await pool.query(
      'SELECT * FROM examen_regional WHERE id_historia = $1',
      [idHistory]
    );
    const data = result.rows[0];
    if (!data) {
      return null;
    }
    return {
      cabezaPosicion: data.cabeza_posicion,
      cabezaMovimientos: data.cabeza_movimientos,
      cabezaMovimientosObs: data.cabeza_movimientos_obs,
      craneoTamano: data.craneo_tamano,
      craneoForma: data.craneo_forma,
      caraFormaFrente: data.cara_forma_frente,
      caraFormaPerfil: data.cara_forma_perfil,

      ojosCejasAdecuada: data.ojos_cejas_adecuada,
      ojosImplantacionObs: data.ojos_implantacion_obs,
      ojosEscleroticas: data.ojos_escleroticas,
      ojosAgudezaVisual: data.ojos_agudeza_visual,
      ojosIrisColor: data.ojos_iris_color,
      ojosArcoSenil: data.ojos_arco_senil,

      narizForma: data.nariz_forma,
      narizPermeables: data.nariz_permeables,
      narizSecreciones: data.nariz_secreciones,
      narizSenosDolorosos: data.nariz_senos_dolorosos,

      oidosAnomaliasMorfologicas: data.oidos_anomalias_morfologicas,
      oidosAnomaliasObs: data.oidos_anomalias_obs,
      oidosSecreciones: data.oidos_secreciones,
      oidosAudicionConservada: data.oidos_audicion_conservada,

      atmTrayectoria: data.atm_trayectoria,

      atmLatIzqDolor: data.atm_lat_izq_dolor,
      atmLatIzqRuido: data.atm_lat_izq_ruido,
      atmLatIzqSalto: data.atm_lat_izq_salto,

      atmLatDerDolor: data.atm_lat_der_dolor,
      atmLatDerRuido: data.atm_lat_der_ruido,
      atmLatDerSalto: data.atm_lat_der_salto,

      atmProtDolor: data.atm_prot_dolor,
      atmProtRuido: data.atm_prot_ruido,
      atmProtSalto: data.atm_prot_salto,

      atmAperDolor: data.atm_aper_dolor,
      atmAperRuido: data.atm_aper_ruido,
      atmAperSalto: data.atm_aper_salto,

      atmCierreDolor: data.atm_cierre_dolor,
      atmCierreRuido: data.atm_cierre_ruido,
      atmCierreSalto: data.atm_cierre_salto,

      atmCoordinacionCondilar: data.atm_coordinacion_condilar,
      atmAperturaMaximaMm: data.atm_apertura_maxima_mm,
      atmObservaciones: data.atm_observaciones,
      atmMusculosDolor: data.atm_musculos_dolor,
      atmMusculosDolorGrado: data.atm_musculos_dolor_grado,
      atmMusculosDolorZona: data.atm_musculos_dolor_zona,

      cuelloSimetrico: data.cuello_simetrico,
      cuelloSimetricoObs: data.cuello_simetrico_obs,
      cuelloMovilidadConservada: data.cuello_movilidad_conservada,
      cuelloMovilidadObs: data.cuello_movilidad_obs,
      laringeAlineada: data.laringe_alineada,
      laringeAlineadaObs: data.laringe_alineada_obs,
      cuelloOtros: data.cuello_otros,
    };
  } catch (error) {
    throw error;
  }
}

export async function actualizarExamenFisicoRegional(dataOrAggregate) {
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
        d.cabezaPosicion || null,
        d.cabezaMovimientos || null,
        d.cabezaMovimientosObs || null,
        d.craneoTamano || null,
        d.craneoForma || null,
        d.caraFormaFrente || null,
        d.caraFormaPerfil || null,
        d.ojosCejasAdecuada ?? null,
        d.ojosImplantacionObs || null,
        d.ojosEscleroticas || null,
        d.ojosAgudezaVisual ?? null,
        d.ojosIrisColor || null,
        d.ojosArcoSenil ?? null,
        d.narizForma || null,
        d.narizPermeables ?? null,
        d.narizSecreciones || null,
        d.narizSenosDolorosos ?? null,
        d.oidosAnomaliasMorfologicas ?? null,
        d.oidosAnomaliasObs || null,
        d.oidosSecreciones ?? null,
        d.oidosAudicionConservada ?? null,
        d.atmTrayectoria || null,
        d.atmLatIzqDolor ?? null,
        d.atmLatIzqRuido ?? null,
        d.atmLatIzqSalto ?? null,
        d.atmLatDerDolor ?? null,
        d.atmLatDerRuido ?? null,
        d.atmLatDerSalto ?? null,
        d.atmProtDolor ?? null,
        d.atmProtRuido ?? null,
        d.atmProtSalto ?? null,
        d.atmAperDolor ?? null,
        d.atmAperRuido ?? null,
        d.atmAperSalto ?? null,
        d.atmCierreDolor ?? null,
        d.atmCierreRuido ?? null,
        d.atmCierreSalto ?? null,
        d.atmCoordinacionCondilar ?? null,
        d.atmAperturaMaximaMm || null,
        d.atmObservaciones || null,
        d.atmMusculosDolor ?? null,
        d.atmMusculosDolorGrado || null,
        d.atmMusculosDolorZona || null,
        d.cuelloSimetrico ?? null,
        d.cuelloSimetricoObs || null,
        d.cuelloMovilidadConservada ?? null,
        d.cuelloMovilidadObs || null,
        d.laringeAlineada ?? null,
        d.laringeAlineadaObs || null,
        d.cuelloOtros || null,
      ];
    }

    await pool.query(
      `CALL u_examen_regional(
          $1,
          $2, $3, $4, $5, $6, $7, $8,
          $9, $10, $11, $12, $13, $14,
          $15, $16, $17, $18,
          $19, $20, $21, $22,
          $23,
          $24, $25, $26, $27, $28, $29, $30, $31, $32, $33, $34, $35, $36, $37, $38,
          $39, $40, $41, $42, $43, $44,
          $45, $46, $47, $48, $49, $50, $51
        )`,
      params
    );
    return true;
  } catch (error) {
    throw error;
  }
}
