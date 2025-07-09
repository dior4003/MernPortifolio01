import rateLimit from "express-rate-limit";

// 🧱 100 ta so‘rov / 15 daqiqa
export const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: {
    success: false,
    message: "Juda ko‘p so‘rov yuborildi. Iltimos, keyinroq urinib ko‘ring.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});