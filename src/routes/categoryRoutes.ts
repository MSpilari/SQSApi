import express from "express";
import { CategoryService } from "../services/CategoryService";
import { categoryRepository } from "../repositories/CategoryRepository";
import { CategoryController } from "../controllers/Category/CategoryController";
import { validateJWT } from "../middlewares/validateJWT/validateJWT";
import { validation } from "../middlewares/Validation/validation";
import { CategorySchema } from "../schemas/CategorySchema";
import { CategoryUpdateSchema } from "../schemas/CategoryUpdateSchema";

const JWT_SECRET = process.env.JWT_SECRET || "not found, will return error";

const categoryService = new CategoryService(categoryRepository);
const categoryController = new CategoryController(categoryService);

const router = express.Router();

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

export default router;
