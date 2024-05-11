import express from "express";
import { UserService } from "../services/UserService";
import { userRepository } from "../repositories/UserRepository";
import { UserController } from "../controllers/UserController";

const userService = new UserService(userRepository);
const userController = new UserController(userService);

const router = express.Router();

router.post("/newUser", userController.addNewUser);

export { router };
