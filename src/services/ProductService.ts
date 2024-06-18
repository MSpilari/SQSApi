import type { Prisma } from "@prisma/client";
import type { DefaultArgs } from "@prisma/client/runtime/library";
import type { Product } from "../DTO/Product";
import type { ProductUpdate } from "../DTO/ProductUpdate";
import { producer } from "../rabbitmq/producer";

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

		const newProduct = await this.productRepository.create({
			data: { title, description, price, categoryID, userId: userID },
		});

		producer(
			"catalog_exchange",
			"catalog_update",
			"UPDATE_OBJECT",
			newProduct,
			userID,
		);

		return newProduct;
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

		// biome-ignore lint/suspicious/noExplicitAny:
		const updatedData: any = {};
		if (title) updatedData.title = title;
		if (description) updatedData.description = description;
		if (price) updatedData.price = price;

		const productUpdated = await this.productRepository.update({
			where: { userId: userID, id: productId },
			data: updatedData,
		});

		producer(
			"catalog_exchange",
			"catalog_update",
			"UPDATE_OBJECT",
			productUpdated,
			userID,
		);

		return productUpdated;
	};

	deleteProduct = async (productId: number, userID: number) => {
		await this.productRepository.findFirstOrThrow({
			where: { userId: userID, id: productId },
		});

		const deletedProduct = await this.productRepository.delete({
			where: { userId: userID, id: productId },
		});

		producer(
			"catalog_exchange",
			"catalog_update",
			"UPDATE_OBJECT",
			deletedProduct,
			userID,
		);

		return deletedProduct;
	};

	allProducts = async () => {
		return await this.productRepository.findMany({});
	};
}

export { ProductService };
