import StudentUsersRepository from '../infrastructure/studentUsersRepository.js';
import { DomainError } from '../domain/studentUsersDomain.js';

const listarUsuariosEstudiantes = async (req, res) => {
  try {
    const rows = await StudentUsersRepository.listarUsuariosEstudiantes();
    res.status(200).json(rows);
  } catch (err) {
    if (err instanceof DomainError) {
      return res.status(400).json({ error: err.message });
    }
    res.status(500).json({ error: 'Error al obtener estudiantes' });
  }
};

export default { listarUsuariosEstudiantes };
