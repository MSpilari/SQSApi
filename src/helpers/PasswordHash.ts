import bcrypt from "bcrypt";

const PasswordHash = async (password: string) => {
  const saltRounds = 10;

  const hashedPassword = await bcrypt.hash(password, saltRounds);

  return hashedPassword;
};

export { PasswordHash };
