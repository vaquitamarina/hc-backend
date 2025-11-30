import pool from '../../../db/db.js';

class Filiacion {
  static async create(data) {
    try {
      await pool.query(
        `CALL i_filiacion($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18)`,
        [
          data.id_historia,
          data.raza,
          data.fecha_nacimiento,
          data.lugar,
          data.estado_civil_desc,
          data.nombre_conyuge,
          data.ocupacion_desc,
          data.lugar_procedencia,
          data.tiempo_residencia_tacna,
          data.direccion,
          data.grado_instruccion_desc,
          data.ultima_visita_dentista,
          data.motivo_visita_dentista,
          data.ultima_visita_medico,
          data.motivo_visita_medico,
          data.contacto_emergencia,
          data.telefono_emergencia,
          data.acompaniante,
        ]
      );
      return true;
    } catch (error) {
      console.error('Error al crear filiación:', error.message);
      throw new Error(error.message || 'Error al crear filiación');
    }
  }

  static async getById(id_filiacion) {
    try {
      const query = `SELECT * FROM filiacion WHERE id_filiacion = $1`;
      const { rows } = await pool.query(query, [id_filiacion]);
      if (rows.length === 0) {
        return null;
      }
      return rows[0];
    } catch (error) {
      console.error('Error al obtener filiación por ID:', error.message);
      return null;
    }
  }

  static async getByHistoria(id_historia) {
    try {
      const query = `SELECT * FROM filiacion WHERE id_historia = $1`;
      const { rows } = await pool.query(query, [id_historia]);
      if (rows.length === 0) {
        return null;
      }
      return rows[0];
    } catch (error) {
      console.error('Error al obtener filiación por historia:', error.message);
      return null;
    }
  }

  static async update(id_historia, data) {
    try {
      await pool.query(
        `CALL u_filiacion($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18)`,
        [
          id_historia,
          data.raza,
          data.fecha_nacimiento,
          data.lugar,
          data.estado_civil_desc,
          data.nombre_conyuge,
          data.ocupacion_desc,
          data.lugar_procedencia,
          data.tiempo_residencia_tacna,
          data.direccion,
          data.grado_instruccion_desc,
          data.ultima_visita_dentista,
          data.motivo_visita_dentista,
          data.ultima_visita_medico,
          data.motivo_visita_medico,
          data.contacto_emergencia,
          data.telefono_emergencia,
          data.acompaniante,
        ]
      );
      return true;
    } catch (error) {
      console.error('Error al actualizar filiación:', error.message);
      throw new Error(error.message || 'Error al actualizar filiación');
    }
  }
}

export default Filiacion;
