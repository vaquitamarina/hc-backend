/**
 * Adaptador Primario: StudentUsersController
 * Construye agregados desde `req`, maneja validaciones y orquesta repositorio.
 */
import { StudentUsersRepository } from '../infrastructure/studentUsersRepository.js';
import {
  DomainError,
  RoleValueObject,
  StudentUsersAggregate,
} from '../domain/studentUsersDomain.js';

const repo = new StudentUsersRepository();

function esErrorDominio(err) {
  return err && (err instanceof DomainError || err.name === 'DomainError');
}

function construirAgregado(req) {
  const role = req.query.role || 'estudiante';
  const roleVO = new RoleValueObject(role);
  return new StudentUsersAggregate({ roleVO });
}

export class StudentUsersController {
  listarUsuariosEstudiantes = async (req, res) => {
    try {
      const agg = construirAgregado(req);
      const rows = await repo.listarEstudiantes(agg);
      return res.status(200).json(rows);
    } catch (err) {
      if (esErrorDominio(err)) {
        return res.status(400).json({ error: err.message });
      }
      return res.status(500).json({ error: 'Error al obtener estudiantes' });
    }
  };
}
