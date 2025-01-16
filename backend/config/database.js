import mongoose from "mongoose";

export const connectDatabase = () => {
  mongoose
    .connect(
      "mongodb+srv://dior4003:diyor.1124@cluster0.vkgqw.mongodb.net/?retryWrites=true"
    )
    .then((c) => {
      console.log(`Mongodb connect to: ${c.connection.host}`);
    })
    .catch((e) => {
      console.log(e);
    });
};
