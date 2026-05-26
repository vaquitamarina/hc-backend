import pool from '../../../db/db.js';

class DomainError extends Error {
  constructor(message) {
    super(message);
    this.name = 'DomainError';
  }
}

class IdentificadorUuidValueObject {
  constructor(value) {
    if (typeof value !== 'string' || value.trim().length === 0) {
      throw new DomainError('El identificador clínico debe ser un UUID válido');
    }

    const normalizedValue = value.trim().toLowerCase();
    const uuidPattern =
      /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    if (!uuidPattern.test(normalizedValue)) {
      throw new DomainError('El identificador clínico debe ser un UUID válido');
    }

    this.value = normalizedValue;
    Object.freeze(this);
  }
}

class EnteroNoNegativoValueObject {
  constructor(value, mensajeError) {
    if (value === null || value === undefined || value === '') {
      this.value = null;
      Object.freeze(this);
      return;
    }

    const parsedValue = Number(value);
    if (!Number.isInteger(parsedValue) || parsedValue < 0) {
      throw new DomainError(mensajeError);
    }

    this.value = parsedValue;
    Object.freeze(this);
  }
}

class FechaClinicaValueObject {
  constructor(value, mensajeError) {
    if (value === null || value === undefined || value === '') {
      this.value = null;
      Object.freeze(this);
      return;
    }

    const fecha = new Date(value);
    if (Number.isNaN(fecha.getTime())) {
      throw new DomainError(mensajeError);
    }

    this.value = fecha.toISOString();
    Object.freeze(this);
  }
}

class AntecedentePersonalAggregate {
  constructor({
    id_historia,
    esta_embarazada = null,
    mac = null,
    otros = null,
    psicosocial = null,
    vacunas = null,
    hepatitis_b = null,
    grupo_sanguineo_desc = null,
    fuma = null,
    cigarrillos_dia = null,
    toma_te = null,
    tazas_te_dia = null,
    toma_alcohol = null,
    frecuencia_alcohol = null,
    aprieta_dientes = null,
    momento_aprieta = null,
    rechina = null,
    dolor_muscular = null,
    chupa_dedo = null,
    muerde_objetos = null,
    muerde_labios = null,
    otros_habitos = null,
    frecuencia_cepillado = null,
    cepillo_duro = null,
    cepillo_mediano = null,
    cepillo_blando = null,
    cepillo_electrico = null,
    cepillo_interproximal = null,
    tipo_interproximal = null,
    seda_dental = null,
    enjuague_bucal = null,
    otros_elementos_higiene = null,
  } = {}) {
    this._idHistoria = new IdentificadorUuidValueObject(id_historia);
    this._estaEmbarazada = this._normalizePrimitive(esta_embarazada);
    this._mac = this._normalizePrimitive(mac);
    this._otros = this._normalizePrimitive(otros);
    this._psicosocial = this._normalizePrimitive(psicosocial);
    this._vacunas = this._normalizePrimitive(vacunas);
    this._hepatitisB = this._normalizePrimitive(hepatitis_b);
    this._grupoSanguineoDesc = this._normalizePrimitive(grupo_sanguineo_desc);
    this._fuma = this._normalizePrimitive(fuma);
    this._cigarrillosDia = this._normalizePrimitive(cigarrillos_dia);
    this._tomaTe = this._normalizePrimitive(toma_te);
    this._tazasTeDia = this._normalizePrimitive(tazas_te_dia);
    this._tomaAlcohol = this._normalizePrimitive(toma_alcohol);
    this._frecuenciaAlcohol = this._normalizePrimitive(frecuencia_alcohol);
    this._aprietaDientes = this._normalizePrimitive(aprieta_dientes);
    this._momentoAprieta = this._normalizePrimitive(momento_aprieta);
    this._rechina = this._normalizePrimitive(rechina);
    this._dolorMuscular = this._normalizePrimitive(dolor_muscular);
    this._chupaDedo = this._normalizePrimitive(chupa_dedo);
    this._muerdeObjetos = this._normalizePrimitive(muerde_objetos);
    this._muerdeLabios = this._normalizePrimitive(muerde_labios);
    this._otrosHabitos = this._normalizePrimitive(otros_habitos);
    this._frecuenciaCepillado = this._normalizePrimitive(frecuencia_cepillado);
    this._cepilloDuro = this._normalizePrimitive(cepillo_duro);
    this._cepilloMediano = this._normalizePrimitive(cepillo_mediano);
    this._cepilloBlando = this._normalizePrimitive(cepillo_blando);
    this._cepilloElectrico = this._normalizePrimitive(cepillo_electrico);
    this._cepilloInterproximal = this._normalizePrimitive(
      cepillo_interproximal
    );
    this._tipoInterproximal = this._normalizePrimitive(tipo_interproximal);
    this._sedaDental = this._normalizePrimitive(seda_dental);
    this._enjuagueBucal = this._normalizePrimitive(enjuague_bucal);
    this._otrosElementosHigiene = this._normalizePrimitive(
      otros_elementos_higiene
    );

    Object.freeze(this);
  }

