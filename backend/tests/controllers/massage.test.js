import request from "supertest";
import app from "../../app.js";
import mongoose from "mongoose";

describe("💬 Massage Contact API", () => {

  it("🚫 should reject request without required fields", async () => {
    const res = await request(app).post("/api/massages").send({
      name: "",
      email: "invalid-email",
      message: ""
    });

    expect(res.statusCode).toBe(400);
    expect(res.body.error).toBeDefined();
  });

  it("✅ should send contact message", async () => {
    const res = await request(app).post("/api/massages").send({
      name: "Test User",
      email: "testuser@example.com",
      message: "This is a test contact message"
    });

    expect(res.statusCode).toBe(201);
    expect(res.body.name).toBe("Test User");
    expect(res.body.message).toContain("test contact message");
  });

  it("🔔 should trigger Telegram alert (mock)", async () => {
    // Telegram sendAlert util could be mocked here
    const res = await request(app).post("/api/massages").send({
      name: "Diyor",
      email: "diyor4003@mail.com",
      message: "Telegram alert test from backend"
    });

    expect(res.statusCode).toBe(201);
    // We assume Telegram alert succeeds silently or log in server
  });

});

afterAll(async () => {
  await mongoose.connection.close();
});