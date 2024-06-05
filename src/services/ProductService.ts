import type { Prisma } from "@prisma/client";
import type { DefaultArgs } from "@prisma/client/runtime/library";
import type { Product } from "../DTO/Product";

class ProductService {
	private productRepository;

	constructor(productRepository: Prisma.ProductDelegate<DefaultArgs>) {
		this.productRepository = productRepository;
	}
	addNewProduct = async ({
		title,
		description,
		price,
		userID,
		categoryID,
	}: Product) => {
		const productExists = await this.productRepository.findFirst({
			where: { title, categoryID, userId: userID },
		});

		if (productExists) throw new Error("This product is already created.");

		return await this.productRepository.create({
			data: { title, description, price, categoryID, userId: userID },
		});
	};

	allProducts = async () => {
		return await this.productRepository.findMany({});
	};
}

export { ProductService };
