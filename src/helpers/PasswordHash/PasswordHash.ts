import bcrypt from "bcrypt";

/**
 * Hashes a plain text password using bcrypt.
 *
 * @param password - The plain text password to hash.
 * @param saltRounds - The number of salt rounds to use (default is 10).
 * @returns The hashed password.
 */

const PasswordHash = async (
  password: string,
  saltRounds: number = 10
): Promise<string> => {
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  return hashedPassword;
};

export { PasswordHash };