  _normalizePrimitive(value) {
    if (value === null || value === undefined || value === '') {
      return null;
    }

    return value;
  }

  obtenerParametros() {
    return [
      this._idHistoria.value,
      this._estaEmbarazada,
      this._mac,
      this._otros,
      this._psicosocial,
      this._vacunas,
      this._hepatitisB,
      this._grupoSanguineoDesc,
      this._fuma,
      this._cigarrillosDia,
      this._tomaTe,
      this._tazasTeDia,
      this._tomaAlcohol,
      this._frecuenciaAlcohol,
      this._aprietaDientes,
      this._momentoAprieta,
      this._rechina,
      this._dolorMuscular,
      this._chupaDedo,
      this._muerdeObjetos,
      this._muerdeLabios,
      this._otrosHabitos,
      this._frecuenciaCepillado,
      this._cepilloDuro,
      this._cepilloMediano,
      this._cepilloBlando,
      this._cepilloElectrico,
      this._cepilloInterproximal,
      this._tipoInterproximal,
      this._sedaDental,
      this._enjuagueBucal,
      this._otrosElementosHigiene,
    ];
  }

  get idHistoria() {
    return this._idHistoria.value;
  }
}

class AntecedenteMedicoAggregate {
  constructor({
    id_historia,
    salud_general = null,
    bajo_tratamiento = null,
    tipo_tratamiento = null,
    hospitalizaciones = null,
    tuvo_traumatismos = null,
    tipo_traumatismos = null,
    alergias = null,
    medicamentos_contraindicados = null,
    enf_hepatitis = null,
    enf_alergia_cronica = null,
    enf_corazon = null,
    enf_fiebre_reumatica = null,
    enf_anemia = null,
    enf_asma = null,
    enf_diabetes = null,
    enf_epilepsia = null,
    enf_coagulacion = null,
    enf_tbc = null,
    enf_hipertension = null,
    enf_ulcera = null,
    enf_neurologica = null,
    otras_enf_patologicas = null,
    odontologicos = null,
  } = {}) {
    this._idHistoria = new IdentificadorUuidValueObject(id_historia);
    this._saludGeneral = this._normalizePrimitive(salud_general);
    this._bajoTratamiento = this._normalizePrimitive(bajo_tratamiento);
    this._tipoTratamiento = this._normalizePrimitive(tipo_tratamiento);
    this._hospitalizaciones = this._normalizePrimitive(hospitalizaciones);
    this._tuvoTraumatismos = this._normalizePrimitive(tuvo_traumatismos);
    this._tipoTraumatismos = this._normalizePrimitive(tipo_traumatismos);
    this._alergias = this._normalizePrimitive(alergias);
    this._medicamentosContraindicados = this._normalizePrimitive(
      medicamentos_contraindicados
    );
    this._enfHepatitis = this._normalizePrimitive(enf_hepatitis);
    this._enfAlergiaCronica = this._normalizePrimitive(enf_alergia_cronica);
    this._enfCorazon = this._normalizePrimitive(enf_corazon);
    this._enfFiebreReumatica = this._normalizePrimitive(enf_fiebre_reumatica);
    this._enfAnemia = this._normalizePrimitive(enf_anemia);
    this._enfAsma = this._normalizePrimitive(enf_asma);
    this._enfDiabetes = this._normalizePrimitive(enf_diabetes);
    this._enfEpilepsia = this._normalizePrimitive(enf_epilepsia);
    this._enfCoagulacion = this._normalizePrimitive(enf_coagulacion);
    this._enfTbc = this._normalizePrimitive(enf_tbc);
    this._enfHipertension = this._normalizePrimitive(enf_hipertension);
    this._enfUlcera = this._normalizePrimitive(enf_ulcera);
    this._enfNeurologica = this._normalizePrimitive(enf_neurologica);
    this._otrasEnfPatologicas = this._normalizePrimitive(otras_enf_patologicas);
    this._odontologicos = this._normalizePrimitive(odontologicos);

    Object.freeze(this);
  }

