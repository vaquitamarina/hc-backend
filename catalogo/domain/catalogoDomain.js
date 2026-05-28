/**
 * Domain layer for Catalogo (Value Objects + Aggregate Root)
 * No DB access here — pure domain validation and normalization.
 */

class DomainError extends Error {
  constructor(message) {
    super(message);
    this.name = 'DomainError';
    Object.freeze(this);
  }
}

/**
 * Allowed catalog table names (explicit whitelist).
 * Keep in sync with DB schema to avoid SQL injection risk.
 */
const ALLOWED_CATALOGS = new Set([
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
]);

/**
 * CatalogName Value Object — immutable and strictly validated.
 * @class CatalogNameValueObject
 */
class CatalogNameValueObject {
  constructor(value) {
    if (typeof value !== 'string') {
      throw new DomainError('catalog name must be a string');
    }
    const s = value.trim();
    if (!ALLOWED_CATALOGS.has(s)) {
      throw new DomainError('catalog name not allowed');
    }
    this.value = s;
    Object.freeze(this);
  }
}

/**
 * IdPositive Value Object — ensures a positive integer id.
 */
class IdPositiveValueObject {
  constructor(value) {
    const n = Number(value);
    if (!Number.isInteger(n) || n <= 0) {
      throw new DomainError('id must be a positive integer');
    }
    this.value = n;
    Object.freeze(this);
  }
}

/**
 * Aggregate root for catalog operations. Holds validated VOs.
 */
class CatalogoAggregate {
  constructor({ catalogNameVO } = {}) {
    if (!(catalogNameVO instanceof CatalogNameValueObject)) {
      throw new DomainError(
        'catalogNameVO is required and must be a CatalogNameValueObject'
      );
    }
    this._catalogName = catalogNameVO;
    Object.freeze(this);
  }

  /**
   * Positional parameters for repository calls that expect [catalogName]
   * @returns {Array}
   */
  obtenerParametros() {
    return [this._catalogName.value];
  }
}

export {
  DomainError,
  CatalogNameValueObject,
  IdPositiveValueObject,
  CatalogoAggregate,
};
