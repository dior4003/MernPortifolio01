import { Project } from "../models/Project.js";
import { Image } from "../models/Image.js";
import cloudinary from "../utils/Cloudinary.js";

// 📥 Yangi loyiha + rasm yuklash
export const createProject = async (req, res) => {
  try {
    const { title, url, description, techStack, image, imageLabel } = req.body;

    if (!image) {
      return res.status(400).json({ success: false, message: "Rasm yuborilmadi" });
    }

    // 1. Rasmni yuklash
    const result = await cloudinary.v2.uploader.upload(image, {
      folder: "portfolio/projects",
      quality: "auto",
      fetch_format: "auto",
    });

    // 2. Image modelga saqlash
    const newImage = await Image.create({
      key: "project",
      label: imageLabel || title,
      public_id: result.public_id,
      url: result.secure_url,
      uploadedBy: req.user._id,
      usedIn: "project",
    });

    // 3. Project modelga bog‘lash
    const project = await Project.create({
      title,
      url,
      description,
      techStack,
      image: newImage._id,
    });

    res.status(201).json({ success: true, message: "Loyiha va rasm saqlandi", project });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// 📋 Barcha loyihalarni olish
export const getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find({ isDeleted: false })
      .sort({ createdAt: -1 })
      .populate("image");

    res.status(200).json({ success: true, projects });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ✏️ Loyiha yangilash + rasmni almashtirish
export const updateProject = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, url, description, techStack, image, imageLabel } = req.body;

    const project = await Project.findById(id);
    if (!project) return res.status(404).json({ success: false, message: "Topilmadi" });

    if (title) project.title = title;
    if (url) project.url = url;
    if (description) project.description = description;
    if (techStack) project.techStack = techStack;

    if (image) {
      // Eski rasmni bo‘shatamiz
      if (project.image) {
        const oldImage = await Image.findById(project.image);
        if (oldImage) {
          oldImage.usedIn = null;
          await oldImage.save();
        }
      }

      // Yangi rasmni yuklaymiz
      const result = await cloudinary.v2.uploader.upload(image, {
        folder: "portfolio/projects",
        quality: "auto",
        fetch_format: "auto",
      });

      const newImage = await Image.create({
        key: "project",
        label: imageLabel || title,
        public_id: result.public_id,
        url: result.secure_url,
        uploadedBy: req.user._id,
        usedIn: "project",
      });

      project.image = newImage._id;
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

    // Rasmni bo‘shatamiz
    if (project.image) {
      const image = await Image.findById(project.image);
      if (image) {
        image.usedIn = null;
        await image.save();
      }
    }

    await project.save();
    res.status(200).json({ success: true, message: "Loyiha o‘chirildi" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};