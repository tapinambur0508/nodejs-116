import express from 'express';

import {
  getStudentsController,
  getStudentByIdController,
  createStudentController,
  deleteStudentController,
  replaceStudentController,
  updateStudentController,
} from '../controllers/student.js';

const router = express.Router();

router.get('/', getStudentsController);

router.get('/:id', getStudentByIdController);

router.post('/', createStudentController);

router.delete('/:id', deleteStudentController);

router.put('/:id', replaceStudentController);

router.patch('/:id', updateStudentController);

export default router;
