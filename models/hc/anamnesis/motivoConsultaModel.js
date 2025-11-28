import db from '../../../db/db.js';

const MotivoConsulta = {
  async create({ id_historia, motivo }) {
    const query = `INSERT INTO motivo_consulta (id_historia, motivo) VALUES ($1, $2) RETURNING *`;
    const values = [id_historia, motivo];
    const { rows } = await db.query(query, values);
    return rows[0];
  },

  async getById(id_motivo) {
    const query = `SELECT * FROM motivo_consulta WHERE id_motivo = $1`;
    const { rows } = await db.query(query, [id_motivo]);
    return rows[0];
  },

  async update(id_motivo, { motivo }) {
    const query = `UPDATE motivo_consulta SET motivo = $1 WHERE id_motivo = $2 RETURNING *`;
    const values = [motivo, id_motivo];
    const { rows } = await db.query(query, values);
    return rows[0];
  },
};

export default MotivoConsulta;
