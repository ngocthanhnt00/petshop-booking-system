import jwt from "jsonwebtoken";
import ENV_VARS from "../config.js";

export const generateTokenAndSetCookie = async (userId, res) => {
  const token = jwt.sign({ userId }, ENV_VARS.JWT_SECRET, {
    expiresIn: "30d",
  });
  res.cookie("token", token, {
    httpOnly: true,
    maxAge: 30 * 24 * 60 * 60 * 1000,
    sameSite: "strict",
    secure: ENV_VARS.NODE_ENV === "production",
    // https just for production
    // http just for development
  });
  return token;
};
