import express from "express";
import { UserService } from "../services/UserService";
import { userRepository } from "../repositories/UserRepository";
import { UserController } from "../controllers/User/UserController";
import { validation } from "../middlewares/Validation/validation";
import { UserSchema } from "../schemas/UserSchema";
import { validateJWT } from "../middlewares/validateJWT/validateJWT";
import { CategoryService } from "../services/CategoryService";
import { categoryRepository } from "../repositories/CategoryRepository";
import { CategoryController } from "../controllers/Category/CategoryController";
import { CategorySchema } from "../schemas/CategorySchema";
import { CategoryUpdateSchema } from "../schemas/CategoryUpdateSchema";

const JWT_SECRET = process.env.JWT_SECRET || "not found, will return error";

const userService = new UserService(userRepository);
const userController = new UserController(userService);

const categoryService = new CategoryService(categoryRepository);
const categoryController = new CategoryController(categoryService);

const router = express.Router();

// User Routes
router.post("/newUser", validation(UserSchema), userController.addNewUser);
router.post("/login", validation(UserSchema), userController.login);
router.get("/refreshToken", userController.refreshToken);
router.get("/allUsers", userController.allUsers);
router.delete(
	"/deleteUser",
	validateJWT(JWT_SECRET),
	userController.deleteUser,
);

// Category Routes
router.get("/allCategories", categoryController.allCategories);
router.post(
	"/newCategory",
	validateJWT(JWT_SECRET),
	validation(CategorySchema),
	categoryController.addNewCategory,
);
router.put(
	"/updateCategory/:id",
	validateJWT(JWT_SECRET),
	validation(CategoryUpdateSchema),
	categoryController.updateCategory,
);
router.delete(
	"/deleteCategory/:id",
	validateJWT(JWT_SECRET),
	categoryController.deleteCategory,
);

export { router };
