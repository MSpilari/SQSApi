import { Request } from "express";
import { UserService } from "../services/UserService";

class UserController {
  private userService;

  constructor(userService: UserService) {
    this.userService = userService;
  }

  addNewUser = async (req: Request, res: Response) => {
    return await this.userService.addNewUser(req.body);
  };
}

export { UserController };
