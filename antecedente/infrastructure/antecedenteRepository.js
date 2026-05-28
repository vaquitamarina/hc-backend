import pool from '../../db/db.js';

/**
 * Repositorio de antecedentes (Adaptador Secundario) para PostgreSQL.
 */
export class AntecedenteRepository {
  async createAntecedentePersonal(agregado) {
    await pool.query(
      'CALL i_antecedente_personal($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,$21,$22,$23,$24,$25,$26,$27,$28,$29,$30,$31,$32)',
      agregado.obtenerParametros()
    );
    return true;
  }

  async getAntecedentePersonalByHistoria(idHistoria) {
    const { rows } = await pool.query(
      'SELECT * FROM antecedente_personal WHERE id_historia = $1',
      [idHistoria]
    );
    return rows[0];
  }

  async updateAntecedentePersonal(agregado) {
    await pool.query(
      'CALL u_antecedente_personal($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,$21,$22,$23,$24,$25,$26,$27,$28,$29,$30,$31,$32)',
      agregado.obtenerParametros()
    );
    return true;
  }

  async createAntecedenteMedico(agregado) {
    await pool.query(
      'CALL i_antecedente_medico($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,$21,$22,$23,$24)',
      agregado.obtenerParametros()
    );
    return true;
  }

  async getAntecedenteMedicoByHistoria(idHistoria) {
    const { rows } = await pool.query(
      'SELECT * FROM antecedente_medico WHERE id_historia = $1',
      [idHistoria]
    );
    return rows[0];
  }

  async updateAntecedenteMedico(agregado) {
    await pool.query(
      'CALL u_antecedente_medico($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,$21,$22,$23,$24)',
      agregado.obtenerParametros()
    );
    return true;
  }

  async createAntecedenteFamiliar(agregado) {
    await pool.query(
      'CALL i_antecedente_familiar($1,$2)',
      agregado.obtenerParametros()
    );
    return true;
  }

  async getAntecedenteFamiliarByHistoria(idHistoria) {
    const { rows } = await pool.query(
      'SELECT * FROM antecedente_familiar WHERE id_historia = $1',
      [idHistoria]
    );
    return rows[0];
  }

  async updateAntecedenteFamiliar(agregado) {
    await pool.query(
      'CALL u_antecedente_familiar($1,$2)',
      agregado.obtenerParametros()
    );
    return true;
  }

  async createAntecedenteCumplimiento(agregado) {
    await pool.query(
      'CALL i_antecedente_cumplimiento($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13)',
      agregado.obtenerParametros()
    );
    return true;
  }

  async getAntecedenteCumplimientoByHistoria(idHistoria) {
    const { rows } = await pool.query(
      'SELECT * FROM antecedente_cumplimiento WHERE id_historia = $1',
      [idHistoria]
    );
    return rows[0];
  }

  async updateAntecedenteCumplimiento(agregado) {
    await pool.query(
      'CALL u_antecedente_cumplimiento($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13)',
      agregado.obtenerParametros()
    );
    return true;
  }
}

const antecedenteRepository = new AntecedenteRepository();

export default antecedenteRepository;
