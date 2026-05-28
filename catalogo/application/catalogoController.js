/**
 * Application layer controller (Adaptador Primario) for catalogo.
 * Orquesta construcción de agregados, llamadas a repositorio y traducción
 * de errores de dominio a respuestas HTTP.
 */
import {
  DomainError,
  CatalogNameValueObject,
  IdPositiveValueObject,
  CatalogoAggregate,
} from '../domain/catalogoDomain.js';
import { CatalogoRepository } from '../infrastructure/catalogoRepository.js';

const repo = new CatalogoRepository();

function construirAgregadoDesdeParams(params) {
  const nameVO = new CatalogNameValueObject(params.nombre);
  return new CatalogoAggregate({ catalogNameVO: nameVO });
}

function esErrorDominio(err) {
  return err && (err instanceof DomainError || err.name === 'DomainError');
}

export const CatalogoController = {
  listarOpcionesCatalogoClinico: async (req, res) => {
    try {
      const agg = construirAgregadoDesdeParams(req.params);
      const rows = await repo.listar(agg);
      if (!rows || rows.length === 0) {
        return res
          .status(404)
          .json({ error: 'No data found for this catalog' });
      }
      return res.status(200).json(rows);
    } catch (err) {
      if (esErrorDominio(err)) {
        return res.status(400).json({ error: err.message });
      }
      return res.status(500).json({ error: 'Error retrieving catalog data' });
    }
  },

  obtenerNombreOpcionCatalogoClinico: async (req, res) => {
    try {
      const agg = construirAgregadoDesdeParams(req.params);
      const idVO = new IdPositiveValueObject(req.params.id);
      const nombre = await repo.obtenerNombre(agg, idVO);
      if (!nombre) {
        return res
          .status(404)
          .json({ error: 'No data found for this id in catalog' });
      }
      return res.status(200).json({ id: idVO.value, nombre });
    } catch (err) {
      if (esErrorDominio(err)) {
        return res.status(400).json({ error: err.message });
      }
      return res.status(500).json({ error: 'Error retrieving catalog name' });
    }
  },
};
