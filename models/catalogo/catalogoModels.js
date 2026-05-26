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
// Domain Value Objects
class CatalogNameValueObject {
  constructor(value) {
    if (typeof value !== 'string' || !allowedCatalogs.includes(value)) {
      throw new Error('Nombre de catálogo no permitido');
    }
    this.value = value;
    Object.freeze(this);
  }
}

class IdPositiveValueObject {
  constructor(value) {
    const n = Number(value);
    if (!Number.isInteger(n) || n <= 0) {
      throw new Error('id debe ser un entero positivo');
    }
    this.value = n;
    Object.freeze(this);
  }
}

// Aggregate Root for Catalog operations
class CatalogoAggregate {
  constructor({ catalogNameVO }) {
    this._catalogName = catalogNameVO; // CatalogNameValueObject
    Object.freeze(this);
  }

  // For repositories that expect ordered params
  obtenerParametrosParaNombre() {
    return [this._catalogName.value];
  }
}

// Repository preserving SQL exactly as before
const CatalogoRepository = {
  async listar(aggregate) {
    try {
      const nombre = aggregate._catalogName.value;
      const result = await pool.query(`SELECT * FROM ${nombre}`);
      return result.rows;
    } catch (err) {
      throw new Error(err.message || 'Error al listar catálogo');
    }
  },

  async obtenerNombre(aggregate, idVO) {
    try {
      const nombre = aggregate._catalogName.value;
      const result = await pool.query(
        `SELECT * FROM ${nombre} WHERE id_grupo_sanguineo = $1`,
        [idVO.value]
      );
      if (!result.rows.length) {
        return null;
      }
      const row = result.rows[0];
      return row.nombre || row.descripcion || null;
    } catch (err) {
      throw new Error(err.message || 'Error al obtener nombre del catálogo');
    }
  },
};

// Public API (keeps original function names/signatures)
export async function listarOpcionesCatalogoClinico(nombre) {
  const nameVO = new CatalogNameValueObject(nombre);
  const agg = new CatalogoAggregate({ catalogNameVO: nameVO });
  return CatalogoRepository.listar(agg);
}

// Obtener el registro por id y devolver el nombre (manteniendo la misma SQL)
export async function obtenerNombreOpcionCatalogoClinico(nombre, id) {
  const nameVO = new CatalogNameValueObject(nombre);
  const idVO = new IdPositiveValueObject(id);
  const agg = new CatalogoAggregate({ catalogNameVO: nameVO });
  return CatalogoRepository.obtenerNombre(agg, idVO);
}

export { CatalogNameValueObject, IdPositiveValueObject, CatalogoAggregate };

export default listarOpcionesCatalogoClinico;
