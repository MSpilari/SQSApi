import path from "node:path";
import swaggerJsDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const swaggerDefinition = {
	openapi: "3.0.0",
	info: {
		title: "Catalog SQS API",
		version: "1.0.0",
		description: "Api documentation with Swagger",
	},
	servers: [
		{
			url: "http://localhost:3333", // URL base da API
			description: "Production server",
		},
		{
			url: "http://localhost:6666", // URL base da API
			description: "Development server",
		},
	],
};

const options = {
	swaggerDefinition,
	apis: [
		path.resolve(__dirname, "../docs/swagger/tags.@(js|ts)"),
		path.resolve(__dirname, "../docs/swagger/routes/*.@(js|ts)"),
		path.resolve(__dirname, "../docs/swagger/components/*.@(js|ts)"),
	],
};

const swaggerSpec = swaggerJsDoc(options);

export { swaggerUi, swaggerSpec };
