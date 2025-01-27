import { ApiError } from '../exceptions/api.error';
import { NextFunction, Response, Request } from 'express';

export default function handleError(err: any, req: Request, res: Response, next: NextFunction) {
  if (err instanceof ApiError) {
    res.status(err.status).json({
      message: err.message,
      errors: err.errors,
    });
  } else {
    res.status(500).json({ message: 'Непредвиденная ошибка.', error: err.message });
  }
}
