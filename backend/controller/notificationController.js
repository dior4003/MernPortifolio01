import { Notification } from "../models/Notification.js";
import { User } from "../models/User.js";

// 🔔 Bildirishnoma yuborish (admin yoki user)
export const sendNotification = async (req, res) => {
  try {
    const { recipientId, title, message, type = "info" } = req.body;

    const recipient = await User.findById(recipientId);
    if (!recipient) return res.status(404).json({ success: false, message: "Qabul qiluvchi topilmadi" });

    const notification = await Notification.create({
      sender: req.user._id,
      recipient: recipientId,
      title,
      message,
      type,
    });

    res.status(201).json({ success: true, notification });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// 📥 Mening bildirishnomalarim
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
export const markAsRead = async (req, res) => {
  try {
    const notification = await Notification.findById(req.params.id);
    if (!notification) return res.status(404).json({ success: false, message: "Bildirishnoma topilmadi" });

    if (notification.recipient.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: "Ruxsat yo‘q" });
    }

    notification.isRead = true;
    await notification.save();

    res.status(200).json({ success: true, message: "O‘qilgan deb belgilandi" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// 🗑️ Bildirishnomani o‘chirish
export const deleteNotification = async (req, res) => {
  try {
    const notification = await Notification.findById(req.params.id);
    if (!notification) return res.status(404).json({ success: false, message: "Topilmadi" });

    if (notification.recipient.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: "Ruxsat yo‘q" });
    }

    await notification.deleteOne();
    res.status(200).json({ success: true, message: "Bildirishnoma o‘chirildi" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};