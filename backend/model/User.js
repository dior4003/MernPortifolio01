import mongoose from "mongoose";
import bcrypt from "bcrypt";

// 🔧 Sub-schema: Image
const imageSchema = new mongoose.Schema({
  public_id: String,
  url: String,
}, { _id: false });

// 🔧 Sub-schema: Timeline
const timelineSchema = new mongoose.Schema({
  title: String,
  description: String,
  date: Date,
}, { timestamps: true });

// 🔧 Sub-schema: YouTube
const youtubeSchema = new mongoose.Schema({
  url: String,
  title: String,
  image: imageSchema,
}, { timestamps: true });

// 🔧 Sub-schema: Project
const projectSchema = new mongoose.Schema({
  url: String,
  title: String,
  image: imageSchema,
  description: String,
  techStack: String,
  isDeleted: {
    type: Boolean,
    default: false,
  },
}, { timestamps: true });

// 🔧 Sub-schema: About
const aboutSchema = new mongoose.Schema({
  name: String,
  title: String,
  subtitle: String,
  description: String,
  quote: String,
  avatar: imageSchema,
}, { _id: false });

// 🔧 Sub-schema: Skills
const skillsSchema = new mongoose.Schema({
  image1: imageSchema,
  image2: imageSchema,
  image3: imageSchema,
  image4: imageSchema,
  image5: imageSchema,
  image6: imageSchema,
}, { _id: false });

// 🧠 Asosiy schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Iltimos, ism kiriting"],
  },
  email: {
    type: String,
    unique: true,
    required: [true, "Iltimos, email kiriting"],
  },
  password: {
    type: String,
    required: [true, "Iltimos, parol kiriting"],
    select: false,
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  timeline: [timelineSchema],
  skills: skillsSchema,
  youtube: [youtubeSchema],
  projects: [projectSchema],
  about: aboutSchema,
}, {
  timestamps: true,
});



export const User = mongoose.model("User", userSchema);