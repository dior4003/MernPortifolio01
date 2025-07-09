import { Message } from "../models/Message.js";
import { Notification } from "../models/Notification.js";
import { User } from "../models/User.js";
import { sendTelegramAlert } from "../utils/telegram.js";

// 📥 Xabar yuborish + admin uchun notification
export const sendMessage = async (req, res) => {
  try {
    const { name, email, subject, content } = req.body;

    const message = await Message.create({ name, email, subject, content });

    // 🔔 Admin uchun notification
    const admin = await User.findOne({ role: "admin" });
    if (admin) {
      await Notification.create({
        sender: null,
        recipient: admin._id,
        title: "Yangi xabar",
        message: `📩 ${name} (${email}) sizga xabar yubordi.`,
        type: "message",
        link: "/admin/messages",
        isRead: false,
      });
    }

    // Telegramga yuborish (ixtiyoriy)
    await sendTelegramAlert(`📩 Yangi xabar\n👤 ${name} (${email})\n📝 ${subject || "Mavzu yo‘q"}\n\n${content}`);

    res.status(201).json({ success: true, message: "Xabar yuborildi" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// 📋 Barcha xabarlarni olish (admin)
export const getAllMessages = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ success: false, message: "Faqat adminlar uchun" });
    }

    const messages = await Message.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, messages });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ✅ Xabarni o‘qilgan deb belgilash
export const markAsRead = async (req, res) => {
  try {
    const { id } = req.params;

    const message = await Message.findById(id);
    if (!message) return res.status(404).json({ success: false, message: "Xabar topilmadi" });

    message.isRead = true;
    await message.save();

    res.status(200).json({ success: true, message: "Xabar o‘qilgan deb belgilandi" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// 🗑️ Xabarni o‘chirish (admin)
export const deleteMessage = async (req, res) => {
  try {
    const { id } = req.params;

    const message = await Message.findById(id);
    if (!message) return res.status(404).json({ success: false, message: "Topilmadi" });

    await message.deleteOne();
    res.status(200).json({ success: true, message: "Xabar o‘chirildi" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};