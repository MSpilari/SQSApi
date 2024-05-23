import type { NextFunction, Request, Response } from "express";
import Joi from "joi";
import { describe, expect, it, vi } from "vitest";
import { errorHandler } from "./errorHandler";

describe("errorHandler method middleware tests", () => {
	const env = process.env.NODE_ENV;
	const mockRequest = {} as Request;

	const mockResponse = () => {
		const res = {} as Response;
		res.status = vi.fn().mockReturnValue(res);
		res.json = vi.fn().mockReturnValue(res);
		return res;
	};

	const mockNext = vi.fn() as unknown as NextFunction;

	it("Should handle Joi validation error with status 400", () => {
		const error = new Joi.ValidationError("Validation Error", [], {});
		const req = mockRequest;
		const res = mockResponse();
		const next = mockNext;

		errorHandler(error, req, res, next);

		expect(res.status).toHaveBeenCalledWith(400);
		expect(res.json).toHaveBeenCalledWith({
			success: false,
			statusCode: 400,
			name: error.name,
			message: error.message,
			stack:
				env === "development" || env === "test"
					? expect.any(String)
					: undefined,
		});
	});

	it("Should handle generic Error with 500 status", () => {
		const error = new Error("Generic Error");
		const req = mockRequest;
		const res = mockResponse();
		const next = mockNext;

		errorHandler(error, req, res, next);

		expect(res.status).toHaveBeenCalledWith(500);
		expect(res.json).toHaveBeenCalledWith({
			success: false,
			statusCode: 500,
			name: error.name,
			message: error.message,
			stack:
				env === "development" || env === "test"
					? expect.any(String)
					: undefined,
		});
	});

	it("Should not include stack trace, if NODE_ENV is not development", () => {
		process.env.NODE_ENV = "production";
		const error = new Error("Generic Error");
		const req = mockRequest;
		const res = mockResponse();
		const next = mockNext;

		errorHandler(error, req, res, next);

		expect(res.status).toHaveBeenCalledWith(500);
		expect(res.json).toHaveBeenCalledWith({
			success: false,
			statusCode: 500,
			name: error.name,
			message: error.message,
			stack: undefined,
		});

		process.env.NODE_ENV = "test";
	});

	it("should log error in development environment", () => {
		process.env.NODE_ENV = "development";
		const error = new Error("Generic Error");
		const req = mockRequest;
		const res = mockResponse();
		const next = mockNext;
		const consoleErrorSpy = vi
			.spyOn(console, "log")
			.mockImplementation(() => {});

		errorHandler(error, req, res, next);

		expect(consoleErrorSpy).toHaveBeenCalledWith(error);
		consoleErrorSpy.mockRestore();

		process.env.NODE_ENV = "test";
	});
});
