import express from "express";
import dotenv from "dotenv";
import { router } from "./routes/router";

dotenv.config();

const server = express();

const PORT = process.env.PORT;

server.use(express.json());

server.use(router);

server.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`));
