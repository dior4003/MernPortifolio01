import mongoose from "mongoose";
import dotenv from "dotenv";
import app from "./app.js";

dotenv.config();

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

const startServer = async () => {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("✅ MongoDB ulandi");

    app.listen(PORT, () => {
      console.log(`🚀 Server http://localhost:${PORT} portda ishga tushdi`);
    });
    
  } catch (err) {
    console.error("❌ MongoDB ulanishda xatolik:", err.message);
    process.exit(1);
  }
};

startServer();