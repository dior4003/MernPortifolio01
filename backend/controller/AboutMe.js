import { AboutMe } from "../models/AboutMe.js";

// 📋 Har kim ko‘radi
export const getAboutMe = async (req, res) => {
  try {
    const about = await AboutMe.findOne();
    res.status(200).json({ success: true, about });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ✏️ Admin yaratadi yoki yangilaydi
export const upsertAboutMe = async (req, res) => {
  try {
    const { items } = req.body;

    if (!items || !Array.isArray(items)) {
      return res.status(400).json({ success: false, message: "items massiv bo‘lishi kerak" });
    }

    let about = await AboutMe.findOne();
    if (!about) {
      about = await AboutMe.create({ items });
    } else {
      about.items = items;
      await about.save();
    }

    res.status(200).json({ success: true, message: "Ma’lumot saqlandi", about });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};