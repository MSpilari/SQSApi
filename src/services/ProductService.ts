import type { Prisma } from "@prisma/client";
import type { DefaultArgs } from "@prisma/client/runtime/library";

class ProductService {
	private productRepository;

	constructor(productRepository: Prisma.UserDelegate<DefaultArgs>) {
		this.productRepository = productRepository;
	}
}
