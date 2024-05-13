import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET;

const JWTGenerator = (email: string, id: number) => {
  const payload = {
    email,
    userId: id,
  };

  if (!SECRET) throw new Error("Failed to get SECRET to token.");

  return jwt.sign(payload, SECRET, { expiresIn: 60 });
};

export { JWTGenerator };
