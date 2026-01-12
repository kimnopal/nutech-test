import { Request, Response } from "express";
import * as authService from "../services/auth.service";
import * as userService from "../services/user.service";
import {
  sendSuccess,
  sendValidationError,
  sendInvalidCredentials,
  sendError,
} from "../utils/response";
import { deleteUploadedFile } from "../utils/file.util";
import {
  RegistrationRequest,
  LoginRequest,
  UpdateProfileRequest,
} from "../types/membership.types";

export async function register(req: Request, res: Response): Promise<void> {
  try {
    const { email, password, first_name, last_name } =
      req.body as RegistrationRequest;

    const result = await authService.register(
      email,
      password,
      first_name,
      last_name
    );

    if (!result.success) {
      sendValidationError(res, result.message);
      return;
    }

    sendSuccess(res, result.message, null);
  } catch (error) {
    console.error("Registration error:", error);
    sendValidationError(res, "Registrasi gagal");
  }
}

export async function login(req: Request, res: Response): Promise<void> {
  try {
    const { email, password } = req.body as LoginRequest;

    const result = await authService.login(email, password);

    if (!result.success) {
      sendInvalidCredentials(res, result.message);
      return;
    }

    sendSuccess(res, result.message, result.data);
  } catch (error) {
    console.error("Login error:", error);
    sendValidationError(res, "Login gagal");
  }
}

export async function getProfile(req: Request, res: Response): Promise<void> {
  try {
    const email = req.user!.email;

    const result = await userService.getProfile(email);

    if (!result.success) {
      sendError(res, result.message, 404);
      return;
    }

    sendSuccess(res, result.message, result.profile);
  } catch (error) {
    console.error("Get profile error:", error);
    sendError(res, "Gagal mengambil profile");
  }
}

export async function updateProfile(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const email = req.user!.email;
    const { first_name, last_name } = req.body as UpdateProfileRequest;

    const result = await userService.updateProfile(
      email,
      first_name,
      last_name
    );

    if (!result.success) {
      sendError(res, result.message);
      return;
    }

    sendSuccess(res, result.message, result.profile);
  } catch (error) {
    console.error("Update profile error:", error);
    sendError(res, "Gagal update profile");
  }
}

export async function updateProfileImage(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const email = req.user!.email;

    if (!req.file) {
      sendValidationError(res, "Format Image tidak sesuai");
      return;
    }

    const result = await userService.updateProfileImage(
      email,
      req.file.filename
    );

    if (!result.success) {
      sendError(res, result.message);
      return;
    }

    sendSuccess(res, result.message, result.profile);
  } catch (error) {
    console.error("Update profile image error:", error);
    if (req.file) {
      deleteUploadedFile(req.file.filename);
    }
    sendError(res, "Gagal update profile image");
  }
}
