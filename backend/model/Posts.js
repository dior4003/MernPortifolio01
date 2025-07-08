import mongoose from "mongoose";

const imageSchema = new mongoose.Schema({
  public_id: String,
  url: String,
}, { _id: false });

const commentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  text: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
}, { _id: true });

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Sarlavha kerak"],
    trim: true,
  },
  content: {
    type: String,
    required: [true, "Matn kerak"],
  },
  image: imageSchema,
  likes: {
    type: [String], // Foydalanuvchi ID yoki email
    default: [],
  },
  comments: [commentSchema],
  isDeleted: {
    type: Boolean,
    default: false,
  },
}, {
  timestamps: true,
});

export const Post = mongoose.model("Post", postSchema);