  _normalizePrimitive(value) {
    if (value === null || value === undefined || value === '') {
      return null;
    }

    return value;
  }

  obtenerParametros() {
    return [
      this._idHistoria.value,
      this._saludGeneral,
      this._bajoTratamiento,
      this._tipoTratamiento,
      this._hospitalizaciones,
      this._tuvoTraumatismos,
      this._tipoTraumatismos,
      this._alergias,
      this._medicamentosContraindicados,
      this._enfHepatitis,
      this._enfAlergiaCronica,
      this._enfCorazon,
      this._enfFiebreReumatica,
      this._enfAnemia,
      this._enfAsma,
      this._enfDiabetes,
      this._enfEpilepsia,
      this._enfCoagulacion,
      this._enfTbc,
      this._enfHipertension,
      this._enfUlcera,
      this._enfNeurologica,
      this._otrasEnfPatologicas,
      this._odontologicos,
    ];
  }

  get idHistoria() {
    return this._idHistoria.value;
  }
}

class AntecedenteFamiliarAggregate {
  constructor({ id_historia, descripcion = null } = {}) {
    this._idHistoria = new IdentificadorUuidValueObject(id_historia);
    this._descripcion = this._normalizePrimitive(descripcion);
    Object.freeze(this);
  }

  _normalizePrimitive(value) {
    if (value === null || value === undefined || value === '') {
      return null;
    }

    return value;
  }

  obtenerParametros() {
    return [this._idHistoria.value, this._descripcion];
  }

  get idHistoria() {
    return this._idHistoria.value;
  }
}

class SeguimientoDelTratamientoAggregate {
  constructor({
    id_historia,
    motivo_dolor = null,
    motivo_control = null,
    frecuencia_control_meses = null,
    motivo_limpieza = null,
    frecuencia_limpieza_meses = null,
    actitud_tranquilo = null,
    actitud_aprensivo = null,
    actitud_panico = null,
    desagrado_atencion = null,
    fecha_consentimiento = null,
    firma_nombre = null,
    historia_elaborada_por = null,
  } = {}) {
    this._idHistoria = new IdentificadorUuidValueObject(id_historia);
    this._motivoDolor = this._normalizePrimitive(motivo_dolor);
    this._motivoControl = this._normalizePrimitive(motivo_control);
    this._frecuenciaControlMeses = new EnteroNoNegativoValueObject(
      frecuencia_control_meses,
      'La frecuencia de control debe ser un entero no negativo'
    );
    this._motivoLimpieza = this._normalizePrimitive(motivo_limpieza);
    this._frecuenciaLimpiezaMeses = new EnteroNoNegativoValueObject(
      frecuencia_limpieza_meses,
      'La frecuencia de limpieza debe ser un entero no negativo'
    );
    this._actitudTranquilo = this._normalizePrimitive(actitud_tranquilo);
    this._actitudAprensivo = this._normalizePrimitive(actitud_aprensivo);
    this._actitudPanico = this._normalizePrimitive(actitud_panico);
    this._desagradoAtencion = this._normalizePrimitive(desagrado_atencion);
    this._fechaConsentimiento = new FechaClinicaValueObject(
      fecha_consentimiento,
      'La fecha de consentimiento no tiene un formato válido'
    );
    this._firmaNombre = this._normalizePrimitive(firma_nombre);
    this._historiaElaboradaPor = this._normalizePrimitive(
      historia_elaborada_por
    );
    Object.freeze(this);
  }

