/**
 * Adaptador Secundario: PatientRepository
 * Usa `pool.query` para realizar operaciones en PostgreSQL.
 */
import pool from '../../db/db.js';

class PatientRepository {
  async crearPaciente(aggregate) {
    const params = aggregate.obtenerParametrosParaCrear();
    const result = await pool.query(
      'SELECT fn_crear_paciente($1, $2, $3, $4, $5, $6, $7) AS id_paciente',
      params
    );
    return { id: result.rows[0].id_paciente };
  }

  async actualizarPaciente(id, aggregate) {
    const params = aggregate.obtenerParametrosParaActualizar();
    await pool.query('CALL u_paciente($1, $2, $3, $4, $5, $6)', [
      id,
      params[0] || null,
      params[1] || null,
      params[2] || null,
      params[3] || null,
      null,
    ]);
    return true;
  }
}

export { PatientRepository };
