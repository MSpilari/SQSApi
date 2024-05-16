import jwt from "jsonwebtoken";

const SECRET = process.env.REFRESH_SECRET;

const RefreshJWTGenerator = (email: string, id: number) => {
  const payload = {
    email,
    userId: id,
  };
  if (!SECRET) throw new Error("Failed to get REFRESH_SECRET to token.");

  return jwt.sign(payload, SECRET, { expiresIn: "24h" });
};

export { RefreshJWTGenerator };
