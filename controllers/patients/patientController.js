export class PatientController {
  constructor(PatientModel) {
    this.PatientModel = PatientModel;
  }

  registrarPaciente = async (req, res) => {
    const { nombre, apellido, dni, fechaNacimiento, sexo, telefono, email } =
      req.body;

    try {
      // Build Value Objects and Aggregate in controller (no data bag)
      const {
        NombreValueObject,
        ApellidoValueObject,
        FechaNacimientoValueObject,
        PatientAggregate,
      } = this.PatientModel;
      const nombreVO = new NombreValueObject(nombre);
      const apellidoVO = new ApellidoValueObject(apellido);
      const fechaVO = new FechaNacimientoValueObject(fechaNacimiento);
      const agg = new PatientAggregate({
        nombreVO,
        apellidoVO,
        dni,
        fechaNacimientoVO: fechaVO,
        sexo,
        telefono,
        email,
      });

      const params = agg.obtenerParametrosParaCrear();
      const result = await this.PatientModel.registrarPaciente(...params);

      res.status(201).json({ id: result.id });
    } catch (error) {
      if (
        error.message &&
        (error.message.includes('nombre') ||
          error.message.includes('apellido') ||
          error.message.includes('fechaNacimiento'))
      ) {
        return res.status(400).json({ error: error.message });
      }
      if (error.message.includes('Ya existe un paciente')) {
        return res
          .status(409)
          .json({ error: 'Ya existe un paciente con ese DNI.' });
      }
      res.status(500).json({ error: 'Error al crear paciente.' });
    }
  };

  actualizarPaciente = async (req, res) => {
    const { id } = req.params;
    const { nombre, apellido, telefono, email } = req.body;

    try {
      const {
        IdUuidValueObject,
        NombreValueObject,
        ApellidoValueObject,
        PatientAggregate,
      } = this.PatientModel;
      const idVO = new IdUuidValueObject(id);
      const nombreVO = nombre ? new NombreValueObject(nombre) : null;
      const apellidoVO = apellido ? new ApellidoValueObject(apellido) : null;
      const agg = new PatientAggregate({
        nombreVO,
        apellidoVO,
        dni: null,
        fechaNacimientoVO: null,
        sexo: null,
        telefono,
        email,
      });

      const paramsUpdate = agg.obtenerParametrosParaActualizar();
      await this.PatientModel.actualizarPaciente(idVO.value, ...paramsUpdate);

      res
        .status(200)
        .json({ message: 'Datos del paciente actualizados correctamente' });
    } catch (error) {
      if (
        error.message &&
        (error.message.includes('ID de paciente') ||
          error.message.includes('apellido') ||
          error.message.includes('nombre') ||
          error.message.includes('fechaNacimiento'))
      ) {
        return res.status(400).json({ error: error.message });
      }
      if (error.message.includes('No existe un paciente')) {
        return res.status(404).json({ error: 'Paciente no encontrado' });
      }
      res
        .status(500)
        .json({ error: 'Error interno al actualizar el paciente.' });
    }
  };
}
