import { describe, expect, it } from "vitest";
import jwt from "jsonwebtoken";
import { JWTVerifier } from "./JWTVerifier";

describe("JWTVerifier method tests", () => {
  const secret = "testSecret";
  const validToken = jwt.sign(
    { email: "user@example.com", userId: 1 },
    secret,
    { expiresIn: "1h" }
  );
  const invalidToken = "invalidToken";

  it("should verify a valid token and return the payload", () => {
    const payload = JWTVerifier(validToken, secret);

    expect(payload).toHaveProperty("email", "user@example.com");
    expect(payload).toHaveProperty("userId", 1);
  });

  it("should throw an error for an invalid token", () => {
    expect(() => JWTVerifier(invalidToken, secret)).toThrowError(
      "Token verification failed"
    );
  });

  it("should throw an error for an expired token", () => {
    const expiredToken = jwt.sign(
      { email: "user@example.com", userId: 1 },
      secret,
      { expiresIn: "-1h" }
    );

    expect(() => JWTVerifier(expiredToken, secret)).toThrowError(
      "Token verification failed"
    );
  });
});
