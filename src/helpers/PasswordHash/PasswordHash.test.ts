import { describe, it, expect } from "vitest";
import { PasswordHash } from "./PasswordHash";
import bcrypt from "bcrypt";

describe("PasswordHash method tests", () => {
  const plainTextPassword = "password123";

  it("should return a hashed password", async () => {
    const hashedPassword = await PasswordHash(plainTextPassword);
    const isMatch = await bcrypt.compare(plainTextPassword, hashedPassword);
    expect(isMatch).toBe(true);
  });
});
