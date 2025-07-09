import { Notification } from "../models/Notification.js";
import { User } from "../models/User.js";

// 📥 Notification yuborish (admin yoki foydalanuvchi)
export const sendNotification = async (req, res) => {
  try {
    const { recipientId, title, message, type = "custom", link = null } = req.body;

    const recipient = await User.findById(recipientId);
    if (!recipient) return res.status(404).json({ success: false, message: "Qabul qiluvchi topilmadi" });

    const notification = await Notification.create({
      sender: req.user._id,
      recipient: recipient._id,
      title,
      message,
      type,
      link,
      isRead: false,
    });

    res.status(201).json({ success: true, message: "Bildirishnoma yuborildi", notification });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// 📋 Mening barcha bildirishnomalarim
export const getMyNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({ recipient: req.user._id })
      .sort({ createdAt: -1 })
      .populate("sender", "name email");

    res.status(200).json({ success: true, notifications });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ✅ O‘qilgan deb belgilash
export const markNotificationAsRead = async (req, res) => {
  try {
    const { id } = req.params;

    const notification = await Notification.findById(id);
    if (!notification || notification.recipient.toString() !== req.user._id.toString()) {
      return res.status(404).json({ success: false, message: "Bildirishnoma topilmadi" });
    }

    notification.isRead = true;
    await notification.save();

    res.status(200).json({ success: true, message: "O‘qilgan deb belgilandi" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// 🗑️ O‘chirish
export const deleteNotification = async (req, res) => {
  try {
    const { id } = req.params;

    const notification = await Notification.findById(id);
    if (!notification || notification.recipient.toString() !== req.user._id.toString()) {
      return res.status(404).json({ success: false, message: "Bildirishnoma topilmadi" });
    }

    await notification.deleteOne();
    res.status(200).json({ success: true, message: "Bildirishnoma o‘chirildi" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};