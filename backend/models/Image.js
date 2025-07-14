import mongoose from "mongoose";

const imageSchema = new mongoose.Schema({
  key: {
    type: String,
    enum: ["skill", "project", "about", "youtube", "custom"],
    default: "custom",
  },
  label: { type: String, trim: true },
  public_id: { type: String, required: true },
  url: { type: String, required: true },
  uploadedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  tags: [String],
  usedIn: {
    type: String,
    default: null, // masalan: "skills.image1"
  },
}, {
  timestamps: true,
});

export const Image = mongoose.model("Image", imageSchema);