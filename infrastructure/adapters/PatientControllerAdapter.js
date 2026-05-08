/**
 * PatientControllerAdapter - Adaptador Primario
 * Maneja las operaciones HTTP de Pacientes
 */

export class PatientControllerAdapter {
  constructor(createPatientService, getAdultPatientsService) {
    this.createPatientService = createPatientService;
    this.getAdultPatientsService = getAdultPatientsService;
  }

  /**
   * POST /patients
   */
  create = async (req, res) => {
    try {
      const input = req.body;

      const patient = await this.createPatientService.execute(input);

      return res.status(201).json({
        message: 'Paciente creado con éxito',
        data: patient,
      });
    } catch (error) {
      return res.status(400).json({
        error: error.message,
      });
    }
  };

  /**
   * GET /patients/student/:studentId
   */
  getAdultsByStudent = async (req, res) => {
    try {
      const { studentId } = req.params;

      const patients = await this.getAdultPatientsService.execute(studentId);

      return res.status(200).json(patients);
    } catch (error) {
      return res.status(400).json({
        error: error.message,
      });
    }
  };
}
