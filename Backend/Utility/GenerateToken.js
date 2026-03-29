import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();
const secret_key = process.env.JWT_SECRET_KEY;

export const generateToken = (id) => {
  return jwt.sign(
    { id },
    secret_key,
    { expiresIn: "100d" }
  );
};