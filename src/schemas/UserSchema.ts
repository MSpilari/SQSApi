import Joi from "joi";

const UserSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(3).required(),
});

export { UserSchema };
