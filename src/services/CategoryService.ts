import type { Prisma } from "@prisma/client";
import type { DefaultArgs } from "@prisma/client/runtime/library";

class CategoryService {
	private categoryRepository;

	constructor(categoryRepository: Prisma.UserDelegate<DefaultArgs>) {
		this.categoryRepository = categoryRepository;
	}
}
