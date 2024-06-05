import type { NextFunction, Request, Response } from "express";
import type { ProductService } from "../../services/ProductService";

class ProductController {
	private productService;

	constructor(productService: ProductService) {
		this.productService = productService;
	}

	addNewProduct = async (req: Request, res: Response, next: NextFunction) => {
		try {
			if (!req.user) throw new Error("User not logged in");

			const { userId } = req.user;

			const newProduct = await this.productService.addNewProduct({
				userID: userId,
				...req.body,
			});

			return res.status(201).json(newProduct);
		} catch (error) {
			next(error);
		}
	};

	allProducts = async (req: Request, res: Response, next: NextFunction) => {
		try {
			const allProducts = await this.productService.allProducts();
			res.status(200).json(allProducts);
		} catch (error) {
			next(error);
		}
	};
}

export { ProductController };
