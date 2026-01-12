export interface User {
  id: number;
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  profile_image: string | null;
  created_at: Date;
  updated_at: Date;
}

export interface UserProfile {
  email: string;
  first_name: string;
  last_name: string;
  profile_image: string | null;
}

export interface TokenPayload {
  email: string;
  iat?: number;
  exp?: number;
}

export interface LoginData {
  token: string;
}

export interface RegistrationRequest {
  email: string;
  first_name: string;
  last_name: string;
  password: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface UpdateProfileRequest {
  first_name: string;
  last_name: string;
}
