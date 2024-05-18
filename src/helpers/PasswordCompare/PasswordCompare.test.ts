import { describe, it, expect } from "vitest";
import bcrypt from "bcrypt";
import { PasswordCompare } from "./PasswordCompare";

describe("PasswordCompare method tests", () => {
  const plainTextPassword = "password123";
  const hashedPassword = bcrypt.hashSync(plainTextPassword, 10);

  it("should return true for matching passwords", async () => {
    const result = await PasswordCompare(plainTextPassword, hashedPassword);

    expect(result).toBe(true);
  });

  it("should return false for non-matching passwords", async () => {
    const result = await PasswordCompare("wrongPassword", hashedPassword);

    expect(result).toBe(false);
  });

  it("should return false for empty passwords", async () => {
    const result = await PasswordCompare("", hashedPassword);

    expect(result).toBe(false);
  });
});
