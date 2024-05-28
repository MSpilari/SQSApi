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

	it("Should not add a new user, with the missing email", async () => {
		const newUser = { email: "", password: "password" };

		const response = await request(server).post("/newUser").send(newUser);

		expect(response.status).toBe(400);
		expect(response.body.success).toBe(false);
	});

	it("Should not add a new user, with the missing password", async () => {
		const newUser = { email: "test@email.com", password: "" };

		const response = await request(server).post("/newUser").send(newUser);

		expect(response.status).toBe(400);
		expect(response.body.success).toBe(false);
	});

	it("Should login a user", async () => {
		const loginData = { email: "john@example.com", password: "password" };

		await request(server).post("/newUser").send(loginData);

		const response = await request(server).post("/login").send(loginData);

		expect(response.status).toBe(200);
		expect(response.body).toHaveProperty("accessToken");
		expect(response.headers["set-cookie"]).toHaveLength(1);
		expect(response.body.success).toBe(true);
	});
});
