import type { Prisma } from "@prisma/client";
import type { DefaultArgs } from "@prisma/client/runtime/library";
import type { Category } from "../DTO/Category";
import type { CategoryUpdate } from "../DTO/CategoryUpdate";

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

		return await this.categoryRepository.create({
			data: { title, description, userID, User: { connect: { id: userID } } },
		});
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

		return await this.categoryRepository.update({
			where: { userID, id: categoryId },
			data: { title, description },
		});
	};

	deleteCategory = async (categoryId: number, userID: number) => {
		await this.categoryRepository.findFirstOrThrow({
			where: { userID, id: categoryId },
		});

		return await this.categoryRepository.delete({
			where: { userID, id: categoryId },
		});
	};
}

export { CategoryService };
