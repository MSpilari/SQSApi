import jwt from "jsonwebtoken";
import { describe, expect, it } from "vitest";
import { JWTGenerator } from "./JWTGenerator";

describe("JWTGenerator method tests", () => {
  const email = "user@example.com";
  const userId = 1;
  const secret = "testSecret";

  it("should generate a valid token with the correct payload", () => {
    const token = JWTGenerator(email, userId, secret);
    const verifiedToken = jwt.verify(token, secret) as jwt.JwtPayload;

    expect(verifiedToken).toHaveProperty("email", email);
    expect(verifiedToken).toHaveProperty("userId", userId);
  });

  it("should generate a token with a default expiration time", () => {
    const token = JWTGenerator(email, userId, secret);
    const verifiedToken = jwt.verify(token, secret) as jwt.JwtPayload;

    const currentTime = Math.floor(Date.now() / 1000);
    const defaultExpiry = 15 * 60;
    const expectedExpiry = currentTime + defaultExpiry;

    expect(verifiedToken.exp).toBeGreaterThanOrEqual(currentTime);
    expect(verifiedToken.exp).toBeLessThanOrEqual(expectedExpiry);
  });

  it("should generate a token with a custom expiration time", () => {
    const token = JWTGenerator(email, userId, secret, 24 * 3600);
    const verifiedToken = jwt.verify(token, secret) as jwt.JwtPayload;

    const currentTime = Math.floor(Date.now() / 1000);
    const expectedExpiry = currentTime + 24 * 3600;

    expect(verifiedToken.exp).toBeGreaterThanOrEqual(currentTime);
    expect(verifiedToken.exp).toBeLessThanOrEqual(expectedExpiry);
  });

  it("should throw an error if the secret is not provided", () => {
    expect(() => JWTGenerator(email, userId, "")).toThrowError(
      "Failed to get SECRET to token"
    );
  });
});