  _normalizePrimitive(value) {
    if (value === null || value === undefined || value === '') {
      return null;
    }

    return value;
  }

  obtenerParametros() {
    return [
      this._idHistoria.value,
      this._motivoDolor,
      this._motivoControl,
      this._frecuenciaControlMeses.value,
      this._motivoLimpieza,
      this._frecuenciaLimpiezaMeses.value,
      this._actitudTranquilo,
      this._actitudAprensivo,
      this._actitudPanico,
      this._desagradoAtencion,
      this._fechaConsentimiento.value,
      this._firmaNombre,
      this._historiaElaboradaPor,
    ];
  }

  get idHistoria() {
    return this._idHistoria.value;
  }
}

class AntecedentesPersonalesNoPatologicos {
  static async registrar(data) {
    try {
      const agregado =
        data instanceof AntecedentePersonalAggregate
          ? data
          : new AntecedentePersonalAggregate(data);
      await pool.query(
        `CALL i_antecedente_personal($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,$21,$22,$23,$24,$25,$26,$27,$28,$29,$30,$31,$32)`,
        agregado.obtenerParametros()
      );
      return true;
    } catch (error) {
      if (error instanceof DomainError || error.name === 'DomainError') {
        throw error;
      }
      throw new Error(error.message || 'Error al crear antecedente personal');
    }
  }

  static async consultarPorId(idAntecedente) {
    try {
      const identificador = new IdentificadorUuidValueObject(idAntecedente);
      const result = await pool.query(
        `SELECT * FROM antecedente_personal WHERE id_antecedente = $1`,
        [identificador.value]
      );
      if (result.rows.length === 0) {
        return null;
      }
      return result.rows[0];
    } catch (error) {
      if (error instanceof DomainError || error.name === 'DomainError') {
        throw error;
      }
      throw error;
    }
  }

  static async consultarPorHistoria(idHistoriaClinica) {
    try {
      const identificador = new IdentificadorUuidValueObject(idHistoriaClinica);
      const result = await pool.query(
        `SELECT * FROM antecedente_personal WHERE id_historia = $1`,
        [identificador.value]
      );
      if (result.rows.length === 0) {
        return null;
      }
      return result.rows[0];
    } catch (error) {
      if (error instanceof DomainError || error.name === 'DomainError') {
        throw error;
      }
      throw error;
    }
  }

  static async actualizarPorHistoria(idHistoriaClinica, data) {
    try {
      const identificador = new IdentificadorUuidValueObject(idHistoriaClinica);
      const agregado =
        data instanceof AntecedentePersonalAggregate
          ? data
          : new AntecedentePersonalAggregate({
              ...data,
              id_historia: identificador.value,
            });
      await pool.query(
        `CALL u_antecedente_personal($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,$21,$22,$23,$24,$25,$26,$27,$28,$29,$30,$31,$32)`,
        agregado.obtenerParametros()
      );
      return true;
    } catch (error) {
      if (error instanceof DomainError || error.name === 'DomainError') {
        throw error;
      }
      throw new Error(
        error.message || 'Error al actualizar antecedente personal'
      );
    }
  }
}

