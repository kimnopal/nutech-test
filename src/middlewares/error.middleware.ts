import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';
import { sendValidationError, sendError } from '../utils/response';

export function errorHandler(
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
): void {
  console.error('Error:', err);

  if (err instanceof ZodError) {
    const firstError = err.errors[0];
    sendValidationError(res, firstError.message);
    return;
  }

  if (err.name === 'MulterError') {
    if ((err as any).code === 'LIMIT_FILE_SIZE') {
      sendValidationError(res, 'Ukuran file terlalu besar (maksimal 5MB)');
      return;
    }
    sendValidationError(res, 'Error upload file');
    return;
  }

  sendError(res, 'Internal server error', 500);
}

export function notFoundHandler(
  _req: Request,
  res: Response,
  _next: NextFunction
): void {
  sendError(res, 'Endpoint tidak ditemukan', 404);
}
