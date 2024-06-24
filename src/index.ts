import "./configs/dotenvConfig";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import express from "express";
import { errorHandler } from "./middlewares/errorHandler/errorHandler";
import { router } from "./routes/router";
import { consumer } from "./rabbitmq/consumer";
import { swaggerSpec, swaggerUi } from "./configs/swaggerConfig";

const server = express();

const PORT = process.env.PORT;

server.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

server.use(helmet());

server.use(cookieParser());

server.use(express.json());

server.use(router);

server.use(errorHandler);

server.listen(PORT, () => {
	console.log(`${process.env.NODE_ENV} server is running on PORT ${PORT}`);
	consumer("catalog_exchange", "catalog_queue");
});

export { server };
