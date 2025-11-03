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
}
