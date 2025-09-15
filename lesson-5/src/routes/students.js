import express from 'express';

import {
  getStudentsController,
  getStudentByIdController,
} from '../controllers/student.js';

const router = express.Router();

router.get('/', getStudentsController);

router.get('/:id', getStudentByIdController);

export default router;
