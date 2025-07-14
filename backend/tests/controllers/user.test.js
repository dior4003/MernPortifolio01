import request from "supertest";
import app from "../../app.js";
import mongoose from "mongoose";

describe("🧪 Auth Routes", () => {
  it("should register a new user", async () => {
    const res = await request(app).post("/api/users/register").send({
      name: "Test User",
      email: "test@example.com",
      password: "secure123"
    });

    expect(res.statusCode).toBe(201);
    expect(res.body.token).toBeDefined();
  });

  it("should not register with same email", async () => {
    const res = await request(app).post("/api/users/register").send({
      name: "Test User",
      email: "test@example.com",
      password: "secure123"
    });

    expect(res.statusCode).toBe(400);
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});