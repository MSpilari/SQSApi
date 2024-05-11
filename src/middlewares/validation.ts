import { NextFunction, Request, Response } from "express";
import Joi from "joi";

const validation = (schema: Joi.ObjectSchema) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const userInput = req.body;

    try {
      await schema.validateAsync(userInput, {
        errors: { wrap: { label: false } },
      });
    } catch (error) {
      next(error);
    }
  };
};

export { validation };
