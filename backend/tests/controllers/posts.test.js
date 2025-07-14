import request from "supertest";
import app from "../../app.js";
import mongoose from "mongoose";
import { generateTestToken } from "../../utils/testToken.js";

let token;
let postId;

beforeAll(() => {
  // Test token yaratamiz (admin user)
  token = generateTestToken("64dbf84b1234abcd5678ef90", "admin"); // test ID
});

describe("📬 POST API Endpoints", () => {

  it("🔒 should NOT allow unauthenticated POST creation", async () => {
    const res = await request(app).post("/api/posts").send({
      title: "Unauthorized Post",
      content: "Should be blocked"
    });

    expect(res.statusCode).toBe(401);
  });

  it("✅ should CREATE a new post as admin", async () => {
    const res = await request(app)
      .post("/api/posts")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "Test Post",
        content: "This is a test post content"
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.title).toBe("Test Post");
    postId = res.body._id;
  });

  it("📄 should GET all posts", async () => {
    const res = await request(app).get("/api/posts");
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it("🧠 should GET a specific post by ID", async () => {
    const res = await request(app).get(`/api/posts/${postId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body._id).toBe(postId);
  });

  it("✏️ should UPDATE the post", async () => {
    const res = await request(app)
      .put(`/api/posts/${postId}`)
      .set("Authorization", `Bearer ${token}`)
      .send({ title: "Updated Post Title" });

    expect(res.statusCode).toBe(200);
    expect(res.body.title).toBe("Updated Post Title");
  });

  it("❤️ should TOGGLE like", async () => {
    const userToken = generateTestToken("64dbf84b9876abcd1234ef01", "user");
    const res = await request(app)
      .post(`/api/posts/${postId}/like`)
      .set("Authorization", `Bearer ${userToken}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.liked).toBe(true); // or false if toggled again
  });

  it("🗑️ should DELETE the post", async () => {
    const res = await request(app)
      .delete(`/api/posts/${postId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toMatch(/deleted/i);
  });

});

afterAll(async () => {
  await mongoose.connection.close();
});