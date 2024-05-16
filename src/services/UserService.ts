import { Prisma } from "@prisma/client";
import { DefaultArgs } from "@prisma/client/runtime/library";
import { User } from "../DTO/User";
import { PasswordHash } from "../helpers/PasswordHash";
import { PasswordCompare } from "../helpers/PasswordCompare";
import { JWTGenerator } from "../helpers/JWTGenerator";
import { RefreshJWTGenerator } from "../helpers/RefreshJWTGenerator";
import { JWTVerifier } from "../helpers/JWTVerifier";
import { UserPayload } from "../DTO/UserPayload";

class UserService {
  private userRepository;

  constructor(userRepository: Prisma.UserDelegate<DefaultArgs>) {
    this.userRepository = userRepository;
  }

  addNewUser = async ({ email, password }: User) => {
    const emailExists = await this.userRepository.findFirst({
      where: { email },
    });

    if (emailExists) throw new Error("email already exists");

    const hashPassword = await PasswordHash(password);

    await this.userRepository.create({
      data: {
        email,
        password: hashPassword,
      },
    });

    return { message: "User created successfully !" };
  };

  login = async ({ email, password }: User) => {
    const userExists = await this.userRepository.findFirst({
      where: { email },
    });

    if (!userExists) throw new Error("Email does not exists !");

    const isPasswordValid = await PasswordCompare(
      password,
      userExists.password
    );

    if (!isPasswordValid) throw new Error("Email/Password does not exists !");

    const accessToken = JWTGenerator(userExists.email, userExists.id);
    const refreshToken = RefreshJWTGenerator(userExists.email, userExists.id);

    return {
      accessToken,
      refreshToken,
      user: userExists.email,
      userId: userExists.id,
    };
  };

  listAllUsers = async () => {
    const allUsers = await this.userRepository.findMany();

    return allUsers;
  };
}

export { UserService };
