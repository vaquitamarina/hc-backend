/**
 * Adaptador Primario: PatientController
 * Construye agregados desde `req` y orquesta llamadas al repositorio.
 */
import {
  DomainError,
  NombreValueObject,
  ApellidoValueObject,
  FechaNacimientoValueObject,
  IdUuidValueObject,
  PatientAggregate,
} from '../domain/patientDomain.js';
import { PatientRepository } from '../infrastructure/patientRepository.js';

const repo = new PatientRepository();

function esErrorDominio(err) {
  return err && (err instanceof DomainError || err.name === 'DomainError');
}

function construirAgregadoParaCrear(req) {
  const { nombre, apellido, dni, fechaNacimiento, sexo, telefono, email } =
    req.body;
  const nombreVO = new NombreValueObject(nombre);
  const apellidoVO = new ApellidoValueObject(apellido);
  const fechaVO = new FechaNacimientoValueObject(fechaNacimiento);
  return new PatientAggregate({
    nombreVO,
    apellidoVO,
    dni,
    fechaNacimientoVO: fechaVO,
    sexo,
    telefono,
    email,
  });
}

function construirAgregadoParaActualizar(req) {
  const { nombre, apellido, telefono, email } = req.body;
  const nombreVO = nombre ? new NombreValueObject(nombre) : null;
  const apellidoVO = apellido ? new ApellidoValueObject(apellido) : null;
  return new PatientAggregate({
    nombreVO,
    apellidoVO,
    dni: null,
    fechaNacimientoVO: null,
    sexo: null,
    telefono,
    email,
  });
}

export const PatientController = {
  registrarPaciente: async (req, res) => {
    try {
      const agg = construirAgregadoParaCrear(req);
      const result = await repo.crearPaciente(agg);
      return res.status(201).json({ id: result.id });
    } catch (err) {
      if (esErrorDominio(err)) {
        return res.status(400).json({ error: err.message });
      }
      if (err.message && err.message.includes('Ya existe un paciente')) {
        return res
          .status(409)
          .json({ error: 'Ya existe un paciente con ese DNI.' });
      }
      return res.status(500).json({ error: 'Error al crear paciente.' });
    }
  },

  actualizarPaciente: async (req, res) => {
    try {
      const idVO = new IdUuidValueObject(req.params.id);
      const agg = construirAgregadoParaActualizar(req);
      await repo.actualizarPaciente(idVO.value, agg);
      return res
        .status(200)
        .json({ message: 'Datos del paciente actualizados correctamente' });
    } catch (err) {
      if (esErrorDominio(err)) {
        return res.status(400).json({ error: err.message });
      }
      if (err.message && err.message.includes('No existe un paciente')) {
        return res.status(404).json({ error: 'Paciente no encontrado' });
      }
      return res
        .status(500)
        .json({ error: 'Error interno al actualizar el paciente.' });
    }
  },
};
