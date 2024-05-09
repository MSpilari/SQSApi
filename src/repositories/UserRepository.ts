import { prismaClient } from "../db/prismaClient";

const userRepository = prismaClient.user;

export { userRepository };
