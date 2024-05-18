import jwt from "jsonwebtoken";

/**
 * Verifies a JWT token and returns the decoded payload.
 *
 * @param token - The token that you want to verify
 * @param secret - The secret key to sign the token
 * @returns - The decoded JWT payload if the token is valid.
 * @throws An error if the token is invalid or verification fails.
 */

const JWTVerifier = (token: string, secret: string): jwt.JwtPayload => {
  try {
    const payload = jwt.verify(token, secret) as jwt.JwtPayload;

    return payload;
  } catch (error) {
    throw new Error(`Token verification failed: ${(error as Error).message}`);
  }
};

export { JWTVerifier };
