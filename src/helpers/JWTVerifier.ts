import jwt from "jsonwebtoken";

const JWTVerifier = (token: string, secret: string) => {
  const payload = jwt.verify(token, secret);

  return payload;
};

export { JWTVerifier };
