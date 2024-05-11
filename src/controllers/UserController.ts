import { Request, Response } from "express";
import { UserService } from "../services/UserService";

class UserController {
  private userService;

  constructor(userService: UserService) {
    this.userService = userService;
  }

  addNewUser = async (req: Request, res: Response) => {
    const newUser = await this.userService.addNewUser(req.body);

    return res.status(201).json(newUser);
  };
}

export { UserController };
