import { Request, Response, NextFunction } from "express";
import * as tokenService from "../services/token.service";
import { sendInvalidToken } from "../utils/response";

export function authenticate(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    sendInvalidToken(res, "Token tidak valid atau kadaluwarsa");
    return;
  }

  const parts = authHeader.split(" ");
  if (parts.length !== 2 || parts[0] !== "Bearer") {
    sendInvalidToken(res, "Token tidak valid atau kadaluwarsa");
    return;
  }

  const token = parts[1];
  const payload = tokenService.verifyToken(token);

  if (!payload) {
    sendInvalidToken(res, "Token tidak valid atau kadaluwarsa");
    return;
  }

  req.user = payload;
  next();
}
