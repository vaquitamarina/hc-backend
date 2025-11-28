import db from '../../../db/db.js';

const Filiacion = {
  async create(data) {
    const query = `INSERT INTO filiacion (
      id_historia, raza, fecha_nacimiento, lugar, id_estado_civil, nombre_conyuge, id_ocupacion, lugar_procedencia, tiempo_residencia_tacna, direccion, id_grado_instruccion, ultima_visita_dentista, motivo_visita_dentista, ultima_visita_medico, motivo_visita_medico, contacto_emergencia, telefono_emergencia, acompaniante
    ) VALUES (
      $1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18
    ) RETURNING *`;
    const values = [
      data.id_historia,
      data.raza,
      data.fecha_nacimiento,
      data.lugar,
      data.id_estado_civil,
      data.nombre_conyuge,
      data.id_ocupacion,
      data.lugar_procedencia,
      data.tiempo_residencia_tacna,
      data.direccion,
      data.id_grado_instruccion,
      data.ultima_visita_dentista,
      data.motivo_visita_dentista,
      data.ultima_visita_medico,
      data.motivo_visita_medico,
      data.contacto_emergencia,
      data.telefono_emergencia,
      data.acompaniante,
    ];
    const { rows } = await db.query(query, values);
    return rows[0];
  },

  async getById(id_filiacion) {
    const query = `SELECT * FROM filiacion WHERE id_filiacion = $1`;
    const { rows } = await db.query(query, [id_filiacion]);
    return rows[0];
  },

  async getByHistoria(id_historia) {
    const query = `SELECT * FROM filiacion WHERE id_historia = $1`;
    const { rows } = await db.query(query, [id_historia]);
    return rows[0];
  },

  async update(id_filiacion, data) {
    const query = `UPDATE filiacion SET
      raza = $1, fecha_nacimiento = $2, lugar = $3, id_estado_civil = $4, nombre_conyuge = $5, id_ocupacion = $6, lugar_procedencia = $7, tiempo_residencia_tacna = $8, direccion = $9, id_grado_instruccion = $10, ultima_visita_dentista = $11, motivo_visita_dentista = $12, ultima_visita_medico = $13, motivo_visita_medico = $14, contacto_emergencia = $15, telefono_emergencia = $16, acompaniante = $17
      WHERE id_filiacion = $18 RETURNING *`;
    const values = [
      data.raza,
      data.fecha_nacimiento,
      data.lugar,
      data.id_estado_civil,
      data.nombre_conyuge,
      data.id_ocupacion,
      data.lugar_procedencia,
      data.tiempo_residencia_tacna,
      data.direccion,
      data.id_grado_instruccion,
      data.ultima_visita_dentista,
      data.motivo_visita_dentista,
      data.ultima_visita_medico,
      data.motivo_visita_medico,
      data.contacto_emergencia,
      data.telefono_emergencia,
      data.acompaniante,
      id_filiacion,
    ];
    const { rows } = await db.query(query, values);
    return rows[0];
  },
};

export default Filiacion;
