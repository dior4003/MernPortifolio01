import jwt from "jsonwebtoken";
import { User } from "../models/User.js";

// 🔐 Foydalanuvchini aniqlash
export const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ success: false, message: "Token yo‘q" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded._id).select("-password");
    if (!req.user) return res.status(401).json({ success: false, message: "Foydalanuvchi topilmadi" });
 

    next();
  } catch (err) {
    res.status(401).json({ success: false, message: "Token noto‘g‘ri yoki muddati tugagan" });
  }
};

// 🛡️ Faqat adminlar uchun
export const isAdmin = (req, res, next) => {
  if (req.user?.role !== "admin") {
    return res.status(403).json({ success: false, message: "Faqat adminlar uchun" });
  }
  next();
};
