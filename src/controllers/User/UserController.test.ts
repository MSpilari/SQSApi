import { type Mock, beforeEach, describe, expect, it, vi } from "vitest";
import type { UserService } from "../../services/UserService";
import { UserController } from "./UserController";
import type { NextFunction, Request, Response } from "express";

describe("User Controller tests", () => {
	let userService: UserService;
	let userController: UserController;
	let req: Request;
	let res: Response;
	let next: NextFunction;

	beforeEach(() => {
		userService = {
			addNewUser: vi.fn(),
			login: vi.fn(),
			refreshToken: vi.fn(),
			deleteUser: vi.fn(),
			listAllUsers: vi.fn(),
		} as unknown as UserService;

		userController = new UserController(userService);

		req = {} as Request;

		res = {
			status: vi.fn().mockReturnThis(),
			json: vi.fn().mockReturnThis(),
			cookie: vi.fn().mockReturnThis(),
		} as unknown as Response;

		next = vi.fn() as unknown as NextFunction;
	});

	it("Should add a new user and return status 201", async () => {
		const newUser = { id: 1, email: "test@email.com", password: "12345" };

		(userService.addNewUser as Mock).mockResolvedValue(newUser);

		req.body = { email: "test@email.com", password: "12345" };

		await userController.addNewUser(req, res, next);

		expect(res.status).toHaveBeenCalledWith(201);
		expect(res.json).toHaveBeenCalledWith(newUser);
		expect(next).toHaveBeenCalled();
	});

	it("Should login a user and return status 200", async () => {
		const user = { id: 1, email: "test@email.com", password: "12345" };
		const tokens = {
			accessToken: "access-token",
			refreshToken: "refresh-token",
		};

		(userService.login as Mock).mockResolvedValue({
			...tokens,
			user,
			userId: user.id,
		});

		req.body = { email: "test@email.com", password: "12345" };

		await userController.login(req, res, next);

		expect(res.status).toHaveBeenCalledWith(200);
		expect(res.cookie).toHaveBeenCalledWith(
			"refreshToken",
			"refresh-token",
			expect.any(Object),
		);
		expect(res.json).toHaveBeenCalledWith({
			success: true,
			accessToken: "access-token",
			user,
			userId: user.id,
		});
	});
});
