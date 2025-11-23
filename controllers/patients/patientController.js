export class PatientController {
  constructor(PatientModel) {
    this.PatientModel = PatientModel;
  }

  createPatient = async (req, res) => {
    const { nombre, apellido, dni, fechaNacimiento, sexo, telefono, email } =
      req.body;

    // Validar campos requeridos
    if (!nombre || !apellido || !dni || !fechaNacimiento || !sexo) {
      return res.status(400).json({
        error:
          'Los campos nombre, apellido, dni, fechaNacimiento y sexo son requeridos.',
      });
    }

    // Validar sexo
    if (sexo !== 'Masculino' && sexo !== 'Femenino') {
      return res.status(400).json({
        error: 'El sexo debe ser "Masculino" o "Femenino".',
      });
    }

    try {
      const result = await this.PatientModel.createPatient(
        nombre,
        apellido,
        dni,
        fechaNacimiento,
        sexo,
        telefono,
        email
      );

      res.status(201).json({
        id: result.id,
      });
    } catch (error) {
      console.error('Error al crear paciente:', error.message);

      // Manejo de errores específicos
      if (error.message.includes('Ya existe un paciente')) {
        return res.status(409).json({
          error: 'Ya existe un paciente con ese DNI.',
        });
      }

      res.status(500).json({
        error: 'Error al crear paciente.',
      });
    }
  };

  updatePatient = async (req, res) => {
    const { id } = req.params;
    const { nombre, apellido, telefono, email } = req.body;

    // Validación básica de UUID
    if (!id || id.length !== 36) {
      return res.status(400).json({ error: 'ID de paciente inválido' });
    }

    try {
      await this.PatientModel.updatePatient(
        id,
        nombre,
        apellido,
        telefono,
        email
      );

      res.status(200).json({
        message: 'Datos del paciente actualizados correctamente',
      });
    } catch (error) {
      // Si el procedure lanza una excepción (ej. ID no existe), la capturamos aquí
      if (error.message.includes('No existe un paciente')) {
        return res.status(404).json({ error: 'Paciente no encontrado' });
      }

      console.error('Error en updatePatient:', error);
      res.status(500).json({
        error: 'Error interno al actualizar el paciente.',
      });
    }
  };
}
