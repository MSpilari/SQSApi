import type { Prisma } from "@prisma/client";
import type { DefaultArgs } from "@prisma/client/runtime/library";
import type { Product } from "../DTO/Product";
import type { ProductUpdate } from "../DTO/ProductUpdate";

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

	updateProduct = async ({
		productId,
		title,
		description,
		price,
		userID,
	}: ProductUpdate) => {
		await this.productRepository.findFirstOrThrow({
			where: { userId: userID, id: productId },
		});

		const productExists = await this.productRepository.findFirst({
			where: { userId: userID, title },
		});
		if (productExists)
			throw new Error(
				"Can't update a product with a title that already exists.",
			);

		const updatedData: any = {};
		if (title) updatedData.title = title;
		if (description) updatedData.description = description;
		if (price) updatedData.price = price;

		return await this.productRepository.update({
			where: { userId: userID, id: productId },
			data: updatedData,
		});
	};

	allProducts = async () => {
		return await this.productRepository.findMany({});
	};
}

export { ProductService };
