import mongoose from "mongoose";

export const connectDatabase = () => {
  mongoose
    .connect(
      "mongodb+srv://diyor3056:VfRiIjECchJhmMgq@>@cluster0.vkgqw.mongodb.net/?retryWrites=true"
    )
    .then((c) => {
      console.log(`Mongodb connect to: ${c.connection.host}`);
    })
    .catch((e) => {
      console.log(e);
    });
};
