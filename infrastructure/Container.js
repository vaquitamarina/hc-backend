/**
 * Container - Inyector de Dependencias (Inversion of Control)
 * 
 * Responsabilidad: Instanciar y configurar todas las dependencias
 * Patrón: Service Locator / Factory
 * 
 * USO:
 * const createHcService = Container.getCreateHcService();
 * const hc = await createHcService.execute(input);
 */

import { HcJpaRepository } from '../../infrastructure/repositories/HcJpaRepository.js';
import { UserJpaRepository } from '../../infrastructure/repositories/UserJpaRepository.js';
import { PatientJpaRepository } from '../../infrastructure/repositories/PatientJpaRepository.js';
import { StudentJpaRepository } from '../../infrastructure/repositories/StudentJpaRepository.js';
import { AntecedenteJpaRepository } from '../../infrastructure/repositories/AntecedenteJpaRepository.js';
import { EnfermedadActualJpaRepository } from '../../infrastructure/repositories/EnfermedadActualJpaRepository.js';
import { MotivoConsultaJpaRepository } from '../../infrastructure/repositories/MotivoConsultaJpaRepository.js';
import { ExamenGeneralJpaRepository } from '../../infrastructure/repositories/ExamenGeneralJpaRepository.js';
import { ExamenRegionalJpaRepository } from '../../infrastructure/repositories/ExamenRegionalJpaRepository.js';
import { CatalogoJpaRepository } from '../../infrastructure/repositories/CatalogoJpaRepository.js';

import {
  CreateHcApplicationService,
  GetHcByStudentApplicationService,
  GetFiliationByHistoryApplicationService,
  UpdateFiliationApplicationService,
  CreateReviewApplicationService,
  AssignPatientToHcApplicationService,
  CreateDraftHcApplicationService,
} from '../../application/services/HcApplicationService.js';

import {
  RegisterUserApplicationService,
  GetUserApplicationService,
} from '../../application/services/UserApplicationService.js';

import {
  CreatePatientApplicationService,
  GetAdultPatientsApplicationService,
} from '../../application/services/PatientApplicationService.js';

/**
 * Singleton Container - Reutiliza instancias
 */
class DependencyContainer {
  constructor() {
    this.repositories = {};
    this.services = {};
    this._initializeRepositories();
    this._initializeServices();
  }

  _initializeRepositories() {
    this.repositories.hc = new HcJpaRepository();
    this.repositories.user = new UserJpaRepository();
    this.repositories.patient = new PatientJpaRepository();
    this.repositories.student = new StudentJpaRepository();
    this.repositories.antecedente = new AntecedenteJpaRepository();
    this.repositories.enfermedadActual = new EnfermedadActualJpaRepository();
    this.repositories.motivoConsulta = new MotivoConsultaJpaRepository();
    this.repositories.examenGeneral = new ExamenGeneralJpaRepository();
    this.repositories.examenRegional = new ExamenRegionalJpaRepository();
    this.repositories.catalogo = new CatalogoJpaRepository();
  }

  _initializeServices() {
    // HC Services
    this.services.createHc = new CreateHcApplicationService(
      this.repositories.hc
    );
    this.services.getHcByStudent = new GetHcByStudentApplicationService(
      this.repositories.hc
    );
    this.services.getFiliationByHistory =
      new GetFiliationByHistoryApplicationService(this.repositories.hc);
    this.services.updateFiliation = new UpdateFiliationApplicationService(
      this.repositories.hc
    );
    this.services.createReview = new CreateReviewApplicationService(
      this.repositories.hc
    );
    this.services.assignPatientToHc = new AssignPatientToHcApplicationService(
      this.repositories.hc
    );
    this.services.createDraftHc = new CreateDraftHcApplicationService(
      this.repositories.hc
    );

    // User Services
    this.services.registerUser = new RegisterUserApplicationService(
      this.repositories.user
    );
    this.services.getUser = new GetUserApplicationService(
      this.repositories.user
    );

    // Patient Services
    this.services.createPatient = new CreatePatientApplicationService(
      this.repositories.patient
    );
    this.services.getAdultPatients = new GetAdultPatientsApplicationService(
      this.repositories.patient
    );
  }

  // HC Services getters
  getCreateHcService() {
    return this.services.createHc;
  }

  getGetHcByStudentService() {
    return this.services.getHcByStudent;
  }

  getGetFiliationByHistoryService() {
    return this.services.getFiliationByHistory;
  }

  getUpdateFiliationService() {
    return this.services.updateFiliation;
  }

  getCreateReviewService() {
    return this.services.createReview;
  }

  getAssignPatientToHcService() {
    return this.services.assignPatientToHc;
  }

  getCreateDraftHcService() {
    return this.services.createDraftHc;
  }

  // User Services getters
  getRegisterUserService() {
    return this.services.registerUser;
  }

  getGetUserService() {
    return this.services.getUser;
  }

  // Patient Services getters
  getCreatePatientService() {
    return this.services.createPatient;
  }

  getGetAdultPatientsService() {
    return this.services.getAdultPatients;
  }

  // Acceso directo a repositorios (si lo necesitas)
  getHcRepository() {
    return this.repositories.hc;
  }

  getUserRepository() {
    return this.repositories.user;
  }

  getPatientRepository() {
    return this.repositories.patient;
  }

  getStudentRepository() {
    return this.repositories.student;
  }

  getAntecedenteRepository() {
    return this.repositories.antecedente;
  }

  getEnfermedadActualRepository() {
    return this.repositories.enfermedadActual;
  }

  getMotivoConsultaRepository() {
    return this.repositories.motivoConsulta;
  }

  getExamenGeneralRepository() {
    return this.repositories.examenGeneral;
  }

  getExamenRegionalRepository() {
    return this.repositories.examenRegional;
  }

  getCatalogoRepository() {
    return this.repositories.catalogo;
  }
}

// Singleton instance
const container = new DependencyContainer();

export default container;
