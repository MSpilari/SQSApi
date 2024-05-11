import { NextFunction, Request, Response } from "express";
import { UserService } from "../services/UserService";

class UserController {
  private userService;

  constructor(userService: UserService) {
    this.userService = userService;
  }

  addNewUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const newUser = await this.userService.addNewUser(req.body);

      return res.status(201).json(newUser);
    } catch (error) {
      next(error);
    }
  };

  allUsers = async (req: Request, res: Response) => {
    const allUsers = await this.userService.listAllUsers();

    return res.status(200).json(allUsers);
  };
}

export { UserController };
