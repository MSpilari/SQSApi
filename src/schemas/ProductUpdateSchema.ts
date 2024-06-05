import Joi from "joi";

const ProductUpdateSchema = Joi.object({
	title: Joi.string().optional(),
	description: Joi.string().optional(),
	price: Joi.number().optional(),
})
	.or("title", "description", "price")
	.messages({
		"fields.missing": "At least title, description or price must be present.",
	});

export { ProductUpdateSchema };
