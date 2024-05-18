import { UserPayload } from "../DTO/UserPayload";

declare global {
  namespace Express {
    interface Request {
      user?: UserPayload;
    }
  }
}
