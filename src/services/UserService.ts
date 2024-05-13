import { Prisma } from "@prisma/client";
import { DefaultArgs } from "@prisma/client/runtime/library";
import { User } from "../DTO/User";
import { PasswordHash } from "../helpers/PasswordHash";

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

    const newUser = await this.userRepository.create({
      data: {
        email,
        password: hashPassword,
      },
    });

    return newUser;
  };

  listAllUsers = async () => {
    const allUsers = await this.userRepository.findMany();

    return allUsers;
  };
}

export { UserService };
