import { Prisma } from "@prisma/client";
import { DefaultArgs } from "@prisma/client/runtime/library";
import { User } from "../DTO/User";

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

    const newUser = await this.userRepository.create({
      data: {
        email,
        password,
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
