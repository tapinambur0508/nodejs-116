import { Student } from '../models/student.js';

export function getStudents() {
  return Student.find();
}

export function getStudentById(studentId) {
  return Student.findById(studentId);
}

export function createStudent(payload) {
  return Student.create(payload);
}

export function deleteStudent(studentId) {
  return Student.findByIdAndDelete(studentId); // Student.findOneAndDelete({ _id: studentId });
}

export async function replaceStudent(studentId, payload) {
  const result = await Student.findByIdAndUpdate(studentId, payload, {
    new: true,
    upsert: true,
    includeResultMetadata: true,
  });

  return {
    value: result.value,
    updatedExisting: result.lastErrorObject.updatedExisting,
  };
}

export async function updateStudent(studentId, payload) {
  return Student.findByIdAndUpdate(studentId, payload, { new: true });
}
