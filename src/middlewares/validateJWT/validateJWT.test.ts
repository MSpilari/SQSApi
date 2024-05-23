import { describe, expect, it, vi, type Mock } from "vitest";
import { validateJWT } from "./validateJWT";
import jwt from "jsonwebtoken";
import type { NextFunction, Request, Response } from "express";
import type { UserPayload } from "../../DTO/UserPayload";

vi.mock("jsonwebtoken");

describe("ValidateJwt middleware method tests", () => {
	const secret = "testsecret";
	const validToken = "valid.token.here";
	const invalidToken = "invalid.token.here";
	const userPayload: UserPayload = {
		email: "test@email.com",
		userId: 1,
		iat: 1234566,
		exp: 12345566,
	};

	const mockRequest = (authorization?: string) =>
		({
			headers: { authorization },
		}) as unknown as Request;

	const mockResponse = () => {
		const res = {} as Response;
		res.status = vi.fn().mockReturnValue(res);
		res.json = vi.fn().mockReturnValue(res);
		return res;
	};

	const mockNext = vi.fn() as unknown as NextFunction;

	it("should call next with an error, if token is not found", () => {
		const req = mockRequest();
		const res = mockResponse();
		const next = mockNext;

		const middleware = validateJWT(secret);
		middleware(req, res, next);

		expect(next).toHaveBeenCalledWith(expect.any(Error));
	});

	it("should call next with an error, if token format is invalid", () => {
		const req = mockRequest("InvalidTokenFormat");
		const res = mockResponse();
		const next = mockNext;

		const middleware = validateJWT(secret);
		middleware(req, res, next);

		expect(next).toHaveBeenCalledWith(expect.any(Error));
	});

	it("should call next with an error, if token is invalid", () => {
		(jwt.verify as Mock).mockImplementation((token, secret, callback) => {
			callback(new Error("Token is invalid"), null);
		});

		const req = mockRequest(`Bearer ${invalidToken}`);
		const res = mockResponse();
		const next = mockNext;

		const middleware = validateJWT(secret);
		middleware(req, res, next);

		expect(next).toHaveBeenCalledWith(expect.any(Error));
	});

	it("should call next with no arguments, if token is valid", () => {
		(jwt.verify as Mock).mockImplementation((token, secret, callback) => {
			callback(null, userPayload);
		});

		const req = mockRequest(`Bearer ${validToken}`);
		const res = mockResponse();
		const next = mockNext;

		const middleware = validateJWT(secret);
		middleware(req, res, next);

		expect(next).toHaveBeenCalled();
		expect(next).toHaveBeenCalledWith();
		expect(req.user).toEqual(userPayload);
	});
});
