import pool from '../../db/db.js';

/**
 * Dominio: Hc (Historias clínicas)
 * Value Objects, DomainError y Aggregates. Sin SQL.
 */
const UUID_V4_REGEX =
  /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export class DomainError extends Error {
  constructor(message) {
    super(message);
    this.name = 'DomainError';
    Object.freeze(this);
  }
}

class HcAggregateBase {
  static _normalizePrimitive(value) {
    if (value === null || value === undefined) {
      return null;
    }
    if (typeof value !== 'string') {
      return value;
    }
    const text = value.trim();
    return text === '' ? null : text;
  }

  static _normalizeUuid(value, label) {
    const normalized = this._normalizePrimitive(value);
    if (typeof normalized !== 'string') {
      throw new DomainError(`${label} debe ser una cadena UUIDv4 válida`);
    }
    const cleaned = normalized.toUpperCase().startsWith('HC-')
      ? normalized.slice(3).trim()
      : normalized;
    if (!UUID_V4_REGEX.test(cleaned)) {
      throw new DomainError(`${label} debe ser un UUIDv4 válido`);
    }
    return cleaned.toLowerCase();
  }
}

export class HistoriaClinicaIdValueObject extends HcAggregateBase {
  constructor(value, label = 'id_historia') {
    super();
    this.value = HcAggregateBase._normalizeUuid(value, label);
    Object.freeze(this);
  }
}

export class UsuarioIdValueObject extends HcAggregateBase {
  constructor(value, label = 'id_usuario') {
    super();
    this.value = HcAggregateBase._normalizeUuid(value, label);
    Object.freeze(this);
  }
}

export class EstadoRevisionValueObject extends HcAggregateBase {
  constructor(value) {
    super();
    const normalized = HcAggregateBase._normalizePrimitive(value);
    if (typeof normalized !== 'string') {
      throw new DomainError('El estado de la revisión es obligatorio');
    }
    if (normalized.length > 80) {
      throw new DomainError('El estado de la revisión es demasiado largo');
    }
    this.value = normalized;
    Object.freeze(this);
  }
}

export class RevisionHistoriaClinicaAggregate extends HcAggregateBase {
  constructor(datos = {}) {
    super();
    const { idHistory, idTeacher, state, observations } = datos;
    this._idHistory = new HistoriaClinicaIdValueObject(
      idHistory,
      'id_historia'
    );
    this._idTeacher = new UsuarioIdValueObject(idTeacher, 'id_docente');
    this._state = new EstadoRevisionValueObject(state);
    this._observations = HcAggregateBase._normalizePrimitive(observations);
    Object.freeze(this);
  }

  obtenerParametros() {
    return [
      this._idHistory.value,
      this._idTeacher.value,
      this._state.value,
      this._observations,
    ];
  }
}

export class RegistroHistoriaClinicaAggregate extends HcAggregateBase {
  constructor(datos = {}) {
    super();
    const { idStudent } = datos;
    this._idStudent = new UsuarioIdValueObject(idStudent, 'id_estudiante');
    Object.freeze(this);
  }

  obtenerParametros() {
    return [this._idStudent.value];
  }
}

export class AsignacionPacienteAggregate extends HcAggregateBase {
  constructor(datos = {}) {
    super();
    const { idHistory, idPatient } = datos;
    this._idHistory = new HistoriaClinicaIdValueObject(
      idHistory,
      'id_historia'
    );
    this._idPatient = new HistoriaClinicaIdValueObject(
      idPatient,
      'id_paciente'
    );
    Object.freeze(this);
  }

  obtenerParametros() {
    return [this._idHistory.value, this._idPatient.value];
  }
}

export class ConsultaPacienteHistoriaClinicaAggregate extends HcAggregateBase {
  constructor(datos = {}) {
    super();
    const { idHistory, id, id_historia } = datos;
    this._idHistory = new HistoriaClinicaIdValueObject(
      idHistory ?? id_historia ?? id,
      'id_historia'
    );
    Object.freeze(this);
  }

  obtenerParametros() {
    return [this._idHistory.value];
  }
}

export class ConsultaHistoriasEstudianteAggregate extends HcAggregateBase {
  constructor(datos = {}) {
    super();
    const { idStudent, id } = datos;
    this._idStudent = new UsuarioIdValueObject(
      idStudent ?? id,
      'id_estudiante'
    );
    Object.freeze(this);
  }

  obtenerParametros() {
    return [this._idStudent.value];
  }
}
