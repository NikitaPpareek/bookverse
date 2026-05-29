import jwt from "jsonwebtoken";

const generateToken = (userId) =>
  jwt.sign({ id: userId }, process.env.JWT_SECRET || "bookverse_dev_secret", {
    expiresIn: process.env.JWT_EXPIRE || "7d",
  });

export default generateToken;
