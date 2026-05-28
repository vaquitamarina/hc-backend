/**
 * Adaptador Secundario: HcRepository
 * Encapsula consultas SQL usando `pool.query`.
 */
import pool from '../../db/db.js';

class HcRepository {
  async crearRevision(agregado) {
    await pool.query(
      'CALL i_revision_historia($1, $2, $3, $4)',
      agregado.obtenerParametros()
    );
    return true;
  }

  async crearHistoriaClinica(agregado) {
    const result = await pool.query(
      'SELECT * FROM fn_crear_historia_clinica($1)',
      agregado.obtenerParametros()
    );
    if (result.rows.length === 0) {
      return null;
    }
    return result.rows[0];
  }

  async listarHistoriasPorEstudiante(agregado) {
    const result = await pool.query(
      'SELECT * FROM historia_clinica WHERE id_estudiante = $1',
      agregado.obtenerParametros()
    );
    return result.rows;
  }

  async obtenerBorrador(agregado) {
    const result = await pool.query(
      'SELECT fn_obtener_o_crear_borrador($1) AS id_historia',
      agregado.obtenerParametros()
    );
    return { id_historia: result.rows[0].id_historia };
  }

  async asignarPaciente(agregado) {
    await pool.query(
      'SELECT fn_asignar_paciente_a_historia($1, $2)',
      agregado.obtenerParametros()
    );
    return true;
  }

  async obtenerPacientePorHistoria(agregado) {
    const result = await pool.query(
      'SELECT * FROM fn_obtener_paciente_por_historia($1)',
      agregado.obtenerParametros()
    );
    if (result.rows.length === 0) {
      return null;
    }
    return result.rows[0];
  }
}

export { HcRepository };
