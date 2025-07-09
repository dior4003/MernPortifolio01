// app.js
import express from "express";
import helmet from "helmet";
import cors from "cors";
import xssClean from "xss-clean";
import mongoSanitize from "express-mongo-sanitize";
import dotenv from "dotenv";
import { limiter } from "./middlewares/rateLimiter.js";
import { notFound, errorHandler } from "./middlewares/errorHandler.js";
import { logRequest } from "./middlewares/logRequest.js";
import routes from "./routes/index.js";

dotenv.config();

const app = express();

// 🔒 Xavfsizlik middleware’lari
app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true,
}));
app.use(express.json({ limit: "10mb" }));
app.use(xssClean());
app.use(mongoSanitize());
app.use(logRequest);
app.use(limiter);

// 📦 API route’lar
app.use("/api", routes);

// ❌ 404 va error handler
app.use(notFound);
app.use(errorHandler);

export default app;