import { Request, Response, NextFunction } from 'express';
import { ZodSchema } from 'zod';
import { sendValidationError } from '../utils/response';

export function validate(schema: ZodSchema) {
  return (req: Request, res: Response, next: NextFunction): void => {
    try {
      schema.parse(req.body);
      next();
    } catch (error: any) {
      if (error.errors && error.errors.length > 0) {
        sendValidationError(res, error.errors[0].message);
        return;
      }
      sendValidationError(res, 'Validation error');
    }
  };
}
