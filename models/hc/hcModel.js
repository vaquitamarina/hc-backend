import pool from '../../db/db.js';

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

export class HcModel {
  static _toRevisionAggregate(reviewData) {
    return reviewData instanceof RevisionHistoriaClinicaAggregate
      ? reviewData
      : new RevisionHistoriaClinicaAggregate(reviewData);
  }

  static _toRegistroAggregate(idStudent) {
    return idStudent instanceof RegistroHistoriaClinicaAggregate
      ? idStudent
      : new RegistroHistoriaClinicaAggregate({ idStudent });
  }

  static _toAsignacionAggregate(idHistory, idPatient) {
    if (idHistory instanceof AsignacionPacienteAggregate) {
      return idHistory;
    }

    return new AsignacionPacienteAggregate({ idHistory, idPatient });
  }

  static _toConsultaPacienteAggregate(idHistory) {
    return idHistory instanceof ConsultaPacienteHistoriaClinicaAggregate
      ? idHistory
      : new ConsultaPacienteHistoriaClinicaAggregate({ idHistory });
  }

  static _toConsultaEstudianteAggregate(studentId) {
    return studentId instanceof ConsultaHistoriasEstudianteAggregate
      ? studentId
      : new ConsultaHistoriasEstudianteAggregate({ idStudent: studentId });
  }

  static async createReview(reviewData) {
    const agregado = HcModel._toRevisionAggregate(reviewData);

    try {
      await pool.query(
        'CALL i_revision_historia($1, $2, $3, $4)',
        agregado.obtenerParametros()
      );
      return true;
    } catch {
      return null;
    }
  }

  static async registerHc(idStudent) {
    const agregado = HcModel._toRegistroAggregate(idStudent);
    const result = await pool.query(
      'SELECT * FROM fn_crear_historia_clinica($1)',
      agregado.obtenerParametros()
    );

    if (result.rows.length === 0) {
      return null;
    }

    return result.rows[0];
  }

  static async getAllByStudentId(studentId) {
    const agregado = HcModel._toConsultaEstudianteAggregate(studentId);
    const result = await pool.query(
      'SELECT * FROM historia_clinica WHERE id_estudiante = $1',
      agregado.obtenerParametros()
    );
    return result.rows;
  }

  static async createDraft(idStudent) {
    const agregado = HcModel._toConsultaEstudianteAggregate(idStudent);
    const result = await pool.query(
      'SELECT fn_obtener_o_crear_borrador($1) AS id_historia',
      agregado.obtenerParametros()
    );

    return { id_historia: result.rows[0].id_historia };
  }

  static async assignPatient(idHistory, idPatient) {
    const agregado = HcModel._toAsignacionAggregate(idHistory, idPatient);
    await pool.query(
      'SELECT fn_asignar_paciente_a_historia($1, $2)',
      agregado.obtenerParametros()
    );
  }

  static _normalizeHistoryId(value) {
    return HcAggregateBase._normalizeUuid(value, 'id_historia');
  }

  static async getPatientByHistory(idHistory) {
    const agregado = HcModel._toConsultaPacienteAggregate(idHistory);
    const result = await pool.query(
      'SELECT * FROM fn_obtener_paciente_por_historia($1)',
      agregado.obtenerParametros()
    );

    if (result.rows.length === 0) {
      return null;
    }

    return result.rows[0];
  }

  static async registrarRevisionHistoriaClinica(reviewData) {
    return this.createReview(reviewData);
  }

  static async registrarHistoriaClinica(idStudent) {
    return this.registerHc(idStudent);
  }

  static async listarHistoriasClinicasPorEstudiante(studentId) {
    return this.getAllByStudentId(studentId);
  }

  static async obtenerBorradorHistoriaClinica(idStudent) {
    return this.createDraft(idStudent);
  }

  static async asignarPacienteAHistoriaClinica(idHistory, idPatient) {
    return this.assignPatient(idHistory, idPatient);
  }

  static async consultarPacientePorHistoriaClinica(idHistory) {
    return this.getPatientByHistory(idHistory);
  }
}
