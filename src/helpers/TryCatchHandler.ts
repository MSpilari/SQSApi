import type { NextFunction, Request, Response } from "express";
import type { AsyncRequestHandler } from "../DTO/AsyncRequestHandler";

const TryCatchHandler = (fn: AsyncRequestHandler) => {
	return async (req: Request, res: Response, next: NextFunction) => {
		try {
			await fn(req, res, next);
			next();
		} catch (error) {
			next(error);
		}
	};
};

export { TryCatchHandler };
