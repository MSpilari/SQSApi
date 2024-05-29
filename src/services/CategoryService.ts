import type { Prisma } from "@prisma/client";
import type { DefaultArgs } from "@prisma/client/runtime/library";
import type { Category } from "../DTO/Category";

class CategoryService {
	private categoryRepository;

	constructor(categoryRepository: Prisma.CategoryDelegate<DefaultArgs>) {
		this.categoryRepository = categoryRepository;
	}

	addNewCategory = async ({ title, description, userID }: Category) => {
		this.categoryRepository.create({
			data: { title, description, userID, User: { connect: { id: userID } } },
		});
	};

	updateCategory = async () => {};

	deleteCategory = async () => {};
}

export { CategoryService };
