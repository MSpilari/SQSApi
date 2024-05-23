import type { NextFunction, Request, Response } from "express";

const TryCatchHandler = (fn: Function) => {
	return (req: Request, res: Response, next: NextFunction) => {
		Promise.resolve(fn(req, res, next)).catch(next);
	};
};

export { TryCatchHandler };
