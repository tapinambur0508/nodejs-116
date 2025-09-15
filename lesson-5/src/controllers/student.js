import { getStudents, getStudentById } from '../services/student.js';

export async function getStudentsController(req, res) {
  const students = await getStudents();

  res.json({
    status: 200,
    message: 'Students get successfully',
    data: students,
  });
}

export async function getStudentByIdController(req, res) {
  const { id } = req.params;

  const student = await getStudentById(id);

  if (student === null) {
    return res.status(404).json({
      status: 404,
      message: 'Student not found',
    });
  }

  res.json({
    status: 200,
    message: 'Student get successfully',
    data: student,
  });
}
