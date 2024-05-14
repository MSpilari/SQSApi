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

  login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = await this.userService.login(req.body);

      return res
        .status(200)
        .cookie("jwt", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
          maxAge: 60000,
        })
        .json({ success: true, message: "Login successfull" });
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
