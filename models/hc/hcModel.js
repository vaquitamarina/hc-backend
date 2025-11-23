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

  static async updateFiliation(filiationData) {
    const {
      idHistory,
      raza,
      fechaNacimiento,
      lugar,
      estadoCivil,
      nombreConyuge,
      ocupacion,
      lugarProcedencia,
      tiempoResidencia,
      direccion,
      gradoInstruccion,
      ultimaVisitaDentista,
      motivoVisitaDentista,
      ultimaVisitaMedico,
      motivoVisitaMedico,
      contactoEmergencia,
      telefonoEmergencia,
      acompaniante,
    } = filiationData;

    try {
      await pool.query(
        `CALL u_filiacion($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18)`,
        [
          idHistory,
          raza,
          fechaNacimiento,
          lugar,
          estadoCivil,
          nombreConyuge,
          ocupacion,
          lugarProcedencia,
          tiempoResidencia,
          direccion,
          gradoInstruccion,
          ultimaVisitaDentista,
          motivoVisitaDentista,
          ultimaVisitaMedico,
          motivoVisitaMedico,
          contactoEmergencia,
          telefonoEmergencia,
          acompaniante,
        ]
      );
      return true;
    } catch (error) {
      console.error('Error al actualizar filiacion:', error.message);
      throw error;
    }
  }

  // --- MÉTODOS PARA EXAMEN GENERAL ---

  static async getGeneralExam(idHistory) {
    try {
      // Hacemos un SELECT directo a la tabla
      const result = await pool.query(
        'SELECT * FROM examen_general WHERE id_historia = $1',
        [idHistory]
      );

      const data = result.rows[0];
      if (!data) {
        return null;
      }

      // Convertimos de snake_case (BD) a camelCase (Frontend)
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
      console.error('Error al obtener examen general:', error.message);
      throw error;
    }
  }

  static async updateGeneralExam(examData) {
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
      console.error('Error al actualizar examen general:', error.message);
      throw error;
    }
  }

  // --- MÉTODOS PARA EXAMEN REGIONAL (CABEZA, CUELLO, ATM) ---

  static async getRegionalExam(idHistory) {
    try {
      const result = await pool.query(
        'SELECT * FROM examen_regional WHERE id_historia = $1',
        [idHistory]
      );

      const data = result.rows[0];
      if (!data) {
        return null;
      }

      // Mapeamos de la BD (snake_case) al Frontend (camelCase)
      return {
        // Cabeza
        cabezaPosicion: data.cabeza_posicion,
        cabezaMovimientos: data.cabeza_movimientos,
        cabezaMovimientosObs: data.cabeza_movimientos_obs,
        craneoTamano: data.craneo_tamano,
        craneoForma: data.craneo_forma,
        caraFormaFrente: data.cara_forma_frente,
        caraFormaPerfil: data.cara_forma_perfil,

        // Ojos
        ojosCejasAdecuada: data.ojos_cejas_adecuada,
        ojosImplantacionObs: data.ojos_implantacion_obs,
        ojosEscleroticas: data.ojos_escleroticas,
        ojosAgudezaVisual: data.ojos_agudeza_visual,
        ojosIrisColor: data.ojos_iris_color,
        ojosArcoSenil: data.ojos_arco_senil,

        // Nariz
        narizForma: data.nariz_forma,
        narizPermeables: data.nariz_permeables,
        narizSecreciones: data.nariz_secreciones,
        narizSenosDolorosos: data.nariz_senos_dolorosos,

        // Oídos
        oidosAnomaliasMorfologicas: data.oidos_anomalias_morfologicas,
        oidosAnomaliasObs: data.oidos_anomalias_obs,
        oidosSecreciones: data.oidos_secreciones,
        oidosAudicionConservada: data.oidos_audicion_conservada,

        // ATM - Trayectoria
        atmTrayectoria: data.atm_trayectoria,

        // ATM - Movimientos (Aplanado)
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

        // ATM - Detalles y Músculos
        atmCoordinacionCondilar: data.atm_coordinacion_condilar,
        atmAperturaMaximaMm: data.atm_apertura_maxima_mm,
        atmObservaciones: data.atm_observaciones,
        atmMusculosDolor: data.atm_musculos_dolor,
        atmMusculosDolorGrado: data.atm_musculos_dolor_grado,
        atmMusculosDolorZona: data.atm_musculos_dolor_zona,

        // Cuello
        cuelloSimetrico: data.cuello_simetrico,
        cuelloSimetricoObs: data.cuello_simetrico_obs,
        cuelloMovilidadConservada: data.cuello_movilidad_conservada,
        cuelloMovilidadObs: data.cuello_movilidad_obs,
        laringeAlineada: data.laringe_alineada,
        laringeAlineadaObs: data.laringe_alineada_obs,
        cuelloOtros: data.cuello_otros,
      };
    } catch (error) {
      console.error('Error al obtener examen regional:', error.message);
      throw error;
    }
  }

  static async updateRegionalExam(data) {
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
          // Cabeza (7)
          data.cabezaPosicion || null,
          data.cabezaMovimientos || null,
          data.cabezaMovimientosObs || null,
          data.craneoTamano || null,
          data.craneoForma || null,
          data.caraFormaFrente || null,
          data.caraFormaPerfil || null,
          // Ojos (6)
          data.ojosCejasAdecuada ?? null,
          data.ojosImplantacionObs || null,
          data.ojosEscleroticas || null,
          data.ojosAgudezaVisual ?? null,
          data.ojosIrisColor || null,
          data.ojosArcoSenil ?? null,
          // Nariz (4)
          data.narizForma || null,
          data.narizPermeables ?? null,
          data.narizSecreciones ?? null,
          data.narizSenosDolorosos ?? null,
          // Oídos (4)
          data.oidosAnomaliasMorfologicas ?? null,
          data.oidosAnomaliasObs || null,
          data.oidosSecreciones ?? null,
          data.oidosAudicionConservada ?? null,
          // ATM (22)
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
          // Cuello (7)
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
      console.error('Error al actualizar examen regional:', error.message);
      throw error;
    }
  }
}
