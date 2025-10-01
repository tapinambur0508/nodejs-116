import createHttpError from 'http-errors';

import {
  getStudents,
  getStudentById,
  createStudent,
  deleteStudent,
  replaceStudent,
  updateStudent,
} from '../services/student.js';

import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parseSortParams } from '../utils/parseSortParams.js';
import { parseFilterParams } from '../utils/parseFilterParams.js';

export async function getStudentsController(req, res) {
  const { page, perPage } = parsePaginationParams(req.query);
  const { sortBy, sortOrder } = parseSortParams(req.query);
  const filter = parseFilterParams(req.query);

  const students = await getStudents({
    page,
    perPage,
    sortBy,
    sortOrder,
    filter,
    ownerId: req.user.id,
  });

  res.json({
    status: 200,
    message: 'Students get successfully',
    data: students,
  });
}

export async function getStudentByIdController(req, res, next) {
  const { id } = req.params;

  const student = await getStudentById(id);

  if (student === null) {
    // return next(new createHttpError.NotFound("Student not found"));
    throw new createHttpError.NotFound('Student not found');
  }

  if (student.ownerId.toString() !== req.user.id.toString()) {
    // throw new createHttpError.Forbidden("Student is denied");
    throw new createHttpError.NotFound('Student not found');
  }

  res.json({
    status: 200,
    message: 'Student get successfully',
    data: student,
  });
}

export async function createStudentController(req, res) {
  const student = await createStudent({ ...req.body, ownerId: req.user.id });

  res.status(201).json({
    status: 201,
    message: 'Student created successfully',
    data: student,
  });
}

export async function deleteStudentController(req, res) {
  const { id } = req.params;

  const result = await deleteStudent(id);

  if (result === null) {
    throw new createHttpError.NotFound('Student not found');
  }

  res.json({ status: 200, message: 'Student deleted successfully' });
}

export async function replaceStudentController(req, res) {
  const result = await replaceStudent(req.params.id, req.body);

  if (result.updatedExisting === true) {
    return res.json({
      status: 200,
      message: 'Student replaced successfully',
      data: result.value,
    });
  }

  res.status(201).json({
    status: 201,
    message: 'Student created successfully',
    data: result.value,
  });
}

export async function updateStudentController(req, res) {
  const student = await updateStudent(req.params.id, req.body);

  if (student === null) {
    throw new createHttpError.NotFound('Student not found');
  }

  res.json({
    status: 200,
    message: 'Student update successfully',
    data: student,
  });
}
