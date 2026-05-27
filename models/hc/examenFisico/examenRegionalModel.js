import pool from '../../../db/db.js';

export async function registrarExamenFisicoRegional(data) {
  try {
    const keys = Object.keys(data);
    const values = Object.values(data);
    const fields = keys.join(', ');
    const params = keys.map((_, i) => `$${i + 1}`).join(', ');
    const query = `INSERT INTO examen_regional (${fields}) VALUES (${params}) RETURNING *`;
    const { rows } = await pool.query(query, values);
    if (rows.length === 0) {
      return null;
    }
    return rows[0];
  } catch (error) {
    // console.error('Error al crear examen regional');
    throw error;
  }
}

export async function consultarExamenFisicoRegional(idHistory) {
  try {
    const result = await pool.query(
      'SELECT * FROM examen_regional WHERE id_historia = $1',
      [idHistory]
    );

    const data = result.rows[0];
    if (!data) {
      return null;
    }

    return {
      cabezaPosicion: data.cabeza_posicion,
      cabezaMovimientos: data.cabeza_movimientos,
      cabezaMovimientosObs: data.cabeza_movimientos_obs,
      craneoTamano: data.craneo_tamano,
      craneoForma: data.craneo_forma,
      caraFormaFrente: data.cara_forma_frente,
      caraFormaPerfil: data.cara_forma_perfil,

      ojosCejasAdecuada: data.ojos_cejas_adecuada,
      ojosImplantacionObs: data.ojos_implantacion_obs,
      ojosEscleroticas: data.ojos_escleroticas,
      ojosAgudezaVisual: data.ojos_agudeza_visual,
      ojosIrisColor: data.ojos_iris_color,
      ojosArcoSenil: data.ojos_arco_senil,

      narizForma: data.nariz_forma,
      narizPermeables: data.nariz_permeables,
      narizSecreciones: data.nariz_secreciones,
      narizSenosDolorosos: data.nariz_senos_dolorosos,

      oidosAnomaliasMorfologicas: data.oidos_anomalias_morfologicas,
      oidosAnomaliasObs: data.oidos_anomalias_obs,
      oidosSecreciones: data.oidos_secreciones,
      oidosAudicionConservada: data.oidos_audicion_conservada,

      atmTrayectoria: data.atm_trayectoria,

      atmLatIzqDolor: data.atm_lat_izq_dolor,
      atmLatIzqRuido: data.atm_lat_izq_ruido,
      atmLatIzqSalto: data.atm_lat_izq_salto,

      atmLatDerDolor: data.atm_lat_der_dolor,
      atmLatDerRuido: data.atm_lat_der_ruido,
      atmLatDerSalto: data.atm_lat_der_salto,

      atmProtDolor: data.atm_prot_dolor,
      atmProtRuido: data.atm_prot_ruido,
      atmProtSalto: data.atm_prot_salto,

      atmAperDolor: data.atm_aper_dolor,
      atmAperRuido: data.atm_aper_ruido,
      atmAperSalto: data.atm_aper_salto,

      atmCierreDolor: data.atm_cierre_dolor,
      atmCierreRuido: data.atm_cierre_ruido,
      atmCierreSalto: data.atm_cierre_salto,

      atmCoordinacionCondilar: data.atm_coordinacion_condilar,
      atmAperturaMaximaMm: data.atm_apertura_maxima_mm,
      atmObservaciones: data.atm_observaciones,
      atmMusculosDolor: data.atm_musculos_dolor,
      atmMusculosDolorGrado: data.atm_musculos_dolor_grado,
      atmMusculosDolorZona: data.atm_musculos_dolor_zona,

      cuelloSimetrico: data.cuello_simetrico,
      cuelloSimetricoObs: data.cuello_simetrico_obs,
      cuelloMovilidadConservada: data.cuello_movilidad_conservada,
      cuelloMovilidadObs: data.cuello_movilidad_obs,
      laringeAlineada: data.laringe_alineada,
      laringeAlineadaObs: data.laringe_alineada_obs,
      cuelloOtros: data.cuello_otros,
    };
  } catch (error) {
    // console.error('Error al obtener examen regional:', error.message);
    throw error;
  }
}

export async function actualizarExamenFisicoRegional(data) {
  try {
    await pool.query(
      `CALL u_examen_regional(
          $1, 
          $2, $3, $4, $5, $6, $7, $8, 
          $9, $10, $11, $12, $13, $14, 
          $15, $16, $17, $18, 
          $19, $20, $21, $22, 
          $23, 
          $24, $25, $26, $27, $28, $29, $30, $31, $32, $33, $34, $35, $36, $37, $38, 
          $39, $40, $41, $42, $43, $44, 
          $45, $46, $47, $48, $49, $50, $51
        )`,
      [
        data.idHistory,
        data.cabezaPosicion || null,
        data.cabezaMovimientos || null,
        data.cabezaMovimientosObs || null,
        data.craneoTamano || null,
        data.craneoForma || null,
        data.caraFormaFrente || null,
        data.caraFormaPerfil || null,
        data.ojosCejasAdecuada ?? null,
        data.ojosImplantacionObs || null,
        data.ojosEscleroticas || null,
        data.ojosAgudezaVisual ?? null,
        data.ojosIrisColor || null,
        data.ojosArcoSenil ?? null,
        data.narizForma || null,
        data.narizPermeables ?? null,
        data.narizSecreciones ?? null,
        data.narizSenosDolorosos ?? null,
        data.oidosAnomaliasMorfologicas ?? null,
        data.oidosAnomaliasObs || null,
        data.oidosSecreciones ?? null,
        data.oidosAudicionConservada ?? null,
        data.atmTrayectoria || null,
        data.atmLatIzqDolor ?? null,
        data.atmLatIzqRuido ?? null,
        data.atmLatIzqSalto ?? null,
        data.atmLatDerDolor ?? null,
        data.atmLatDerRuido ?? null,
        data.atmLatDerSalto ?? null,
        data.atmProtDolor ?? null,
        data.atmProtRuido ?? null,
        data.atmProtSalto ?? null,
        data.atmAperDolor ?? null,
        data.atmAperRuido ?? null,
        data.atmAperSalto ?? null,
        data.atmCierreDolor ?? null,
        data.atmCierreRuido ?? null,
        data.atmCierreSalto ?? null,
        data.atmCoordinacionCondilar ?? null,
        data.atmAperturaMaximaMm || null,
        data.atmObservaciones || null,
        data.atmMusculosDolor ?? null,
        data.atmMusculosDolorGrado || null,
        data.atmMusculosDolorZona || null,
        data.cuelloSimetrico ?? null,
        data.cuelloSimetricoObs || null,
        data.cuelloMovilidadConservada ?? null,
        data.cuelloMovilidadObs || null,
        data.laringeAlineada ?? null,
        data.laringeAlineadaObs || null,
        data.cuelloOtros || null,
      ]
    );
    return true;
  } catch (error) {
    // console.error('Error al actualizar examen regional:', error.message);
    throw error;
  }
}
