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
      const { accessToken, refreshToken, user, userId } =
        await this.userService.login(req.body);

      return res
        .status(200)
        .cookie("refreshToken", refreshToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
          maxAge: 24 * 60 * 60 * 1000,
        })
        .json({ success: true, accessToken, user, userId });
    } catch (error) {
      next(error);
    }
  };

  refreshToken = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { refreshToken } = req.cookies;

      if (!refreshToken) throw new Error("Token not found");

      const newAccessToken = this.userService.refreshToken(refreshToken);

      return res.status(200).json(newAccessToken);
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
