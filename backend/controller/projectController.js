import { Project } from "../models/Project.js";
import cloudinary from "../utils/cloudinary.js";

// 📥 Yangi loyiha qo‘shish (admin)
export const createProject = async (req, res) => {
  try {
    const { title, url, description, techStack, image } = req.body;

    let uploadedImage = null;

    if (image) {
      const result = await cloudinary.v2.uploader.upload(image, {
        folder: "portfolio/projects",
      });

      uploadedImage = {
        public_id: result.public_id,
        url: result.secure_url,
      };
    }

    const project = await Project.create({
      title,
      url,
      description,
      techStack,
      image: uploadedImage,
    });

    res.status(201).json({ success: true, message: "Loyiha qo‘shildi", project });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// 📋 Barcha loyihalarni olish (foydalanuvchilar uchun)
export const getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find({ isDeleted: false }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, projects });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ✏️ Loyiha yangilash (admin)
export const updateProject = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, url, description, techStack, image } = req.body;

    const project = await Project.findById(id);
    if (!project) return res.status(404).json({ success: false, message: "Loyiha topilmadi" });

    if (title) project.title = title;
    if (url) project.url = url;
    if (description) project.description = description;
    if (techStack) project.techStack = techStack;

    if (image) {
      // Eski rasmni o‘chirish
      if (project.image?.public_id) {
        await cloudinary.v2.uploader.destroy(project.image.public_id);
      }

      // Yangi rasmni yuklash
      const result = await cloudinary.v2.uploader.upload(image, {
        folder: "portfolio/projects",
      });

      project.image = {
        public_id: result.public_id,
        url: result.secure_url,
      };
    }

    await project.save();
    res.status(200).json({ success: true, message: "Loyiha yangilandi", project });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// 🗑️ Loyiha o‘chirish (soft delete)
export const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;

    const project = await Project.findById(id);
    if (!project) return res.status(404).json({ success: false, message: "Topilmadi" });

    project.isDeleted = true;
    await project.save();

    res.status(200).json({ success: true, message: "Loyiha o‘chirildi" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};