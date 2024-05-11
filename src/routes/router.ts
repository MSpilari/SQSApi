import express from "express";
import { UserService } from "../services/UserService";
import { userRepository } from "../repositories/UserRepository";
import { UserController } from "../controllers/UserController";
import { validation } from "../middlewares/validation";
import { UserSchema } from "../schemas/UserSchema";

const userService = new UserService(userRepository);
const userController = new UserController(userService);

const router = express.Router();

router.post("/newUser", validation(UserSchema), userController.addNewUser);

export { router };
