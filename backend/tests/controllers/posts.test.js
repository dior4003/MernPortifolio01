import request from "supertest";
import app from "../../app.js";

describe("📬 GET /api/posts", () => {
  it("should return array of posts", async () => {
      const res = await request(app).get("/api/posts");
          expect(res.statusCode).toBe(200);
              expect(Array.isArray(res.body)).toBe(true);
                });
                });