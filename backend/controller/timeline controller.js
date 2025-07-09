import { Timeline } from "../models/Timeline.js";

// 📥 Yangi timeline elementi qo‘shish (admin)
export const createTimeline = async (req, res) => {
  try {
    const { title, description, date } = req.body;

    const timeline = await Timeline.create({
      title,
      description,
      date,
    });

    res.status(201).json({ success: true, message: "Timeline qo‘shildi", timeline });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// 📋 Barcha timeline elementlarini olish
export const getAllTimeline = async (req, res) => {
  try {
    const timeline = await Timeline.find().sort({ date: -1 });
    res.status(200).json({ success: true, timeline });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ✏️ Timeline elementini yangilash (admin)
export const updateTimeline = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, date } = req.body;

    const item = await Timeline.findById(id);
    if (!item) return res.status(404).json({ success: false, message: "Element topilmadi" });

    if (title) item.title = title;
    if (description) item.description = description;
    if (date) item.date = date;

    await item.save();
    res.status(200).json({ success: true, message: "Yangilandi", item });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// 🗑️ Timeline elementini o‘chirish (admin)
export const deleteTimeline = async (req, res) => {
  try {
    const { id } = req.params;

    const item = await Timeline.findById(id);
    if (!item) return res.status(404).json({ success: false, message: "Topilmadi" });

    await item.deleteOne();
    res.status(200).json({ success: true, message: "O‘chirildi" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

