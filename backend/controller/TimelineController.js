import { Timeline } from "../models/Timeline.js";

// 📋 Barcha timeline elementlari
export const getTimeline = async (req, res) => {
  try {
    const items = await Timeline.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, items });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ➕ Yaratish (admin)
export const createTimeline = async (req, res) => {
  try {
    const { title, description, date } = req.body;

    const item = await Timeline.create({ title, description, date });
    res.status(201).json({ success: true, message: "Timeline qo‘shildi", item });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ✏️ Yangilash (admin)
export const updateTimeline = async (req, res) => {
  try {
    const { title, description, date } = req.body;
    const item = await Timeline.findById(req.params.id);
    if (!item) return res.status(404).json({ success: false, message: "Topilmadi" });

    if (title) item.title = title;
    if (description) item.description = description;
    if (date) item.date = date;

    await item.save();
    res.status(200).json({ success: true, message: "Yangilandi", item });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// 🗑️ O‘chirish (admin)
export const deleteTimeline = async (req, res) => {
  try {
    const item = await Timeline.findById(req.params.id);
    if (!item) return res.status(404).json({ success: false, message: "Topilmadi" });

    await item.deleteOne();
    res.status(200).json({ success: true, message: "O‘chirildi" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};