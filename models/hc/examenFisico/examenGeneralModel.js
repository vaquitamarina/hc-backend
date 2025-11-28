import db from '../../../db/db.js';

const TABLE = 'examen_general';

const ExamenGeneral = {
  async create(data) {
    const keys = Object.keys(data);
    const values = Object.values(data);
    const fields = keys.join(', ');
    const params = keys.map((_, i) => `$${i + 1}`).join(', ');
    const query = `INSERT INTO ${TABLE} (${fields}) VALUES (${params}) RETURNING *`;
    const { rows } = await db.query(query, values);
    return rows[0];
  },

  async getByHistoria(id_historia) {
    const query = `SELECT * FROM ${TABLE} WHERE id_historia = $1 LIMIT 1`;
    const { rows } = await db.query(query, [id_historia]);
    return rows[0];
  },

  async update(id_examen, data) {
    const keys = Object.keys(data);
    const values = Object.values(data);
    const setClause = keys.map((key, i) => `${key} = $${i + 2}`).join(', ');
    const query = `UPDATE ${TABLE} SET ${setClause} WHERE id_examen = $1 RETURNING *`;
    const { rows } = await db.query(query, [id_examen, ...values]);
    return rows[0];
  },
};

export default ExamenGeneral;
