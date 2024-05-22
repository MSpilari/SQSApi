import bcrypt from "bcrypt";
/**
 * Compares a plain text password with a hashed password from the database.
 *
 * @param passwordInput - The plain text password input.
 * @param passwordDb - The hashed password from the database.
 * @returns A boolean indicating whether the passwords match.
 */

const PasswordCompare = async (
	passwordInput: string,
	passwordDb: string,
): Promise<boolean> => {
	const isEqual = await bcrypt.compare(passwordInput, passwordDb);

	return isEqual;
};

export { PasswordCompare };
