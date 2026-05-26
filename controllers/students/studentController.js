export class StudentController {
  constructor(StudentModel) {
    this.StudentModel = StudentModel;
  }

  consultarPacientesAdultosPorEstudiante = async (req, res) => {
    try {
      const { id } = req.params;
      const { IdUuidValueObject } = this.StudentModel;
      const idVO = new IdUuidValueObject(id);
      const patients =
        await this.StudentModel.consultarPacientesAdultosPorEstudiante(
          idVO.value
        );
      return res.status(200).json(patients);
    } catch (error) {
      if (error.message && error.message.includes('ID de estudiante')) {
        return res.status(400).json({ error: error.message });
      }
      return res
        .status(500)
        .json({ error: error.message || 'Error al obtener pacientes adultos' });
    }
  };

  registrarPacienteParaEstudiante = async (req, res) => {
    const { studentId } = req.params;
    const { nombreCompleto, edad, idSexo, telefono, email } = req.body;

    // Simple validation: UUID should have 36 characters
    if (studentId.length !== 36) {
      return res.status(400).json({
        error: 'ID de estudiante inválido. Debe ser un UUID válido.',
      });
    }

    // Basic validation for required fields
    if (!nombreCompleto) {
      return res.status(400).json({
        error: 'El nombre completo es requerido.',
      });
    }

    // Call the model to register the patient
    const newPatient = await this.StudentModel.registrarPacienteParaEstudiante(
      studentId,
      nombreCompleto,
      edad,
      idSexo,
      telefono,
      email
    );

    res.status(201).json(newPatient);
  };
}
