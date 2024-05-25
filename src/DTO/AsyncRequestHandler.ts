import type { NextFunction, Request, Response } from "express";

type AsyncRequestHandler = (
	req: Request,
	res: Response,
	next: NextFunction,
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
) => Promise<any>;

export type { AsyncRequestHandler };
