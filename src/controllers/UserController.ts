import { Request, Response } from "express";
import { UserService } from "../services/UserService";
import { TryCatchHandler } from "../helpers/TryCatchHandler";

class UserController {
  private userService;

  constructor(userService: UserService) {
    this.userService = userService;
  }

  addNewUser = TryCatchHandler(async (req: Request, res: Response) => {
    const newUser = await this.userService.addNewUser(req.body);

    return res.status(201).json(newUser);
  });

  login = TryCatchHandler(async (req: Request, res: Response) => {
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
  });

  refreshToken = TryCatchHandler(async (req: Request, res: Response) => {
    const { refreshToken } = req.cookies;

    if (!refreshToken) throw new Error("Token not found");

    const newAccessToken = this.userService.refreshToken(refreshToken);

    return res.status(200).json(newAccessToken);
  });

  deleteUser = TryCatchHandler(async (req: Request, res: Response) => {
    return res.status(200).json("Delete a User");
  });

  allUsers = async (req: Request, res: Response) => {
    const allUsers = await this.userService.listAllUsers();

    return res.status(200).json(allUsers);
  };
}

export { UserController };
