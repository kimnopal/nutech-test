import jwt from "jsonwebtoken";
import { jwtConfig } from "../config/jwt";
import { TokenPayload } from "../types/membership.types";

export function generateToken(email: string): string {
  const payload: TokenPayload = {
    email,
  };

  return jwt.sign(payload, jwtConfig.secret, {
    expiresIn: jwtConfig.expiresIn,
  });
}

export function verifyToken(token: string): TokenPayload | null {
  try {
    const decoded = jwt.verify(token, jwtConfig.secret) as TokenPayload;
    return decoded;
  } catch {
    return null;
  }
}
