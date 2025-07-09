import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
  icon: { type: String, required: true },
  value: { type: String, required: true },
}, { _id: false });

const aboutMeSchema = new mongoose.Schema({
  items: [itemSchema],
}, {
  timestamps: true,
});

export const AboutMe = mongoose.model("AboutMe", aboutMeSchema);