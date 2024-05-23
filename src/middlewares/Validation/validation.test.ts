import { describe, expect, it, vi } from "vitest";
import { validation } from "./validation";
import { UserSchema } from "../../schemas/UserSchema";
import type { NextFunction, Request, Response } from "express";

describe("Validation middleware tests", () => {
	const mockRequest = (body: { email?: string; password?: string }) => {
		return { body } as Request;
	};

	const mockResponse = () => {
		const res = {} as Response;
		res.status = vi.fn().mockReturnValue(res);
		res.json = vi.fn().mockReturnValue(res);

		return res;
	};

	const mockNext = () => vi.fn() as unknown as NextFunction;

	it("Should have call next with no arguments, if validation pass", async () => {
		const validationMiddleware = validation(UserSchema);

		const req = mockRequest({ email: "test@email.com", password: "1234" });
		const res = mockResponse();
		const next = mockNext();

		await validationMiddleware(req, res, next);

		expect(next).toHaveBeenCalled();
		expect(next).toHaveBeenCalledWith();
	});

	it("Should have call next with an error, if the validation fails", async () => {
		const validationMiddleware = validation(UserSchema);

		const req = mockRequest({ email: "test@email.com" });
		const res = mockResponse();
		const next = mockNext();

		await validationMiddleware(req, res, next);

		expect(next).toHaveBeenCalled();
		expect(next).toHaveBeenCalledWith(expect.any(Error));
	});
});
