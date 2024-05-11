import { ErrorRequestHandler, Request, Response, NextFunction } from "express";
import Joi from "joi";

const errorHandler: ErrorRequestHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let statusCode = 500;

  if (error instanceof Joi.ValidationError) statusCode = 400;

  return res.status(statusCode).json({
    success: false,
    name: error.name,
    message: error.message,
    stack: process.env.NODE_ENV === "development" ? error.stack : {},
  });
};

export { errorHandler };
