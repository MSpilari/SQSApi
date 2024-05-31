import type { NextFunction, Request, Response } from "express";
import type { CategoryService } from "../../services/CategoryService";

class CategoryController {
	private categoryService;

	constructor(categoryService: CategoryService) {
		this.categoryService = categoryService;
	}

	addNewCategory = async (req: Request, res: Response, next: NextFunction) => {
		try {
			const newCategory = await this.categoryService.addNewCategory(req.body);

			return res.status(201).json(newCategory);
		} catch (error) {
			next(error);
		}
	};

	allCategories = async (req: Request, res: Response, next: NextFunction) => {
		try {
			const allCategories = await this.categoryService.allCategories();
			res.status(200).json(allCategories);
		} catch (error) {
			next(error);
		}
	};
}

export { CategoryController };
