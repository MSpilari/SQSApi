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

	it("Should not login a user, if the credentials does not exists", async () => {
		const loginData = { email: "john@example.com", password: "password" };

		const response = await request(server).post("/login").send(loginData);

		expect(response.status).toBe(500);
		expect(response.body.success).toBe(false);
	});

	it("Should not login a user, with empty email", async () => {
		const loginData = { email: "", password: "password" };

		const response = await request(server).post("/login").send(loginData);

		expect(response.status).toBe(400);
		expect(response.body.success).toBe(false);
	});

	it("Should not login a user, with empty password", async () => {
		const loginData = { email: "test@email.com", password: "" };

		const response = await request(server).post("/login").send(loginData);

		expect(response.status).toBe(400);
		expect(response.body.success).toBe(false);
	});

	it("Should refresh the token", async () => {
		const loginData = { email: "test@email.com", password: "password" };

		await request(server).post("/newUser").send(loginData);

		const res = await request(server).post("/login").send(loginData);
		const refreshToken = res.headers["set-cookie"][0].split(";")[0];

		const response = await request(server)
			.get("/refreshToken")
			.set("Cookie", [refreshToken]);

		expect(response.status).toBe(200);
		expect(response.body).toHaveProperty("accessToken");
	});

	it("Should not refresh the token, if there's no refresh token available", async () => {
		const response = await request(server)
			.get("/refreshToken")
			.set("Cookie", []);

		expect(response.status).toBe(500);
		expect(response.body.success).toBe(false);
	});

	it("Should delete the user", async () => {
		const loginData = { email: "john@example.com", password: "password" };

		await request(server).post("/newUser").send(loginData);
		const res = await request(server).post("/login").send(loginData);

		const response = await request(server)
			.delete("/deleteUser")
			.auth(`${res.body.accessToken}`, { type: "bearer" });

		expect(response.status).toBe(200);
		expect(response.body.success).toBe(true);
		expect(response.body.deletedUser).toBe(loginData.email);
	});
});
