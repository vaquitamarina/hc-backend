/**
 * Adaptador Primario: Controller para listar historias clínicas adultas
 * Construye agregados desde `req`, maneja DomainError -> 400 y errores infra -> 500
 */
import {
  DomainError,
  IdUuidValueObject,
  ListaHcAdultosAggregate,
} from '../domain/listaHcAdultosDomain.js';
import { ListaHcAdultosRepository } from '../infrastructure/listaHcAdultosRepository.js';

const repo = new ListaHcAdultosRepository();

function construirAgregado(req) {
  const idVO = new IdUuidValueObject(req.params.id);
  return new ListaHcAdultosAggregate({ idEstudianteVO: idVO });
}

function esErrorDominio(err) {
  return err && (err instanceof DomainError || err.name === 'DomainError');
}

export const ListaHcAdultosController = {
  listarHistoriasClinicasAdultasDeEstudiante: async (req, res) => {
    try {
      const agg = construirAgregado(req);
      const rows = await repo.listarPorEstudiante(agg);
      return res.status(200).json(rows || []);
    } catch (err) {
      if (esErrorDominio(err)) {
        return res.status(400).json({ error: err.message });
      }
      return res
        .status(500)
        .json({ error: 'Error al obtener historias clínicas adultas' });
    }
  },
};
