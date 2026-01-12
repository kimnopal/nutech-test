import { Response } from "express";
import { ApiResponse } from "../types";

export enum StatusCode {
  SUCCESS = 200,
  VALIDATION_ERROR = 400,
  INVALID_CREDENTIALS = 103,
  INVALID_TOKEN = 401,
}

export function sendSuccess<T>(
  res: Response,
  message: string,
  data: T = null as T,
  httpStatus: number = 200
): Response {
  const response: ApiResponse<T> = {
    status: StatusCode.SUCCESS,
    message,
    data,
  };
  return res.status(httpStatus).json(response);
}

export function sendValidationError(res: Response, message: string): Response {
  const response: ApiResponse = {
    status: StatusCode.VALIDATION_ERROR,
    message,
    data: null,
  };
  return res.status(400).json(response);
}

export function sendInvalidCredentials(
  res: Response,
  message: string = "Username atau password salah"
): Response {
  const response: ApiResponse = {
    status: StatusCode.INVALID_CREDENTIALS,
    message,
    data: null,
  };
  return res.status(401).json(response);
}

export function sendInvalidToken(
  res: Response,
  message: string = "Token tidak valid atau kadaluwarsa"
): Response {
  const response: ApiResponse = {
    status: StatusCode.INVALID_TOKEN,
    message,
    data: null,
  };
  return res.status(401).json(response);
}

export function sendError(
  res: Response,
  message: string,
  statusCode: number = 500
): Response {
  const response: ApiResponse = {
    status: statusCode,
    message,
    data: null,
  };
  return res.status(statusCode).json(response);
}
