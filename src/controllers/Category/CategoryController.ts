import type { NextFunction, Request, Response } from "express";
import type { CategoryService } from "../../services/CategoryService";

class CategoryController {
	private categoryService;

	constructor(categoryService: CategoryService) {
		this.categoryService = categoryService;
	}

	addNewCategory = async (req: Request, res: Response, next: NextFunction) => {
		res.status(200).json(req.user);
		// try {
		// 	const newUser = await this.categoryService.addNewCategory(req.body);

		// 	return res.status(201).json(newUser);
		// } catch (error) {
		// 	next(error);
		// }
	};
}

export { CategoryController };
