/* eslint-disable no-unused-vars */

export function notFoundHandler(req, res, next) {
  res.status(404).json({ status: 404, message: 'Not found' });
}
