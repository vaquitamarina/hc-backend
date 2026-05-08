/**
 * CatalogoJpaRepository - Adaptador Secundario
 */
import { CatalogoRepository } from '../../domain/ports/CatalogoRepository.js';
import getCatalogo, { getCatalogoNombrePorId } from '../../models/catalogo/catalogoModels.js';

export class CatalogoJpaRepository extends CatalogoRepository {
  async getCatalogo(nombre) {
    return getCatalogo(nombre);
  }

  async getCatalogoNombrePorId(nombre, id) {
    return getCatalogoNombrePorId(nombre, id);
  }
}
