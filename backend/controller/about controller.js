import { About } from "../models/About.js";
import cloudinary from "../utils/cloudinary.js";

// 📥 Yaratish yoki yangilash (agar mavjud bo‘lsa, yangilanadi)
export const upsertAbout = async (req, res) => {
  try {
    const { name, title, subtitle, description, quote, avatar } = req.body;

    let about = await About.findOne();

    let uploadedAvatar = null;
    if (avatar) {
      if (about?.avatar?.public_id) {
        await cloudinary.v2.uploader.destroy(about.avatar.public_id);
      }

      const result = await cloudinary.v2.uploader.upload(avatar, {
        folder: "portfolio/about",
      });

      uploadedAvatar = {
        public_id: result.public_id,
        url: result.secure_url,
      };
    }

    if (about) {
      about.name = name || about.name;
      about.title = title || about.title;
      about.subtitle = subtitle || about.subtitle;
      about.description = description || about.description;
      about.quote = quote || about.quote;
      if (uploadedAvatar) about.avatar = uploadedAvatar;

      await about.save();
    } else {
      about = await About.create({
        name,
        title,
        subtitle,
        description,
        quote,
        avatar: uploadedAvatar,
      });
    }

    res.status(200).json({ success: true, message: "Ma’lumot saqlandi", about });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// 📋 Olish (har kim ko‘radi)
export const getAbout = async (req, res) => {
  try {
    const about = await About.findOne();
    res.status(200).json({ success: true, about });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};