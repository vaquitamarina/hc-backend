/**
 * HcControllerAdapter - Adaptador Primario (Driving Adapter)
 * 
 * RESPONSABILIDADES:
 * 1. Recibir HTTP requests
 * 2. Parsear entrada (req.body, req.params)
 * 3. Delegar lógica al servicio de aplicación
 * 4. Mapear respuesta a HTTP response
 * 
 * NO TIENE: Lógica de negocio, queries SQL, conversiones de datos complejas
 * 
 * EJEMPLO DE USO INCREMENTAL:
 * 
 * En api.js o routes/hcRoutes.js:
 * 
 *   import Container from './infrastructure/Container.js';
 *   import { HcControllerAdapter } from './infrastructure/adapters/HcControllerAdapter.js';
 *   
 *   const hcControllerAdapter = new HcControllerAdapter(
 *     Container.getCreateHcService(),
 *     Container.getGetHcByStudentService(),
 *     Container.getUpdateFiliationService(),
 *     // ... etc
 *   );
 *   
 *   router.post('/hc', hcControllerAdapter.registerHc);
 *   router.get('/hc/:studentId', hcControllerAdapter.getByStudent);
 */

export class HcControllerAdapter {
  constructor(
    createHcService,
    getHcByStudentService,
    updateFiliationService,
    createReviewService,
    assignPatientService,
    createDraftService,
    getFiliationService
  ) {
    this.createHcService = createHcService;
    this.getHcByStudentService = getHcByStudentService;
    this.updateFiliationService = updateFiliationService;
    this.createReviewService = createReviewService;
    this.assignPatientService = assignPatientService;
    this.createDraftService = createDraftService;
    this.getFiliationService = getFiliationService;
  }

  /**
   * POST /hc/register
   * Registra una nueva Historia Clínica
   */
  registerHc = async (req, res) => {
    try {
      const { idStudent } = req.body;

      const hc = await this.createHcService.execute({ idStudent });

      return res.status(201).json({
        message: 'Historia clínica registrada con éxito',
        data: hc,
      });
    } catch (error) {
      return res.status(400).json({
        error: error.message,
      });
    }
  };

  /**
   * GET /hc/student/:studentId
   * Obtiene todas las historias clínicas de un estudiante
   */
  getByStudent = async (req, res) => {
    try {
      const { studentId } = req.params;

      const historias = await this.getHcByStudentService.execute(studentId);

      return res.status(200).json(historias);
    } catch (error) {
      return res.status(400).json({
        error: error.message,
      });
    }
  };

  /**
   * GET /hc/:idHistory/filiation
   * Obtiene la filiación de una historia clínica
   */
  getFiliation = async (req, res) => {
    try {
      const { idHistory } = req.params;

      const filiation = await this.getFiliationService.execute(idHistory);

      return res.status(200).json(filiation);
    } catch (error) {
      return res.status(404).json({
        error: error.message,
      });
    }
  };

  /**
   * PATCH /hc/:idHistory/filiation
   * Actualiza la filiación
   */
  updateFiliation = async (req, res) => {
    try {
      const { idHistory } = req.params;
      const filiationData = {
        idHistory,
        ...req.body,
      };

      const result = await this.updateFiliationService.execute(filiationData);

      return res.status(200).json({
        message: 'Filiación actualizada',
        data: result,
      });
    } catch (error) {
      return res.status(400).json({
        error: error.message,
      });
    }
  };

  /**
   * POST /hc/:idHistory/review
   * Crea una revisión
   */
  createReview = async (req, res) => {
    try {
      const { idHistory } = req.params;
      const reviewData = {
        idHistory,
        ...req.body,
      };

      const result = await this.createReviewService.execute(reviewData);

      return res.status(201).json({
        message: 'Revisión registrada',
        data: result,
      });
    } catch (error) {
      return res.status(400).json({
        error: error.message,
      });
    }
  };

  /**
   * POST /hc/:idHistory/patient
   * Asigna un paciente a la HC
   */
  assignPatient = async (req, res) => {
    try {
      const { idHistory } = req.params;
      const { idPatient } = req.body;

      const result = await this.assignPatientService.execute({
        idHistory,
        idPatient,
      });

      return res.status(200).json({
        message: 'Paciente asignado',
        data: result,
      });
    } catch (error) {
      return res.status(400).json({
        error: error.message,
      });
    }
  };

  /**
   * POST /hc/draft
   * Crea un borrador de HC
   */
  createDraft = async (req, res) => {
    try {
      const { idStudent } = req.body;

      const draft = await this.createDraftService.execute(idStudent);

      return res.status(201).json({
        message: 'Borrador creado',
        data: draft,
      });
    } catch (error) {
      return res.status(400).json({
        error: error.message,
      });
    }
  };
}
