import pool from '../../../db/db.js';

const EnfermedadActual = {
  async create(data) {
    const query = `INSERT INTO enfermedad_actual (
      id_historia, sintoma_principal, tiempo_enfermedad, forma_inicio, curso, relato, tratamiento_prev
    ) VALUES (
      $1,$2,$3,$4,$5,$6,$7
    ) RETURNING *`;
    const values = [
      data.id_historia,
      data.sintoma_principal,
      data.tiempo_enfermedad,
      data.forma_inicio,
      data.curso,
      data.relato,
      data.tratamiento_prev,
    ];
    const { rows } = await pool.query(query, values);
    return rows[0];
  },

  async getById(id_enfermedad_actual) {
    const query = `SELECT * FROM enfermedad_actual WHERE id_enfermedad_actual = $1`;
    const { rows } = await pool.query(query, [id_enfermedad_actual]);
    return rows[0];
  },

  async update(id_enfermedad_actual, data) {
    const query = `UPDATE enfermedad_actual SET
      sintoma_principal = $1, tiempo_enfermedad = $2, forma_inicio = $3, curso = $4, relato = $5, tratamiento_prev = $6
      WHERE id_enfermedad_actual = $7 RETURNING *`;
    const values = [
      data.sintoma_principal,
      data.tiempo_enfermedad,
      data.forma_inicio,
      data.curso,
      data.relato,
      data.tratamiento_prev,
      id_enfermedad_actual,
    ];
    const { rows } = await pool.query(query, values);
    return rows[0];
  },
};

export default EnfermedadActual;
