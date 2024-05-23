import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import type { UserPayload } from "../DTO/UserPayload";

const validateJWT = (secret: string) => {
	return (req: Request, res: Response, next: NextFunction) => {
		const authToken = req.headers.authorization;

		if (!authToken) throw new Error("Token not found");

		const [_, token] = authToken.split(" ");

		jwt.verify(token, secret, (err, user) => {
			if (err) next(err);

			req.user = user as UserPayload;
		});

		next();
	};
};

export { validateJWT };
