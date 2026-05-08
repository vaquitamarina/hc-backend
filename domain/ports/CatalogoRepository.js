/**
 * CatalogoRepository - Puerto Secundario
 * Acceso a catálogos (tablas de referencia)
 */
export class CatalogoRepository {
  async getCatalogo(nombre) {
    throw new Error('getCatalogo() must be implemented');
  }

  async getCatalogoNombrePorId(nombre, id) {
    throw new Error('getCatalogoNombrePorId() must be implemented');
  }
}
