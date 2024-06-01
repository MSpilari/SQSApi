import Joi from "joi";

const CategoryUpdateSchema = Joi.object({
	title: Joi.string().optional(),
	description: Joi.string().optional(),
})
	.or("title", "description")
	.messages({
		"fields.missing": "At least title or description must be present.",
	});

export { CategoryUpdateSchema };
