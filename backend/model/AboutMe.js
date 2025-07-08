import mongoose from "mongoose";

const aboutMeSchema = new mongoose.Schema({
  icon: {
    type: String,
    required: true,
  },
  value: {
    type: String,
    required: true,
  },
}, {
  timestamps: true,
});

export const AboutMe = mongoose.model("AboutMe", aboutMeSchema);