import express from 'express';

import {
  getStudentsController,
  getStudentByIdController,
  createStudentController,
  deleteStudentController,
  replaceStudentController,
  updateStudentController,
} from '../controllers/student.js';

import { isValidID } from '../middlewares/isValidID.js';
import { validateBody } from '../middlewares/validateBody.js';

import { studentSchema, updateStudentSchema } from '../validation/student.js';

const router = express.Router();

router.get('/', getStudentsController);

router.get('/:id', isValidID, getStudentByIdController);

router.post('/', validateBody(studentSchema), createStudentController);

router.delete('/:id', isValidID, deleteStudentController);

router.put(
  '/:id',
  isValidID,
  validateBody(studentSchema),
  replaceStudentController,
);

router.patch(
  '/:id',
  isValidID,
  validateBody(updateStudentSchema),
  updateStudentController,
);

export default router;
