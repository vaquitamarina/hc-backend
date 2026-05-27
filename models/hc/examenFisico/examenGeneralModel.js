import pool from '../../../db/db.js';

export async function registrarExamenFisicoGeneral(data) {
  try {
    const keys = Object.keys(data);
    const values = Object.values(data);
    const fields = keys.join(', ');
    const params = keys.map((_, i) => `$${i + 1}`).join(', ');
    const query = `INSERT INTO examen_general (${fields}) VALUES (${params}) RETURNING *`;
    const { rows } = await pool.query(query, values);
    if (rows.length === 0) {
      return null;
    }
    return rows[0];
  } catch (error) {
    // console.error('Error al crear examen general');
    throw error;
  }
}

export async function consultarExamenFisicoGeneral(idHistory) {
  try {
    const result = await pool.query(
      'SELECT * FROM examen_general WHERE id_historia = $1',
      [idHistory]
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
  } catch (error) {
    // console.error('Error al obtener examen general:', error.message);
    throw error;
  }
}

export async function actualizarExamenFisicoGeneral(examData) {
  const {
    idHistory,
    posicion,
    actitud,
    deambulacion,
    facies,
    faciesObs,
    conciencia,
    constitucion,
    estadoNutritivo,
    temperatura,
    presionArterial,
    frecuenciaRespiratoria,
    pulso,
    peso,
    talla,
    pielColor,
    pielHumedad,
    pielLesiones,
    pielLesionesObs,
    pielAnexos,
    pielAnexosObs,
    tcsDistribucion,
    tcsDistribucionObs,
    tcsCantidad,
    ganglios,
    gangliosObs,
  } = examData;

  try {
    await pool.query(
      `CALL u_examen_general(
          $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, 
          $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, 
          $21, $22, $23, $24, $25, $26
        )`,
      [
        idHistory,
        posicion || null,
        actitud || null,
        deambulacion || null,
        facies || null,
        faciesObs || null,
        conciencia || null,
        constitucion || null,
        estadoNutritivo || null,
        temperatura || null,
        presionArterial || null,
        frecuenciaRespiratoria || null,
        pulso || null,
        peso || null,
        talla || null,
        pielColor || null,
        pielHumedad || null,
        pielLesiones || null,
        pielLesionesObs || null,
        pielAnexos || null,
        pielAnexosObs || null,
        tcsDistribucion || null,
        tcsDistribucionObs || null,
        tcsCantidad || null,
        ganglios || null,
        gangliosObs || null,
      ]
    );
    return true;
  } catch (error) {
    // console.error('Error al actualizar examen general:', error.message);
    throw error;
  }
}
