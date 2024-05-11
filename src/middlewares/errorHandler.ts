import { ErrorRequestHandler, Request, Response, NextFunction } from "express";

const errorHandler: ErrorRequestHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  return res
    .status(500)
    .json({
      name: error.name,
      message: error.message,
      success: false,
      stack: process.env.NODE_ENV === "development" ? error.stack : {},
    });
};

export { errorHandler };
