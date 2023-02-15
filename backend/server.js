import { app } from "./app.js";
import dotenv from "dotenv";
import { connectDatabase } from "./config/database.js";
import cloudinary from "cloudinary";

dotenv.config({ path: "./backend/config/config.env" });

connectDatabase();

cloudinary.v2.config({
  cloud_name: "dz0usc7xe",
  api_key: "773251549637743",
  api_secret: "px2gy6V98c6nrzL0ZON7ZQd1OF0",
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port: ${process.env.PORT} `);
});
