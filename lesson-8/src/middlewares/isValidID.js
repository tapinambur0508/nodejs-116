import { isValidObjectId } from 'mongoose';
import createHttpError from 'http-errors';

export function isValidID(req, res, next) {
  if (isValidObjectId(req.params.id) !== true) {
    throw new createHttpError.BadRequest('ID is not valid');
  }

  next();
}
