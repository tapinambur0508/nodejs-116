/* eslint-disable no-unused-vars */

export function errorHandler(error, req, res, next) {
  console.error(error);

  res.status(500).json({ status: 500, message: 'Internal Server Error' });
}