class AntecedentesPersonalesPatologicos {
  static async registrar(data) {
    try {
      const agregado =
        data instanceof AntecedenteMedicoAggregate
          ? data
          : new AntecedenteMedicoAggregate(data);
      await pool.query(
        `CALL i_antecedente_medico($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,$21,$22,$23,$24)`,
        agregado.obtenerParametros()
      );
      return true;
    } catch (error) {
      if (error instanceof DomainError || error.name === 'DomainError') {
        throw error;
      }
      throw error;
    }
  }

  static async consultarPorHistoria(idHistoriaClinica) {
    try {
      const identificador = new IdentificadorUuidValueObject(idHistoriaClinica);
      const result = await pool.query(
        `SELECT * FROM antecedente_medico WHERE id_historia = $1`,
        [identificador.value]
      );
      if (result.rows.length === 0) {
        return null;
      }
      return result.rows[0];
    } catch (error) {
      if (error instanceof DomainError || error.name === 'DomainError') {
        throw error;
      }
      throw error;
    }
  }

  static async actualizarPorHistoria(idHistoriaClinica, data) {
    try {
      const identificador = new IdentificadorUuidValueObject(idHistoriaClinica);
      const agregado =
        data instanceof AntecedenteMedicoAggregate
          ? data
          : new AntecedenteMedicoAggregate({
              ...data,
              id_historia: identificador.value,
            });
      await pool.query(
        `CALL u_antecedente_medico($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,$21,$22,$23,$24)`,
        agregado.obtenerParametros()
      );
      return true;
    } catch (error) {
      if (error instanceof DomainError || error.name === 'DomainError') {
        throw error;
      }
      throw error;
    }
  }
}

class AntecedentesHeredoFamiliares {
  static async registrar(data) {
    try {
      const agregado =
        data instanceof AntecedenteFamiliarAggregate
          ? data
          : new AntecedenteFamiliarAggregate(data);
      await pool.query(
        `CALL i_antecedente_familiar($1,$2)`,
        agregado.obtenerParametros()
      );
      return true;
    } catch (error) {
      if (error instanceof DomainError || error.name === 'DomainError') {
        throw error;
      }
      throw error;
    }
  }

  static async consultarPorHistoria(idHistoriaClinica) {
    try {
      const identificador = new IdentificadorUuidValueObject(idHistoriaClinica);
      const result = await pool.query(
        `SELECT * FROM antecedente_familiar WHERE id_historia = $1`,
        [identificador.value]
      );
      if (result.rows.length === 0) {
        return null;
      }
      return result.rows[0];
    } catch (error) {
      if (error instanceof DomainError || error.name === 'DomainError') {
        throw error;
      }
      throw error;
    }
  }

  static async actualizarPorHistoria(idHistoriaClinica, data) {
    try {
      const identificador = new IdentificadorUuidValueObject(idHistoriaClinica);
      const agregado =
        data instanceof AntecedenteFamiliarAggregate
          ? data
          : new AntecedenteFamiliarAggregate({
              ...data,
              id_historia: identificador.value,
            });
      await pool.query(
        `CALL u_antecedente_familiar($1,$2)`,
        agregado.obtenerParametros()
      );
      return true;
    } catch (error) {
      if (error instanceof DomainError || error.name === 'DomainError') {
        throw error;
      }
      throw error;
    }
  }
}

class SeguimientoDelTratamiento {
  static async registrar(data) {
    try {
      const agregado =
        data instanceof SeguimientoDelTratamientoAggregate
          ? data
          : new SeguimientoDelTratamientoAggregate(data);
      await pool.query(
        `CALL i_antecedente_cumplimiento($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13)`,
        agregado.obtenerParametros()
      );
      return true;
    } catch (error) {
      if (error instanceof DomainError || error.name === 'DomainError') {
        throw error;
      }
      throw error;
    }
  }

