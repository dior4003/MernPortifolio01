import mongoose from "mongoose";

export const connectTestDB = async () => {
  try {
      const uri = process.env.MONGO_URI_TEST || "mongodb://127.0.0.1:27017/portfolio_test_db";
          await mongoose.connect(uri, {
                useNewUrlParser: true,
                      useUnifiedTopology: true
                          });
                              console.log("🧪 Test DB connected");
                                } catch (err) {
                                    console.error("❌ Test DB connection error", err);
                                        process.exit(1);
                                          }
                                          };