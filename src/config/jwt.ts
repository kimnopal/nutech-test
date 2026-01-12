import dotenv from "dotenv";

dotenv.config();

export function parseExpiresInSeconds(expiresIn: string): number {
  const match = expiresIn.match(/^(\d+)([smhd])$/);
  if (!match) {
    return 12 * 60 * 60; // Default 12 hours in seconds
  }

  const value = parseInt(match[1], 10);
  const unit = match[2];

  switch (unit) {
    case "s":
      return value;
    case "m":
      return value * 60;
    case "h":
      return value * 60 * 60;
    case "d":
      return value * 24 * 60 * 60;
    default:
      return 12 * 60 * 60;
  }
}

const expiresInStr = process.env.JWT_EXPIRES_IN || "12h";

export const jwtConfig = {
  secret: process.env.JWT_SECRET || "default_jwt_secret_change_me",
  expiresIn: parseExpiresInSeconds(expiresInStr), // 12 hours in seconds
};
