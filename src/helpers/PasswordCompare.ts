import bcrypt from "bcrypt";

const PasswordCompare = async (passwordInput: string, passwordDb: string) => {
  const isEqual = await bcrypt.compare(passwordInput, passwordDb);

  return isEqual;
};

export { PasswordCompare };
