import "./dotenvConfig";
import { afterAll, beforeEach } from "vitest";
import { prismaClient } from "../db/prismaClient";

afterAll(async () => {
  await prismaClient.$disconnect();
});

beforeEach(async () => {
  await prismaClient.user.deleteMany({});
  await prismaClient.product.deleteMany({});
  await prismaClient.category.deleteMany({});
});
