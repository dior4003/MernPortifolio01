import mongoose from "mongoose";

export const connectDatabase = () => {
  mongoose
    .connect(
      "mongodb+srv://dior4324003:diyor914324003@cluster0.ukawswg.mongodb.net/?retryWrites=true"
    )
    .then((c) => {
      console.log(`Mongodb connect to: ${c.connection.host}`);
    })
    .catch((e) => {
      console.log(e);
    });
};
