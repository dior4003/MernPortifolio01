import mongoose from "mongoose";

const timelineSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  date: {
    type: Date,
    required: true,
  },
}, {
  timestamps: true,
});

export const Timeline = mongoose.model("Timeline", timelineSchema);