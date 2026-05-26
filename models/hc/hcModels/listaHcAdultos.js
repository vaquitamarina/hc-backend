// Rich Domain refactor for listing adult clinical histories by student
import pool from '../../../db/db.js';

class IdUuidValueObject {
  constructor(value) {
    if (typeof value !== 'string' || value.length !== 36) {
      throw new Error('ID de estudiante inválido. Debe ser un UUID válido.');
    }
    this.value = value;
    Object.freeze(this);
  }
}

class ListaHcAdultosAggregate {
  constructor({ idEstudianteVO }) {
    this._idEstudiante = idEstudianteVO;
    Object.freeze(this);
  }

  obtenerParametros() {
    return [this._idEstudiante.value];
  }
}

const ListaHcAdultosRepository = {
  async listarPorEstudiante(aggregate) {
    try {
      const query = `SELECT * FROM fn_listar_historias_clinicas_adultos_por_estudiante($1)`;
      const { rows } = await pool.query(query, aggregate.obtenerParametros());
      return rows || [];
    } catch (error) {
      throw new Error(
        error.message || 'Error al obtener historias clínicas de adultos'
      );
    }
  },
};

export async function listarHistoriasClinicasAdultasDeEstudiante(idEstudiante) {
  const idVO = new IdUuidValueObject(idEstudiante);
  const agg = new ListaHcAdultosAggregate({ idEstudianteVO: idVO });
  return ListaHcAdultosRepository.listarPorEstudiante(agg);
}

export { IdUuidValueObject, ListaHcAdultosAggregate };
