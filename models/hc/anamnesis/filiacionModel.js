import pool from '../../../db/db.js';

class IdHistoriaValueObject {
  constructor(value) {
    if (typeof value !== 'string') {
      throw new Error('La historia clínica debe ser un UUID válido');
    }

    const normalizedValue = value.trim().toLowerCase();
    const uuidPattern =
      /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

    if (!uuidPattern.test(normalizedValue)) {
      throw new Error('La historia clínica debe ser un UUID válido');
    }

    this.value = normalizedValue;
    Object.freeze(this);
  }
}

class EdadValueObject {
  constructor(value) {
    if (value === null || value === undefined || value === '') {
      this.value = null;
      Object.freeze(this);
      return;
    }

    const parsedValue = Number(value);
    if (
      !Number.isInteger(parsedValue) ||
      parsedValue < 0 ||
      parsedValue > 130
    ) {
      throw new Error('La edad clínica debe ser un entero entre 0 y 130');
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
      throw new Error(mensajeError);
    }
    this.value = fecha.toISOString();
    Object.freeze(this);
  }
}

class FiliacionAggregate {
  constructor({
    id_historia,
    raza = null,
    fecha_nacimiento = null,
    lugar = null,
    estado_civil = null,
    nombre_conyuge = null,
    ocupacion = null,
    lugar_procedencia = null,
    tiempo_residencia_tacna = null,
    direccion = null,
    ultima_visita_dentista = null,
    motivo_visita_dentista = null,
    ultima_visita_medico = null,
    motivo_visita_medico = null,
    contacto_emergencia = null,
    telefono_emergencia = null,
    acompaniante = null,
    edad = null,
    sexo = null,
    fecha_elaboracion = null,
  } = {}) {
    this._idHistoria = new IdHistoriaValueObject(id_historia);
    this._raza = this._normalizeText(raza);
    this._fechaNacimiento = new FechaClinicaValueObject(
      fecha_nacimiento,
      'La fecha de nacimiento no tiene un formato válido'
    );
    this._lugar = this._normalizeText(lugar);
    this._estadoCivil = this._normalizeText(estado_civil);
    this._nombreConyuge = this._normalizeText(nombre_conyuge);
    this._ocupacion = this._normalizeText(ocupacion);
    this._lugarProcedencia = this._normalizeText(lugar_procedencia);
    this._tiempoResidenciaTacna = this._normalizeText(tiempo_residencia_tacna);
    this._direccion = this._normalizeText(direccion);
    this._ultimaVisitaDentista = this._normalizeText(ultima_visita_dentista);
    this._motivoVisitaDentista = this._normalizeText(motivo_visita_dentista);
    this._ultimaVisitaMedico = this._normalizeText(ultima_visita_medico);
    this._motivoVisitaMedico = this._normalizeText(motivo_visita_medico);
    this._contactoEmergencia = this._normalizeText(contacto_emergencia);
    this._telefonoEmergencia = this._normalizeText(telefono_emergencia);
    this._acompaniante = this._normalizeText(acompaniante);
    this._edad = new EdadValueObject(edad);
    this._sexo = this._normalizeSexo(sexo);
    this._fechaElaboracion = new FechaClinicaValueObject(
      fecha_elaboracion,
      'La fecha de elaboración no tiene un formato válido'
    );

    Object.freeze(this);
  }

  _normalizeText(value) {
    if (value === null || value === undefined || value === '') {
      return null;
    }
    return String(value).trim();
  }

  _normalizeSexo(value) {
    const normalizedValue = this._normalizeText(value);
    if (normalizedValue === null) {
      return null;
    }

    const allowedValues = ['M', 'F', 'Masculino', 'Femenino', 'O'];
    if (!allowedValues.includes(normalizedValue)) {
      throw new Error('El sexo clínico no tiene un valor permitido');
    }
    return normalizedValue;
  }

  obtenerParametros() {
    return [
      this._idHistoria.value,
      this._raza,
      this._fechaNacimiento.value,
      this._lugar,
      this._estadoCivil,
      this._nombreConyuge,
      this._ocupacion,
      this._lugarProcedencia,
      this._tiempoResidenciaTacna,
      this._direccion,
      this._ultimaVisitaDentista,
      this._motivoVisitaDentista,
      this._ultimaVisitaMedico,
      this._motivoVisitaMedico,
      this._contactoEmergencia,
      this._telefonoEmergencia,
      this._acompaniante,
      this._edad.value,
      this._sexo,
      this._fechaElaboracion.value,
    ];
  }

  get idHistoria() {
    return this._idHistoria.value;
  }
}

class FiliacionRepository {
  _asegurarAgregado(dataOrAggregate, maybeData = {}) {
    if (dataOrAggregate instanceof FiliacionAggregate) {
      return dataOrAggregate;
    }

    if (
      dataOrAggregate &&
      typeof dataOrAggregate === 'object' &&
      typeof dataOrAggregate.obtenerParametros === 'function'
    ) {
      return dataOrAggregate;
    }

    if (
      typeof dataOrAggregate === 'object' &&
      dataOrAggregate !== null &&
      Object.keys(maybeData).length === 0
    ) {
      return new FiliacionAggregate(dataOrAggregate);
    }

    return new FiliacionAggregate({
      id_historia: dataOrAggregate,
      ...maybeData,
    });
  }

  async registrar(aggregate) {
    const query = `CALL i_filiacion($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20)`;
    const values = aggregate.obtenerParametros();
    await pool.query(query, values);
    return { success: true, id_historia: aggregate.idHistoria };
  }

  async consultarPorId(id_filiacion) {
    const query = `SELECT * FROM filiacion WHERE id_filiacion = $1`;
    const { rows } = await pool.query(query, [id_filiacion]);
    return rows[0];
  }

  async consultarPorHistoria(id_historia) {
    const query = `SELECT * FROM filiacion WHERE id_historia = $1`;
    const { rows } = await pool.query(query, [id_historia]);
    return rows[0];
  }

  async actualizarPorHistoria(aggregate) {
    const query = `CALL u_filiacion($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20)`;
    const values = aggregate.obtenerParametros();
    await pool.query(query, values);
    return { success: true, id_historia: aggregate.idHistoria };
  }

  async create(aggregate) {
    return this.registrar(this._asegurarAgregado(aggregate));
  }

  async getById(id_filiacion) {
    return this.consultarPorId(id_filiacion);
  }

  async getByHistoria(id_historia) {
    return this.consultarPorHistoria(id_historia);
  }

  async update(aggregateOrId, maybeData) {
    return this.actualizarPorHistoria(
      this._asegurarAgregado(aggregateOrId, maybeData)
    );
  }
}

const filiacionRepository = new FiliacionRepository();

export {
  FiliacionAggregate,
  IdHistoriaValueObject,
  EdadValueObject,
  FechaClinicaValueObject,
  FiliacionRepository,
};

export default filiacionRepository;
