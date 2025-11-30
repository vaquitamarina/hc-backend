import pool from '../../../db/db.js';

class AntecedentePersonal {
  static async create(data) {
    try {
      const result = await pool.query(
        `CALL i_antecedente_personal($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,$21,$22,$23)`,
        [
          data.id_historia,
          data.esta_embarazada,
          data.mac,
          data.otros,
          data.psicosocial,
          data.vacunas,
          data.hepatitis_b,
          data.grupo_sanguineo_desc,
          data.fuma,
          data.cigarrillos_dia,
          data.toma_te,
          data.tazas_te_dia,
          data.toma_alcohol,
          data.frecuencia_alcohol,
          data.aprieta_dientes,
          data.momento_aprieta,
          data.rechina,
          data.dolor_muscular,
          data.chupa_dedo,
          data.muerde_objetos,
          data.muerde_labios,
          data.otros_habitos,
          data.frecuencia_cepillado,
        ]
      );
      console.log('Antecedente personal creado exitosamente');
      return true;
    } catch (error) {
      console.error(
        'Error al crear antecedente personal:',
        error.message,
        error.detail
      );
      throw new Error(error.message || 'Error al crear antecedente personal');
    }
  }

  static async getById(id_antecedente) {
    try {
      const result = await pool.query(
        `SELECT * FROM antecedente_personal WHERE id_antecedente = $1`,
        [id_antecedente]
      );
      if (result.rows.length === 0) {
        return null;
      }
      return result.rows[0];
    } catch (error) {
      console.error('Error al obtener antecedente personal:', error.message);
      throw error;
    }
  }

  static async getByHistoria(id_historia) {
    try {
      const result = await pool.query(
        `SELECT * FROM antecedente_personal WHERE id_historia = $1`,
        [id_historia]
      );
      if (result.rows.length === 0) {
        return null;
      }
      return result.rows[0];
    } catch (error) {
      console.error(
        'Error al obtener antecedente personal por historia:',
        error.message
      );
      throw error;
    }
  }

  static async update(id_historia, data) {
    try {
      const result = await pool.query(
        `CALL u_antecedente_personal($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,$21,$22,$23)`,
        [
          id_historia,
          data.esta_embarazada,
          data.mac,
          data.otros,
          data.psicosocial,
          data.vacunas,
          data.hepatitis_b,
          data.grupo_sanguineo_desc,
          data.fuma,
          data.cigarrillos_dia,
          data.toma_te,
          data.tazas_te_dia,
          data.toma_alcohol,
          data.frecuencia_alcohol,
          data.aprieta_dientes,
          data.momento_aprieta,
          data.rechina,
          data.dolor_muscular,
          data.chupa_dedo,
          data.muerde_objetos,
          data.muerde_labios,
          data.otros_habitos,
          data.frecuencia_cepillado,
        ]
      );
      console.log('Antecedente personal actualizado exitosamente');
      return true;
    } catch (error) {
      console.error(
        'Error al actualizar antecedente personal:',
        error.message,
        error.detail
      );
      throw new Error(
        error.message || 'Error al actualizar antecedente personal'
      );
    }
  }
}

class AntecedenteMedico {
  static async create(data) {
    try {
      await pool.query(
        `CALL i_antecedente_medico($1,$2,$3,$4,$5,$6,$7,$8,$9)`,
        [
          data.id_historia,
          data.salud_general,
          data.bajo_tratamiento,
          data.tipo_tratamiento,
          data.hospitalizaciones,
          data.traumatismos,
          data.alergias,
          data.medicamentos_contraindicados,
          data.odontologicos,
        ]
      );
      return true;
    } catch (error) {
      console.error('Error al crear antecedente médico:', error.message);
      throw error;
    }
  }

  static async getByHistoria(id_historia) {
    try {
      const result = await pool.query(
        `SELECT * FROM antecedente_medico WHERE id_historia = $1`,
        [id_historia]
      );
      if (result.rows.length === 0) {
        return null;
      }
      return result.rows[0];
    } catch (error) {
      console.error('Error al obtener antecedente médico:', error.message);
      throw error;
    }
  }

  static async update(id_historia, data) {
    try {
      await pool.query(
        `CALL u_antecedente_medico($1,$2,$3,$4,$5,$6,$7,$8,$9)`,
        [
          id_historia,
          data.salud_general,
          data.bajo_tratamiento,
          data.tipo_tratamiento,
          data.hospitalizaciones,
          data.traumatismos,
          data.alergias,
          data.medicamentos_contraindicados,
          data.odontologicos,
        ]
      );
      return true;
    } catch (error) {
      console.error('Error al actualizar antecedente médico:', error.message);
      throw error;
    }
  }
}

class AntecedenteFamiliar {
  static async create(data) {
    try {
      await pool.query(`CALL i_antecedente_familiar($1,$2)`, [
        data.id_historia,
        data.descripcion,
      ]);
      return true;
    } catch (error) {
      console.error('Error al crear antecedente familiar:', error.message);
      throw error;
    }
  }

  static async getByHistoria(id_historia) {
    try {
      const result = await pool.query(
        `SELECT * FROM antecedente_familiar WHERE id_historia = $1`,
        [id_historia]
      );
      if (result.rows.length === 0) {
        return null;
      }
      return result.rows[0];
    } catch (error) {
      console.error('Error al obtener antecedente familiar:', error.message);
      throw error;
    }
  }

  static async update(id_historia, data) {
    try {
      await pool.query(`CALL u_antecedente_familiar($1,$2)`, [
        id_historia,
        data.descripcion,
      ]);
      return true;
    } catch (error) {
      console.error('Error al actualizar antecedente familiar:', error.message);
      throw error;
    }
  }
}

class AntecedenteCumplimiento {
  static async create(data) {
    try {
      await pool.query(
        `CALL i_antecedente_cumplimiento($1,$2,$3,$4,$5,$6,$7,$8)`,
        [
          data.id_historia,
          data.dentista_dolor,
          data.frecuenca_dentista,
          data.higiene_oral,
          data.tranquilo,
          data.nervioso,
          data.panico,
          data.desagrado_atencion,
        ]
      );
      return true;
    } catch (error) {
      console.error('Error al crear antecedente cumplimiento:', error.message);
      throw error;
    }
  }

  static async getByHistoria(id_historia) {
    try {
      const result = await pool.query(
        `SELECT * FROM antecedente_cumplimiento WHERE id_historia = $1`,
        [id_historia]
      );
      if (result.rows.length === 0) {
        return null;
      }
      return result.rows[0];
    } catch (error) {
      console.error(
        'Error al obtener antecedente cumplimiento:',
        error.message
      );
      throw error;
    }
  }

  static async update(id_historia, data) {
    try {
      await pool.query(
        `CALL u_antecedente_cumplimiento($1,$2,$3,$4,$5,$6,$7,$8)`,
        [
          id_historia,
          data.dentista_dolor,
          data.frecuenca_dentista,
          data.higiene_oral,
          data.tranquilo,
          data.nervioso,
          data.panico,
          data.desagrado_atencion,
        ]
      );
      return true;
    } catch (error) {
      console.error(
        'Error al actualizar antecedente cumplimiento:',
        error.message
      );
      throw error;
    }
  }
}

export {
  AntecedentePersonal,
  AntecedenteMedico,
  AntecedenteFamiliar,
  AntecedenteCumplimiento,
};
