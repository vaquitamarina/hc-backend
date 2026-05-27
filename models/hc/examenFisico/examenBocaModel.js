import pool from '../../../db/db.js';

export async function consultarExamenBoca(idHistory) {
  try {
    const result = await pool.query(
      'SELECT * FROM examen_clinico_boca WHERE id_historia = $1',
      [idHistory]
    );

    const data = result.rows[0];
    if (!data) {
      return null;
    }

    return {
      labiosSin: data.labios_sin_lesiones,
      labiosCon: data.labios_con_lesiones,
      vestibuloSin: data.vestibulo_sin_lesiones,
      vestibuloCon: data.vestibulo_con_lesiones,
      carrillosSin: data.carrillos_retromolar_sin_lesiones,
      carrillosCon: data.carrillos_retromolar_con_lesiones,
      paladarSin: data.paladar_sin_lesiones,
      paladarCon: data.paladar_con_lesiones,
      orofaringeSin: data.orofaringe_sin_lesiones,
      orofaringeCon: data.orofaringe_con_lesiones,
      pisoBocaSin: data.piso_boca_sin_lesiones,
      pisoBocaCon: data.piso_boca_con_lesiones,
      lenguaSin: data.lengua_sin_lesiones,
      lenguaCon: data.lengua_con_lesiones,
      enciaSin: data.encia_sin_lesiones,
      enciaCon: data.encia_con_lesiones,

      oclusionMolarDer: data.oclusion_molar_der,
      oclusionMolarIzq: data.oclusion_molar_izq,
      oclusionCaninaDer: data.oclusion_canina_der,
      oclusionCaninaIzq: data.oclusion_canina_izq,

      oclusionMordidaCruzada: data.oclusion_mordida_cruzada,
      oclusionVestibuloclusion: data.oclusion_vestibuloclusion,

      oclusionOverbite: data.oclusion_overbite,
      oclusionMordidaAbierta: data.oclusion_mordida_abierta,
      oclusionSobremordida: data.oclusion_sobremordida,
      oclusionVerticalOtros: data.oclusion_relacion_vertical_otros,

      oclusionOverjet: data.oclusion_overjet,
      oclusionProtrusion: data.oclusion_protrusion,
      oclusionGuiaIncisiva: data.oclusion_guia_incisiva,
      oclusionContactoPosterior: data.oclusion_contacto_posterior,

      latDerGuiaCanina: data.lat_der_guia_canina,
      latDerFuncionGrupo: data.lat_der_funcion_grupo,
      latDerContactoBalance: data.lat_der_contacto_balance,
      latDerDescriba: data.lat_der_describa,

      latIzqGuiaCanina: data.lat_izq_guia_canina,
      latIzqFuncionGrupo: data.lat_izq_funcion_grupo,
      latIzqContactoBalance: data.lat_izq_contacto_balance,
      latIzqDescriba: data.lat_izq_describa,
    };
  } catch (error) {
    // console.error('Error al obtener examen boca:', error.message);
    throw error;
  }
}

export async function actualizarExamenBoca(data) {
  try {
    await pool.query(
      `CALL u_examen_clinico_boca(
          $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, 
          $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, 
          $21, $22, $23, $24, $25, $26, $27, $28, $29, $30, 
          $31, $32, $33, $34, $35, $36, $37, $38, $39
        )`,
      [
        data.idHistory,
        data.labiosSin || null,
        data.labiosCon || null,
        data.vestibuloSin || null,
        data.vestibuloCon || null,
        data.carrillosSin || null,
        data.carrillosCon || null,
        data.paladarSin || null,
        data.paladarCon || null,
        data.orofaringeSin || null,
        data.orofaringeCon || null,
        data.pisoBocaSin || null,
        data.pisoBocaCon || null,
        data.lenguaSin || null,
        data.lenguaCon || null,
        data.enciaSin || null,
        data.enciaCon || null,
        data.oclusionMolarDer || null,
        data.oclusionMolarIzq || null,
        data.oclusionCaninaDer || null,
        data.oclusionCaninaIzq || null,
        data.oclusionMordidaCruzada || null,
        data.oclusionVestibuloclusion ?? null,
        data.oclusionOverbite || null,
        data.oclusionMordidaAbierta || null,
        data.oclusionSobremordida ?? null,
        data.oclusionVerticalOtros || null,
        data.oclusionOverjet || null,
        data.oclusionProtrusion ?? null,
        data.oclusionGuiaIncisiva || null,
        data.oclusionContactoPosterior || null,
        data.latDerGuiaCanina ?? null,
        data.latDerFuncionGrupo ?? null,
        data.latDerContactoBalance ?? null,
        data.latDerDescriba || null,
        data.latIzqGuiaCanina ?? null,
        data.latIzqFuncionGrupo ?? null,
        data.latIzqContactoBalance ?? null,
        data.latIzqDescriba || null,
      ]
    );
    return true;
  } catch (error) {
    // console.error('Error al actualizar examen boca:', error.message);
    throw error;
  }
}
