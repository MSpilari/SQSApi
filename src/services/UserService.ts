import type { Prisma } from "@prisma/client";
import type { DefaultArgs } from "@prisma/client/runtime/library";
import type { User } from "../DTO/User";
import type { UserPayload } from "../DTO/UserPayload";
import { JWTGenerator } from "../helpers/JWTGenerator/JWTGenerator";
import { JWTVerifier } from "../helpers/JWTVerifier/JWTVerifier";
import { PasswordCompare } from "../helpers/PasswordCompare/PasswordCompare";
import { PasswordHash } from "../helpers/PasswordHash/PasswordHash";
import { minioClient } from "../configs/minIOClient";
import { producer } from "../rabbitmq/producer";

class UserService {
	private userRepository;

	constructor(userRepository: Prisma.UserDelegate<DefaultArgs>) {
		this.userRepository = userRepository;
	}

	addNewUser = async ({ email, password }: User) => {
		const emailExists = await this.userRepository.findFirst({
			where: { email },
		});

		if (emailExists) throw new Error("email already exists");

		const hashPassword = await PasswordHash(password);

		const newUser = await this.userRepository.create({
			data: {
				email,
				password: hashPassword,
			},
		});

		producer(
			"catalog_exchange",
			"catalog_update",
			"ADD_OBJECT",
			newUser,
			newUser.id,
		);

		return { message: "User created successfully !" };
	};

	login = async ({ email, password }: User) => {
		const userExists = await this.userRepository.findFirst({
			where: { email },
		});

		if (!userExists) throw new Error("Email does not exists !");

		const isPasswordValid = await PasswordCompare(
			password,
			userExists.password,
		);

		if (!isPasswordValid) throw new Error("Email/Password does not exists !");

		const { JWT_SECRET, REFRESH_SECRET } = process.env;

		if (!JWT_SECRET || !REFRESH_SECRET)
			throw new Error("Token secrets not found !");

		const accessToken = JWTGenerator(
			userExists.email,
			userExists.id,
			JWT_SECRET,
		);
		const refreshToken = JWTGenerator(
			userExists.email,
			userExists.id,
			REFRESH_SECRET,
			24 * 3600,
		);

		return {
			accessToken,
			refreshToken,
			user: userExists.email,
			userId: userExists.id,
		};
	};

	refreshToken = (token: string) => {
		const { JWT_SECRET, REFRESH_SECRET } = process.env;

		if (!JWT_SECRET || !REFRESH_SECRET) throw Error("Token secrets not found");

		const { email, userId } = JWTVerifier(token, REFRESH_SECRET) as UserPayload;

		const newAccessToken = JWTGenerator(email, userId, JWT_SECRET);

		return { accessToken: newAccessToken };
	};

	deleteUser = async (userPayload: UserPayload) => {
		const { email, userId } = userPayload;
		await this.userRepository.delete({ where: { id: userId, email } });

		producer(
			"catalog_exchange",
			"catalog_update",
			"DELETE_OBJECT",
			email,
			userId,
		);
		return { success: true, deletedUser: email };
	};

	listAllUsers = async () => {
		const allUsers = await this.userRepository.findMany();

		return allUsers;
	};

	retrieveCatalog = async (userId: number) => {
		const userCatalogStream = await minioClient.getObject(
			"catalogos",
			`${userId}-catalogo.json`,
		);
		let userCatalogData = "";

		userCatalogStream.on("data", (chunk) => {
			userCatalogData += chunk;
		});

		return new Promise((resolve, reject) => {
			userCatalogStream.on("end", () => {
				try {
					const userCatalogJSON = JSON.parse(userCatalogData);
					resolve(userCatalogJSON);
				} catch (error) {
					reject(new Error("Faild to parse catalog to JSON"));
				}
			});

			userCatalogStream.on("error", () => {
				reject(new Error("Failed to read stream"));
			});
		});
	};
}

export { UserService };
