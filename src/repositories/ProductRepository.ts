import { prismaClient } from "../db/prismaClient";

const productRepository = prismaClient.product;

export { productRepository };
