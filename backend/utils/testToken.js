import jwt from "jsonwebtoken";

export const generateTestToken = (userId, role = "user") => {
  return jwt.sign({ _id: userId, role }, process.env.JWT_SECRET, {
    expiresIn: "7d"
  });
};