import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Iltimos, ism kiriting"],
    trim: true,
  },
  email: {
    type: String,
    unique: true,
    required: [true, "Iltimos, email kiriting"],
    trim: true,
    lowercase: true,
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
  avatar: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "Image",
  default: null,
},
}, {
  timestamps: true,
});


export const User = mongoose.model("User", userSchema);
