import Joi from "joi";

const ProductSchema = Joi.object({
	title: Joi.string().required(),
	description: Joi.string().required(),
	price: Joi.number().required(),
	categoryID: Joi.number().required(),
});

export { ProductSchema };
