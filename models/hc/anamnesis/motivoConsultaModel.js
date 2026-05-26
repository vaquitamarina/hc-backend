import pool from '../../../db/db.js';

class DomainError extends Error {}

const UUID_REGEX =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

class IdHistoriaValueObject {
  constructor(value) {
    if (typeof value !== 'string' || !UUID_REGEX.test(value)) {
      throw new DomainError('id_historia debe ser un UUID válido');
    }
    this.value = value;
    Object.freeze(this);
  }
}

class MotivoValueObject {
  constructor(value) {
    if (typeof value !== 'string') {
      throw new DomainError('motivo debe ser una cadena de texto');
    }
    const trimmed = value.trim();
    if (trimmed.length === 0) {
      throw new DomainError('motivo no puede estar vacío');
    }
    this.value = trimmed;
    Object.freeze(this);
  }
}

class MotivoConsultaAggregate {
  constructor({ idHistoriaVO, motivoVO }) {
    this._idHistoria = idHistoriaVO;
    this._motivo = motivoVO;
    Object.freeze(this);
  }

  obtenerParametros() {
    return [this._idHistoria.value, this._motivo.value];
  }
}

const MotivoConsultaRepository = {
  async registrar(aggregate) {
    try {
      const query = `CALL i_motivo_consulta($1, $2)`;
      const values = aggregate.obtenerParametros();
      await pool.query(query, values);
      return true;
    } catch (error) {
      throw new Error(error.message || 'Error al crear motivo de consulta');
    }
  },

  async consultarPorId(id_motivo) {
    try {
      const query = `SELECT * FROM motivo_consulta WHERE id_motivo = $1`;
      const { rows } = await pool.query(query, [id_motivo]);
      if (rows.length === 0) {
        return null;
      }
      return rows[0];
    } catch {
      return null;
    }
  },

  async consultarPorHistoria(id_historia) {
    try {
      const query = `SELECT * FROM motivo_consulta WHERE id_historia = $1`;
      const { rows } = await pool.query(query, [id_historia]);
      if (rows.length === 0) {
        return null;
      }
      return rows[0];
    } catch {
      return null;
    }
  },

  async actualizarPorHistoria(id_historia, motivo) {
    try {
      const query = `CALL u_motivo_consulta($1, $2)`;
      const values = [id_historia, motivo];
      await pool.query(query, values);
      return true;
    } catch (error) {
      throw new Error(
        error.message || 'Error al actualizar motivo de consulta'
      );
    }
  },
};

const MotivoConsulta = {
  async create({ id_historia, motivo }) {
    const idVO = new IdHistoriaValueObject(id_historia);
    const motivoVO = new MotivoValueObject(motivo);
    const agg = new MotivoConsultaAggregate({ idHistoriaVO: idVO, motivoVO });
    return MotivoConsultaRepository.registrar(agg);
  },

  async getById(id_motivo) {
    return MotivoConsultaRepository.consultarPorId(id_motivo);
  },

  async getByHistoria(id_historia) {
    const idVO = new IdHistoriaValueObject(id_historia);
    return MotivoConsultaRepository.consultarPorHistoria(idVO.value);
  },

  async update(id_historia, { motivo }) {
    const idVO = new IdHistoriaValueObject(id_historia);
    const motivoVO = new MotivoValueObject(motivo);
    return MotivoConsultaRepository.actualizarPorHistoria(
      idVO.value,
      motivoVO.value
    );
  },
};

export { DomainError };
export default MotivoConsulta;
