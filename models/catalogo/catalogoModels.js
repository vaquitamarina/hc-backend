import pool from '../../db/db.js';

const allowedCatalogs = [
  'catalogo_estado_civil',
  'catalogo_grado_instruccion',
  'catalogo_ocupacion',
  'catalogo_grupo_sanguineo',
  'catalogo_sexo',
  'catalogo_enfermedad',
  'catalogo_habito',
  'catalogo_examen_auxiliar',
  'catalogo_clinica',
  'catalogo_estado_revision',
  'catalogo_posicion',
  'catalogo_medida_regional',
  'catalogo_atm_trayectoria',
  'catalogo_dolor_grado',
  'catalogo_movimiento_mandibular',
];

export async function getCatalogo(nombre) {
  if (!allowedCatalogs.includes(nombre)) {
    throw new Error('Catalog not allowed');
  }
  const result = await pool.query(`SELECT * FROM ${nombre}`);
  return result.rows;
}

export default getCatalogo;
