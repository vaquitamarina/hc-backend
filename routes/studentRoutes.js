import { Router } from 'express';

import { StudentController } from '../controllers/students/studentController.js';
import { StudentModel } from '../models/student/studentModel.js';

export const studentRoutes = Router();

const studentController = new StudentController(StudentModel);

// GET /api/students/:id/patients/adult
studentRoutes.get(
  '/:id/patients/adult',
  studentController.getAdultPatientsByStudentId
);
