import mongoose from "mongoose";

const aboutSchema = new mongoose.Schema({
  name: String,
  title: String,
  subtitle: String,
  description: String,
  quote: String,
  avatar: { type: mongoose.Schema.Types.ObjectId, ref: "Image" },
}, {
  timestamps: true,
});

export const About=mongoose.model("About",aboutSchema)