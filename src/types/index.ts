import { TokenPayload } from "./membership.types";

export interface ApiResponse<T = null> {
  status: number;
  message: string;
  data: T;
}

declare global {
  namespace Express {
    interface Request {
      user?: TokenPayload;
    }
  }
}
