import { prismaClient } from "../db/prismaClient";

const categoryRepository = prismaClient.category;

export { categoryRepository };
