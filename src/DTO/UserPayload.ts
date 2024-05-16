import { JwtPayload } from "jsonwebtoken";

interface UserPayload extends JwtPayload {
  email: string;
  userId: number;
  iat: number;
  exp: number;
}

export { UserPayload };
