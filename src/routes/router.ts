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
router.post("/login", validation(UserSchema), userController.login);
router.get("/refreshToken", userController.refreshToken);
router.get("/allUsers", userController.allUsers);
router.delete("/deleteUser", userController.deleteUser);

export { router };
