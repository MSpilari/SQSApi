import jwt from "jsonwebtoken";

/**
 *
 * @param email - The email of the user
 * @param id - The ID from the user
 * @param secret - The secret key to sign the token
 * @param expiresIn - Optional duration for the token to expire in seconds (default: 15 minutes).
 * @returns The generated JWT token as a string.
 */

const JWTGenerator = (
  email: string,
  id: number,
  secret: string,
  expiresIn: number = 15 * 60
): string => {
  if (!secret) throw new Error("Failed to get SECRET to token.");

  const payload = {
    email,
    userId: id,
  };

  return jwt.sign(payload, secret, { expiresIn });
};

export { JWTGenerator };
