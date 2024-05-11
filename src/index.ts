import express from "express";
import dotenv from "dotenv";
import { router } from "./routes/router";

const path =
  process.env.NODE_ENV === "production" ? ".env.prod" : ".env.development";

dotenv.config({ path });

const server = express();

const PORT = process.env.PORT;

server.use(express.json());

server.use(router);

server.listen(PORT, () =>
  console.log(`${process.env.NODE_ENV} server is running on PORT ${PORT}`)
);
