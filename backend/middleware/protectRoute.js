import express from "express";
import jwt from "jsonwebtoken";
import ENV_VARS from "../config.js";
import { userModel } from "../models/user.model.js";
export const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies["token"];
    if (!token) {
      return res.status(401).json({ message: "You are not authorized to access this route" });
    }
    const decoded = jwt.verify(token, ENV_VARS.JWT_SECRET);
    if (!decoded) {
      return res.status(401).json({ message: "You are not authorized to access this route" });
    }
    const user = await userModel.findById(decoded.userId).select("-password");
    console.log("User, : ", user);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    req.user = user;
    next();
  } catch (error) {
    console.error(`Error protecting route middlewares: ${error.message}`);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
