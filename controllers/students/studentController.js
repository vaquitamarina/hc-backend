export class StudentController {
  constructor(StudentModel) {
    this.StudentModel = StudentModel;
  }

  getAdultPatientsByStudentId = async (req, res) => {
    const { id } = req.params;

    // Simple validation: UUID should have 36 characters
    if (id.length !== 36) {
      return res.status(400).json({
        error: 'ID de estudiante inválido. Debe ser un UUID válido.',
      });
    }

    // Call the model to get adult patients
    const patients = await this.StudentModel.getAdultPatientsByStudentId(id);

    // Return the patients array (could be empty)
    res.status(200).json(patients);
  };
}
