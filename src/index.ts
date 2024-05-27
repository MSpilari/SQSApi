import "./configs/dotenvConfig";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import express from "express";
import { errorHandler } from "./middlewares/errorHandler/errorHandler";
import { router } from "./routes/router";

const server = express();

const PORT = process.env.PORT;

server.use(helmet());

server.use(cookieParser());

server.use(express.json());

server.use(router);

server.use(errorHandler);

server.listen(PORT, () =>
	console.log(`${process.env.NODE_ENV} server is running on PORT ${PORT}`),
);

export { server };
