import pool from '../../db/db.js';

/**
 * Repositorio de examen fisico general (Adaptador Secundario) para PostgreSQL.
 */
export class ExamenGeneralRepository {
  /**
   * @param {{ obtenerParametros: () => Array<unknown> }} agregado
   * @returns {Promise<Object|null>}
   */
  async create(agregado) {
    const query = `
      INSERT INTO examen_general (
        id_historia,
        posicion,
        actitud,
        deambulacion,
        facies,
        facies_obs,
        conciencia,
        constitucion,
        estado_nutritivo,
        temperatura,
        presion_arterial,
        frecuencia_respiratoria,
        pulso,
        peso,
        talla,
        piel_color,
        piel_humedad,
        piel_lesiones,
        piel_lesiones_obs,
        piel_anexos,
        piel_anexos_obs,
        tcs_distribucion,
        tcs_distribucion_obs,
        tcs_cantidad,
        ganglios,
        ganglios_obs
      )
      VALUES (
        $1, $2, $3, $4, $5, $6, $7, $8, $9, $10,
        $11, $12, $13, $14, $15, $16, $17, $18, $19, $20,
        $21, $22, $23, $24, $25, $26
      )
      RETURNING *
    `;

    const { rows } = await pool.query(query, agregado.obtenerParametros());
    if (rows.length === 0) {
      return null;
    }
    return rows[0];
  }

  /**
   * @param {string} idHistoria
   * @returns {Promise<Object|null>}
   */
  async getByHistoria(idHistoria) {
    const result = await pool.query(
      'SELECT * FROM examen_general WHERE id_historia = $1',
      [idHistoria]
    );

    const data = result.rows[0];
    if (!data) {
      return null;
    }

    return {
      posicion: data.posicion,
      actitud: data.actitud,
      deambulacion: data.deambulacion,
      facies: data.facies,
      faciesObs: data.facies_obs,
      conciencia: data.conciencia,
      constitucion: data.constitucion,
      estadoNutritivo: data.estado_nutritivo,
      temperatura: data.temperatura,
      presionArterial: data.presion_arterial,
      frecuenciaRespiratoria: data.frecuencia_respiratoria,
      pulso: data.pulso,
      peso: data.peso,
      talla: data.talla,
      pielColor: data.piel_color,
      pielHumedad: data.piel_humedad,
      pielLesiones: data.piel_lesiones,
      pielLesionesObs: data.piel_lesiones_obs,
      pielAnexos: data.piel_anexos,
      pielAnexosObs: data.piel_anexos_obs,
      tcsDistribucion: data.tcs_distribucion,
      tcsDistribucionObs: data.tcs_distribucion_obs,
      tcsCantidad: data.tcs_cantidad,
      ganglios: data.ganglios,
      gangliosObs: data.ganglios_obs,
    };
  }

  /**
   * @param {{ obtenerParametros: () => Array<unknown> }} agregado
   * @returns {Promise<boolean>}
   */
  async update(agregado) {
    await pool.query(
      `CALL u_examen_general(
        $1, $2, $3, $4, $5, $6, $7, $8, $9, $10,
        $11, $12, $13, $14, $15, $16, $17, $18, $19, $20,
        $21, $22, $23, $24, $25, $26
      )`,
      agregado.obtenerParametros()
    );

    return true;
  }
}

const examenGeneralRepository = new ExamenGeneralRepository();

export default examenGeneralRepository;
