import pool from '../../../db/db.js';

class DomainError extends Error {
  constructor(message) {
    super(message);
    this.name = 'DomainError';
  }
}

class IdHistoriaValueObject {
  constructor(value) {
    if (typeof value !== 'string' || value.trim().length === 0) {
      throw new DomainError('La historia clínica debe ser un UUID válido');
    }

    const normalizedValue = value.trim().toLowerCase();
    const uuidPattern =
      /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    if (!uuidPattern.test(normalizedValue)) {
      throw new DomainError('La historia clínica debe ser un UUID válido');
    }

    this.value = normalizedValue;
    Object.freeze(this);
  }
}

class TextoClinicoValueObject {
  constructor(value, message) {
    if (value === null || value === undefined || value === '') {
      throw new DomainError(message);
    }

    const normalizedValue = String(value).trim();
    if (normalizedValue.length === 0) {
      throw new DomainError(message);
    }

    this.value = normalizedValue;
    Object.freeze(this);
  }
}

class EnfermedadActualAggregate {
  constructor({
    id_historia,
    sintoma_principal,
    tiempo_enfermedad = null,
    forma_inicio = null,
    curso = null,
    relato = null,
    tratamiento_prev = null,
  } = {}) {
    this._idHistoria = new IdHistoriaValueObject(id_historia);
    this._sintomaPrincipal = new TextoClinicoValueObject(
      sintoma_principal,
      'El síntoma principal es obligatorio'
    );
    this._tiempoEnfermedad = this._normalizePrimitive(tiempo_enfermedad);
    this._formaInicio = this._normalizePrimitive(forma_inicio);
    this._curso = this._normalizePrimitive(curso);
    this._relato = this._normalizePrimitive(relato);
    this._tratamientoPrev = this._normalizePrimitive(tratamiento_prev);

    Object.freeze(this);
  }

  _normalizePrimitive(value) {
    if (value === null || value === undefined || value === '') {
      return null;
    }

    return String(value).trim();
  }

  obtenerParametros() {
    return [
      this._idHistoria.value,
      this._sintomaPrincipal.value,
      this._tiempoEnfermedad,
      this._formaInicio,
      this._curso,
      this._relato,
      this._tratamientoPrev,
    ];
  }

  get idHistoria() {
    return this._idHistoria.value;
  }
}

class EnfermedadActualRepository {
  _asegurarAgregado(dataOrAggregate) {
    if (dataOrAggregate instanceof EnfermedadActualAggregate) {
      return dataOrAggregate;
    }

    if (
      dataOrAggregate &&
      typeof dataOrAggregate === 'object' &&
      typeof dataOrAggregate.obtenerParametros === 'function'
    ) {
      return dataOrAggregate;
    }

    return new EnfermedadActualAggregate(dataOrAggregate);
  }

  async registrar(data) {
    try {
      const agregado = this._asegurarAgregado(data);
      const query = 'CALL i_enfermedad_actual($1,$2,$3,$4,$5,$6,$7)';
      await pool.query(query, agregado.obtenerParametros());
      return { success: true, id_historia: agregado.idHistoria };
    } catch (error) {
      if (error instanceof DomainError || error.name === 'DomainError') {
        throw error;
      }
      return null;
    }
  }

  async consultarPorHistoria(id_historia) {
    try {
      const identificador = new IdHistoriaValueObject(id_historia);
      const query = 'SELECT * FROM enfermedad_actual WHERE id_historia = $1';
      const result = await pool.query(query, [identificador.value]);
      if (result.rows.length === 0) {
        return null;
      }
      return result.rows[0];
    } catch (error) {
      if (error instanceof DomainError || error.name === 'DomainError') {
        throw error;
      }
      return null;
    }
  }

  async actualizarPorHistoria(id_historia, data) {
    try {
      const identificador = new IdHistoriaValueObject(id_historia);
      const agregado =
        data instanceof EnfermedadActualAggregate
          ? data
          : new EnfermedadActualAggregate({
              ...data,
              id_historia: identificador.value,
            });
      const query = 'CALL u_enfermedad_actual($1,$2,$3,$4,$5,$6,$7)';
      await pool.query(query, agregado.obtenerParametros());
      return { success: true, id_historia: agregado.idHistoria };
    } catch (error) {
      if (error instanceof DomainError || error.name === 'DomainError') {
        throw error;
      }
      return null;
    }
  }
}

class EnfermedadActual {
  static async registrar(data) {
    return new EnfermedadActualRepository().registrar(data);
  }

  static async consultarPorHistoria(id_historia) {
    return new EnfermedadActualRepository().consultarPorHistoria(id_historia);
  }

  static async actualizarPorHistoria(id_historia, data) {
    return new EnfermedadActualRepository().actualizarPorHistoria(
      id_historia,
      data
    );
  }

  static async create(data) {
    return this.registrar(data);
  }

  static async getByHistoria(id_historia) {
    return this.consultarPorHistoria(id_historia);
  }

  static async update(id_historia, data) {
    return this.actualizarPorHistoria(id_historia, data);
  }
}

export {
  DomainError,
  IdHistoriaValueObject,
  TextoClinicoValueObject,
  EnfermedadActualAggregate,
  EnfermedadActualRepository,
};

export default EnfermedadActual;