  static async consultarPorHistoria(idHistoriaClinica) {
    try {
      const identificador = new IdentificadorUuidValueObject(idHistoriaClinica);
      const result = await pool.query(
        `SELECT * FROM antecedente_cumplimiento WHERE id_historia = $1`,
        [identificador.value]
      );
      if (result.rows.length === 0) {
        return null;
      }
      return result.rows[0];
    } catch (error) {
      if (error instanceof DomainError || error.name === 'DomainError') {
        throw error;
      }
      throw error;
    }
  }

  static async actualizarPorHistoria(idHistoriaClinica, data) {
    try {
      const identificador = new IdentificadorUuidValueObject(idHistoriaClinica);
      const agregado =
        data instanceof SeguimientoDelTratamientoAggregate
          ? data
          : new SeguimientoDelTratamientoAggregate({
              ...data,
              id_historia: identificador.value,
            });
      await pool.query(
        `CALL u_antecedente_cumplimiento($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13)`,
        agregado.obtenerParametros()
      );
      return true;
    } catch (error) {
      if (error instanceof DomainError || error.name === 'DomainError') {
        throw error;
      }
      throw error;
    }
  }
}

export {
  DomainError,
  IdentificadorUuidValueObject,
  EnteroNoNegativoValueObject,
  FechaClinicaValueObject,
  AntecedentePersonalAggregate,
  AntecedenteMedicoAggregate,
  AntecedenteFamiliarAggregate,
  SeguimientoDelTratamientoAggregate,
  AntecedentesPersonalesNoPatologicos,
  AntecedentesPersonalesPatologicos,
  AntecedentesHeredoFamiliares,
  SeguimientoDelTratamiento,
};

class AntecedentePersonal {
  static create(data) {
    return AntecedentesPersonalesNoPatologicos.registrar(data);
  }

  static getById(idAntecedente) {
    return AntecedentesPersonalesNoPatologicos.consultarPorId(idAntecedente);
  }

  static getByHistoria(idHistoriaClinica) {
    return AntecedentesPersonalesNoPatologicos.consultarPorHistoria(
      idHistoriaClinica
    );
  }

  static update(idHistoriaClinica, data) {
    return AntecedentesPersonalesNoPatologicos.actualizarPorHistoria(
      idHistoriaClinica,
      data
    );
  }
}

class AntecedenteMedico {
  static create(data) {
    return AntecedentesPersonalesPatologicos.registrar(data);
  }

  static getByHistoria(idHistoriaClinica) {
    return AntecedentesPersonalesPatologicos.consultarPorHistoria(
      idHistoriaClinica
    );
  }

  static update(idHistoriaClinica, data) {
    return AntecedentesPersonalesPatologicos.actualizarPorHistoria(
      idHistoriaClinica,
      data
    );
  }
}

class AntecedenteFamiliar {
  static create(data) {
    return AntecedentesHeredoFamiliares.registrar(data);
  }

  static getByHistoria(idHistoriaClinica) {
    return AntecedentesHeredoFamiliares.consultarPorHistoria(idHistoriaClinica);
  }

  static update(idHistoriaClinica, data) {
    return AntecedentesHeredoFamiliares.actualizarPorHistoria(
      idHistoriaClinica,
      data
    );
  }
}

class AntecedenteCumplimiento {
  static create(data) {
    return SeguimientoDelTratamiento.registrar(data);
  }

  static getByHistoria(idHistoriaClinica) {
    return SeguimientoDelTratamiento.consultarPorHistoria(idHistoriaClinica);
  }

  static update(idHistoriaClinica, data) {
    return SeguimientoDelTratamiento.actualizarPorHistoria(
      idHistoriaClinica,
      data
    );
  }
}

export {
  AntecedentePersonal,
  AntecedenteMedico,
  AntecedenteFamiliar,
  AntecedenteCumplimiento,
};
