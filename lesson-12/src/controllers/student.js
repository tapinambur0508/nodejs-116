import * as fs from 'node:fs/promises';
import path from 'node:path';

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
import { uploadToCloudinary } from '../utils/uploadToCloudinary.js';
import { getEnvVariable } from '../utils/getEnvVariable.js';

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
  let avatar;

  if (getEnvVariable('UPLOAD_CLOUDINARY') === 'true') {
    const response = await uploadToCloudinary(req.file.path);
    await fs.unlink(req.file.path);
    avatar = response.secure_url;
  } else {
    await fs.rename(
      req.file.path,
      path.resolve('src/uploads/avatars', req.file.filename),
    );
    avatar = `http://localhost:9090/avatars/${req.file.filename}`;
  }

  const student = await createStudent({
    ...req.body,
    avatar,
    ownerId: req.user.id,
  });

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
