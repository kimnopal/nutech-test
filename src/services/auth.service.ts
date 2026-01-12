import bcrypt from "bcryptjs";
import * as userRepository from "../repositories/user.repository";
import * as tokenService from "./token.service";
import { LoginData } from "../types/membership.types";

const SALT_ROUNDS = 10;

export interface RegistrationResult {
  success: boolean;
  message: string;
}

export interface LoginResult {
  success: boolean;
  message: string;
  data?: LoginData;
}

export async function register(
  email: string,
  password: string,
  firstName: string,
  lastName: string
): Promise<RegistrationResult> {
  const user = await userRepository.findUserByEmail(email);
  if (user) {
    return {
      success: false,
      message: "Email sudah terdaftar",
    };
  }

  const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

  await userRepository.createUser(email, hashedPassword, firstName, lastName);

  return {
    success: true,
    message: "Registrasi berhasil silahkan login",
  };
}

export async function login(
  email: string,
  password: string
): Promise<LoginResult> {
  const user = await userRepository.findUserByEmail(email);
  if (!user) {
    return {
      success: false,
      message: "Username atau password salah",
    };
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return {
      success: false,
      message: "Username atau password salah",
    };
  }

  const token = tokenService.generateToken(user.email);

  return {
    success: true,
    message: "Login Sukses",
    data: { token },
  };
}
