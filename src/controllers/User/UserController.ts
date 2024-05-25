import type { NextFunction, Request, Response } from "express";
import type { UserService } from "../../services/UserService";
import { TryCatchHandler } from "../../helpers/TryCatchHandler";

class UserController {
	private userService;

	private setRefreshTokenCookie(res: Response, refreshToken: string) {
		res.cookie("refreshToken", refreshToken, {
			httpOnly: true,
			secure: process.env.NODE_ENV === "production",
			sameSite: "strict",
			maxAge: 24 * 60 * 60 * 1000,
		});
	}

	private clearRefreshTokenCookie(res: Response) {
		res.cookie("refreshToken", "", {
			httpOnly: true,
			secure: process.env.NODE_ENV === "production",
			sameSite: "strict",
			expires: new Date(0),
		});
	}

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

			this.setRefreshTokenCookie(res, refreshToken);

			return res.status(200).json({ success: true, accessToken, user, userId });
		} catch (error) {
			next(error);
		}
	};

	refreshToken = async (req: Request, res: Response, next: NextFunction) => {
		try {
			const { refreshToken } = req.cookies;

			if (!refreshToken) throw new Error("Token not found");

			const newAccessToken = await this.userService.refreshToken(refreshToken);

			return res.status(200).json(newAccessToken);
		} catch (error) {
			next(error);
		}
	};

	deleteUser = async (req: Request, res: Response, next: NextFunction) => {
		try {
			if (!req.user) throw new Error("User not found");

			const userDeletedEmail = await this.userService.deleteUser(req.user);

			this.clearRefreshTokenCookie(res);

			return res.status(200).json(userDeletedEmail);
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
