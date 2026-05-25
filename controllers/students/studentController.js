export class StudentController {
  constructor(StudentModel) {
    this.StudentModel = StudentModel;
  }

  consultarPacientesAdultosPorEstudiante = async (req, res) => {
    const { id } = req.params;

    // Simple validation: UUID should have 36 characters
    if (id.length !== 36) {
      return res.status(400).json({
        error: 'ID de estudiante inválido. Debe ser un UUID válido.',
      });
    }

    // Call the model to get adult patients
    const patients =
      await this.StudentModel.consultarPacientesAdultosPorEstudiante(id);

    // Return the patients array (could be empty)
    res.status(200).json(patients);
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
