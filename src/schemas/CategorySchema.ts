import Joi from "joi";

const CategorySchema = Joi.object({
	title: Joi.string().required(),
	description: Joi.string().required(),
	userID: Joi.number().required(),
});

export { CategorySchema };
