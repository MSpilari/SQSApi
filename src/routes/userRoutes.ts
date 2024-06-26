import express from "express";
import { validation } from "../middlewares/Validation/validation";
import { UserSchema } from "../schemas/UserSchema";
import { UserController } from "../controllers/User/UserController";
import { validateJWT } from "../middlewares/validateJWT/validateJWT";
import { UserService } from "../services/UserService";
import { userRepository } from "../repositories/UserRepository";

const JWT_SECRET = process.env.JWT_SECRET || "not found, will return error";

const userService = new UserService(userRepository);
const userController = new UserController(userService);

const router = express.Router();

router.post("/newUser", validation(UserSchema), userController.addNewUser);
router.post("/login", validation(UserSchema), userController.login);
router.get("/refreshToken", userController.refreshToken);
router.get("/allUsers", userController.allUsers);
router.get("/catalog", validateJWT(JWT_SECRET), userController.userCatalog);
router.delete(
	"/deleteUser",
	validateJWT(JWT_SECRET),
	userController.deleteUser,
);

export default router;
