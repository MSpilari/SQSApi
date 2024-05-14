import dotenv from "dotenv";

const path =
  process.env.NODE_ENV === "production" ? ".env.prod" : ".env.development";

dotenv.config({
  path,
  debug: process.env.NODE_ENV === "production" ? false : true,
});
