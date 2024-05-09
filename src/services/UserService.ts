import { Prisma } from "@prisma/client";
import { DefaultArgs } from "@prisma/client/runtime/library";

type Body = {
  email: string;
  password: string;
};

class UserService {
  private userRepository;

  constructor(userRepository: Prisma.UserDelegate<DefaultArgs>) {
    this.userRepository = userRepository;
  }

  addNewUser = async ({ email, password }: Body) => {
    const newUser = await this.userRepository.create({
      data: {
        email,
        password,
      },
    });

    return newUser;
  };
}

export { UserService };
