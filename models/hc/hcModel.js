import pool from '../../db/db.js';

export class HcModel {
  static async createReview(reviewData) {
    const { idHistory, idTeacher, state, observations } = reviewData;
    try {
      await pool.query('CALL i_revision_historia($1, $2, $3, $4)', [
        idHistory,
        idTeacher,
        state,
        observations,
      ]);
      return true;
    } catch (error) {
      console.error('Error al registrar revision de historia', error.message);
      return null;
    }
  }

  static async getFiliationByIdHistory(idHistory) {
    const result = await pool.query('SELECT * FROM fn_obtener_filiacion($1)', [
      idHistory,
    ]);
    if (result.rows.length === 0) {
      return null;
    }
    return result.rows[0];
  }

  static async registerHc(idStudent) {
    const result = await pool.query(
      'SELECT * FROM fn_crear_historia_clinica($1)',
      [idStudent]
    );
    if (result.rows.length === 0) {
      return null;
    }
    return result.rows[0];
  }

  static async createDraft(idStudent) {
    const result = await pool.query(
      'SELECT fn_obtener_o_crear_borrador($1) AS id_historia',
      [idStudent]
    );
    return { id_historia: result.rows[0].id_historia };
  }

  static async assignPatient(idHistory, idPatient) {
    await pool.query('SELECT fn_asignar_paciente_a_historia($1, $2)', [
      idHistory,
      idPatient,
    ]);
  }

  static async getPatientByHistory(idHistory) {
    const result = await pool.query(
      'SELECT * FROM fn_obtener_paciente_por_historia($1)',
      [idHistory]
    );
    if (result.rows.length === 0) {
      return null;
    }
    return result.rows[0];
  }
}
