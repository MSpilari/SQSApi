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

	updateProduct = async (req: Request, res: Response, next: NextFunction) => {
		try {
			const { id } = req.params;

			if (!req.user) throw new Error("User not logged !");

			const { userId } = req.user;

			const updatedProduct = await this.productService.updateProduct({
				productId: Number(id),
				userID: userId,
				...req.body,
			});
			res.status(200).json(updatedProduct);
		} catch (error) {
			next(error);
		}
	};

	deleteProduct = async (req: Request, res: Response, next: NextFunction) => {
		try {
			const { id } = req.params;

			if (!req.user) throw new Error("User not logged !");

			const { userId } = req.user;

			const deleteProduct = await this.productService.deleteProduct(
				Number(id),
				userId,
			);
			res.status(200).json(deleteProduct);
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
