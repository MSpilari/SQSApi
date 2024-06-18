import type { Prisma } from "@prisma/client";
import type { DefaultArgs } from "@prisma/client/runtime/library";
import type { Category } from "../DTO/Category";
import type { CategoryUpdate } from "../DTO/CategoryUpdate";
import { producer } from "../rabbitmq/producer";

class CategoryService {
	private categoryRepository;

	constructor(categoryRepository: Prisma.CategoryDelegate<DefaultArgs>) {
		this.categoryRepository = categoryRepository;
	}

	addNewCategory = async ({ title, description, userID }: Category) => {
		const categoryExists = await this.categoryRepository.findFirst({
			where: { title, userID },
		});

		if (categoryExists) throw new Error("This category is already created.");

		const newCategory = await this.categoryRepository.create({
			data: { title, description, userID, User: { connect: { id: userID } } },
		});

		producer(
			"catalog_exchange",
			"catalog_update",
			"UPDATE_OBJECT",
			newCategory,
			userID,
		);

		return newCategory;
	};

	allCategories = async () => {
		return await this.categoryRepository.findMany({});
	};

	updateCategory = async ({
		categoryId,
		title,
		description,
		userID,
	}: CategoryUpdate) => {
		await this.categoryRepository.findFirstOrThrow({
			where: { userID, id: categoryId },
		});

		const categoryExists = await this.categoryRepository.findFirst({
			where: { userID, title },
		});
		if (categoryExists)
			throw new Error(
				"Can't update a category with a title that already exists.",
			);

		// biome-ignore lint/suspicious/noExplicitAny:
		const updatedData: any = {};
		if (title) updatedData.title = title;
		if (description) updatedData.description = description;

		const updatedCategory = await this.categoryRepository.update({
			where: { userID, id: categoryId },
			data: updatedData,
		});

		producer(
			"catalog_exchange",
			"catalog_update",
			"UPDATE_OBJECT",
			updatedCategory,
			userID,
		);

		return updatedCategory;
	};

	deleteCategory = async (categoryId: number, userID: number) => {
		await this.categoryRepository.findFirstOrThrow({
			where: { userID, id: categoryId },
		});

		const deletedCategory = await this.categoryRepository.delete({
			where: { userID, id: categoryId },
		});

		producer(
			"catalog_exchange",
			"catalog_update",
			"UPDATE_OBJECT",
			deletedCategory,
			userID,
		);

		return deletedCategory;
	};
}

export { CategoryService };
