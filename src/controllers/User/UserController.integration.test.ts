import request from "supertest";
import { server } from "../../index";
import { afterAll, beforeEach, describe, expect, it } from "vitest";
import { prismaClient } from "../../db/prismaClient";

describe("User Controller integration tests", () => {
	beforeEach(async () => {
		await prismaClient.user.deleteMany({});
		await prismaClient.product.deleteMany({});
		await prismaClient.category.deleteMany({});
	});

	afterAll(async () => {
		await prismaClient.$disconnect();
	});

	it("Should add a new user", async () => {
		const newUser = { email: "test@email.com", password: "password" };

		const response = await request(server).post("/newUser").send(newUser);

		expect(response.status).toBe(201);
		expect(response.body).toHaveProperty("message");
	});

	it("Should not add a new user, with the same email", async () => {
		const newUser = { email: "test@email.com", password: "password" };

		await request(server).post("/newUser").send(newUser);

		const response = await request(server).post("/newUser").send(newUser);

		expect(response.status).toBe(500);
		expect(response.body.success).toBe(false);
	});
});
