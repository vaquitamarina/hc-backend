import pool from '../../db/db.js';

// Value Object
class IdUuidValueObject {
  constructor(value) {
    if (typeof value !== 'string' || value.length !== 36) {
      throw new Error('ID de estudiante inválido. Debe ser un UUID válido.');
    }
    this.value = value;
    Object.freeze(this);
  }
}

class StudentAggregate {
  constructor({ idStudentVO }) {
    this._idStudent = idStudentVO;
    Object.freeze(this);
  }

  obtenerParametros() {
    return [this._idStudent.value];
  }
}

const StudentRepository = {
  async obtenerPacientesAdultosPorEstudiante(aggregate) {
    try {
      const query = 'SELECT * FROM fn_obtener_pacientes_adultos($1)';
      const { rows } = await pool.query(query, aggregate.obtenerParametros());
      return rows || [];
    } catch (error) {
      throw new Error(error.message || 'Error al obtener pacientes adultos');
    }
  },
};

export class StudentModel {
  static async consultarPacientesAdultosPorEstudiante(studentId) {
    const idVO = new IdUuidValueObject(studentId);
    const agg = new StudentAggregate({ idStudentVO: idVO });
    return StudentRepository.obtenerPacientesAdultosPorEstudiante(agg);
  }

  static async getAdultPatientsByStudentId(studentId) {
    return this.consultarPacientesAdultosPorEstudiante(studentId);
  }
}

export { IdUuidValueObject, StudentAggregate };
