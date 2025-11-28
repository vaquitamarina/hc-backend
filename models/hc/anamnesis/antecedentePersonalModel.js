import db from '../../../db/db.js';

const AntecedentePersonal = {
  async create(data) {
    const query = `INSERT INTO antecedente_personal (
      id_historia, esta_embarazada, mac, otros, psicosocial, vacunas, hepatitis_b, id_grupo_sanguineo, fuma, cigarrillos_dia, toma_te, tazas_te_dia, toma_alcohol, frecuencia_alcohol, aprieta_dientes, momento_aprieta, rechina, dolor_muscular, chupa_dedo, muerde_objetos, muerde_labios, otros_habitos, frecuencia_cepillado
    ) VALUES (
      $1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,$21,$22,$23
    ) RETURNING *`;
    const values = [
      data.id_historia,
      data.esta_embarazada,
      data.mac,
      data.otros,
      data.psicosocial,
      data.vacunas,
      data.hepatitis_b,
      data.id_grupo_sanguineo,
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
    ];
    const { rows } = await db.query(query, values);
    return rows[0];
  },

  async getById(id_antecedente) {
    const query = `SELECT * FROM antecedente_personal WHERE id_antecedente = $1`;
    const { rows } = await db.query(query, [id_antecedente]);
    return rows[0];
  },

  async getByHistoria(id_historia) {
    const query = `SELECT * FROM antecedente_personal WHERE id_historia = $1`;
    const { rows } = await db.query(query, [id_historia]);
    return rows[0];
  },

  async update(id_antecedente, data) {
    const query = `UPDATE antecedente_personal SET
      esta_embarazada = $1, mac = $2, otros = $3, psicosocial = $4, vacunas = $5, hepatitis_b = $6, id_grupo_sanguineo = $7, fuma = $8, cigarrillos_dia = $9, toma_te = $10, tazas_te_dia = $11, toma_alcohol = $12, frecuencia_alcohol = $13, aprieta_dientes = $14, momento_aprieta = $15, rechina = $16, dolor_muscular = $17, chupa_dedo = $18, muerde_objetos = $19, muerde_labios = $20, otros_habitos = $21, frecuencia_cepillado = $22
      WHERE id_antecedente = $23 RETURNING *`;
    const values = [
      data.esta_embarazada,
      data.mac,
      data.otros,
      data.psicosocial,
      data.vacunas,
      data.hepatitis_b,
      data.id_grupo_sanguineo,
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
      id_antecedente,
    ];
    const { rows } = await db.query(query, values);
    return rows[0];
  },
};

export default AntecedentePersonal;
