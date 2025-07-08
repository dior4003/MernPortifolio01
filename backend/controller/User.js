import { User } from "../models/User.js";
import { Notification } from "../models/Notification.js";
import { hashPassword, comparePassword } from "../utils/hash.js";
import { sendTelegramAlert } from "../utils/telegram.js";
import jwt from "jsonwebtoken";

// 🔐 Token yuborish
const sendToken = (user, res, message) => {
  const token = jwt.sign({ _id: user._id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  res
    .status(200)
    .cookie("token", token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    })
    .json({ success: true, message });
};

// 📌 Ro‘yxatdan o‘tish
export const registerUser = async (req, res) => {
  try {
    const { name, email, password, avatar = null } = req.body;

    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ success: false, message: "Email band" });

    const hashed = await hashPassword(password);

    const user = await User.create({
      name,
      email,
      password: hashed,
      avatar,
    });

    sendToken(user, res, "Ro‘yxatdan o‘tish muvaffaqiyatli");
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// 📌 Login
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select("+password");
    if (!user) return res.status(400).json({ success: false, message: "Foydalanuvchi topilmadi" });

    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) return res.status(401).json({ success: false, message: "Parol noto‘g‘ri" });

    sendToken(user, res, "Xush kelibsiz");
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// 📌 Logout
export const logoutUser = (req, res) => {
  res
    .status(200)
    .cookie("token", "", { expires: new Date(0), httpOnly: true })
    .json({ success: true, message: "Tizimdan chiqdingiz" });
};

// 📌 Profilni olish
export const getMyProfile = async (req, res) => {
  res.status(200).json({ success: true, user: req.user });
};

// 📌 Profilni yangilash
export const updateProfile = async (req, res) => {
  try {
    const { name, avatar } = req.body;
    const user = await User.findById(req.user._id);

    if (name) user.name = name;
    if (avatar) user.avatar = avatar;

    await user.save();
    res.status(200).json({ success: true, message: "Profil yangilandi" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// 📌 Parolni yangilash (o‘zi)
export const updatePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;

    const user = await User.findById(req.user._id).select("+password");
    const isMatch = await comparePassword(oldPassword, user.password);
    if (!isMatch) return res.status(401).json({ success: false, message: "Eski parol noto‘g‘ri" });

    user.password = await hashPassword(newPassword);
    await user.save();

    res.status(200).json({ success: true, message: "Parol yangilandi" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// 📌 Parolni tiklash so‘rovi → adminga xabar
export const requestPasswordReset = async (req, res) => {
  try {
    const { email, reason } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ success: false, message: "Foydalanuvchi topilmadi" });

    const admin = await User.findOne({ role: "admin" });

    await Notification.create({
      sender: user._id,
      recipient: admin._id,
      title: "Parol tiklash so‘rovi",
      message: reason || "Foydalanuvchi parolni tiklashni so‘radi.",
      type: "request",
    });

    await sendTelegramAlert(`🔐 Parol tiklash so‘rovi\n👤 ${user.name} (${user.email})\n📝 ${reason || "Sabab ko‘rsatilmagan"}`);

    res.status(200).json({ success: true, message: "So‘rov yuborildi. Admin siz bilan bog‘lanadi." });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// 📌 Parolni tiklash (admin yoki o‘zi)
export const resetPassword = async (req, res) => {
  try {
    const { id } = req.params;
    const { newPassword } = req.body;

    if (req.user.role !== "admin" && req.user._id.toString() !== id) {
      return res.status(403).json({ success: false, message: "Ruxsat yo‘q" });
    }

    const user = await User.findById(id).select("+password");
    if (!user) return res.status(404).json({ success: false, message: "Foydalanuvchi topilmadi" });

    user.password = await hashPassword(newPassword);
    await user.save();

    res.status(200).json({ success: true, message: "Parol tiklandi" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// 📌 Foydalanuvchini o‘chirish (admin yoki o‘zi)
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    if (req.user.role !== "admin" && req.user._id.toString() !== id) {
      return res.status(403).json({ success: false, message: "Ruxsat yo‘q" });
    }

    const user = await User.findById(id);
    if (!user) return res.status(404).json({ success: false, message: "Foydalanuvchi topilmadi" });

    await user.deleteOne();
    res.status(200).json({ success: true, message: "Foydalanuvchi o‘chirildi" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// 📌 Barcha foydalanuvchilar (admin)
export const getAllUsers = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ success: false, message: "Faqat adminlar uchun" });
    }

    const users = await User.find().select("-password");
    res.status(200).json({ success: true, users });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// 📌 Bitta foydalanuvchini olish (admin)
export const getSingleUser = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ success: false, message: "Faqat adminlar uchun" });
    }

    const user = await User.findById(req.params.id).select("-password");
    if (!user) return res.status(404).json({ success: false, message: "Foydalanuvchi topilmadi" });

    res.status(200).json({ success: true, user });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// 📌 Rolni o‘zgartirish (admin)
export const changeUserRole = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ success: false, message: "Faqat admin