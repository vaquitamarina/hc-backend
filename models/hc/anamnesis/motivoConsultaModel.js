import pool from '../../../db/db.js';

class MotivoConsulta {
  static async registrar({ id_historia, motivo }) {
    try {
      const query = `CALL i_motivo_consulta($1, $2)`;
      const values = [id_historia, motivo];
      await pool.query(query, values);
      return true;
    } catch (error) {
      // console.error('Error al crear motivo de consulta');
      throw new Error(error.message || 'Error al crear motivo de consulta');
    }
  }

  static async consultarPorId(id_motivo) {
    try {
      const query = `SELECT * FROM motivo_consulta WHERE id_motivo = $1`;
      const { rows } = await pool.query(query, [id_motivo]);
      if (rows.length === 0) {
        return null;
      }
      return rows[0];
    } catch {
      // console.error('Error al obtener motivo de consulta por ID');
      return null;
    }
  }

  static async consultarPorHistoria(id_historia) {
    try {
      const query = `SELECT * FROM motivo_consulta WHERE id_historia = $1`;
      const { rows } = await pool.query(query, [id_historia]);
      if (rows.length === 0) {
        return null;
      }
      return rows[0];
    } catch {
      // console.error('Error al obtener motivo de consulta por historia');
      return null;
    }
  }

  static async actualizarPorHistoria(id_historia, { motivo }) {
    try {
      const query = `CALL u_motivo_consulta($1, $2)`;
      const values = [id_historia, motivo];
      await pool.query(query, values);
      return true;
    } catch (error) {
      // console.error('Error al actualizar motivo de consulta');
      throw new Error(
        error.message || 'Error al actualizar motivo de consulta'
      );
    }
  }

  static async create(data) {
    return this.registrar(data);
  }

  static async getById(id_motivo) {
    return this.consultarPorId(id_motivo);
  }

  static async getByHistoria(id_historia) {
    return this.consultarPorHistoria(id_historia);
  }

  static async update(id_historia, data) {
    return this.actualizarPorHistoria(id_historia, data);
  }
}

export default MotivoConsulta;
