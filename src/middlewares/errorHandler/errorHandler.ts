import type {
	ErrorRequestHandler,
	Request,
	Response,
	NextFunction,
} from "express";
import Joi from "joi";

const formatErrorResponse = (error: Error, statusCode: number) => ({
	statusCode,
	success: false,
	name: error.name,
	message: error.message,
	stack:
		process.env.NODE_ENV === "development" || process.env.NODE_ENV === "test"
			? error.stack
			: undefined,
});

const errorHandler: ErrorRequestHandler = (
	error: Error,
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	let statusCode = 500;

	if (error instanceof Joi.ValidationError) statusCode = 400;

	if (process.env.NODE_ENV === "development") console.log(error);

	return res.status(statusCode).json(formatErrorResponse(error, statusCode));
};

export { errorHandler };
