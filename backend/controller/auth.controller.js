import { userModel } from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { generateTokenAndSetCookie } from "../utils/generateToken.js";
export async function signup(req, res) {
  try {
    const { email, password, username } = req.body;
    if ((!email || !password, !username)) {
      return res.status(400).json({
        success: false,
        message: "Please provide an email, password and username",
      });
    }
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!regexEmail.test(email)) {
      return res
        .status(400)
        .json({ success: false, message: "Please provide a valid email" });
    }
    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters",
      });
    }
    if (username.length < 3) {
      return res.status(400).json({
        success: false,
        message: "Username must be at least 3 characters",
      });
    }
    const existingUserByEmail = await userModel.findOne({ email: email });

    if (existingUserByEmail) {
      return res.status(400).json({
        success: false,
        message: "User with this email already exists",
      });
    }
    const existingUserByName = await userModel.findOne({ username: username });
    if (existingUserByName) {
      return res.status(400).json({
        success: false,
        message: "User with this username already exists",
      });
    }
    const salt = await bcryptjs.genSalt(10); // Correct method is genSalt
    const hashedPassword = await bcryptjs.hash(password, salt);
    const PROFILE_PIC = [
      "avatar1.png",
      "avatar2.png",
      "avatar3.png",
      "avatar4.png",
      "avatar5.png",
      "avatar6.png",
      "avatar7.png",
      "avatar8.png",
      "avatar9.png",
      "avatar10.png",
    ];
    const avatar = Math.floor(Math.random() * PROFILE_PIC.length);
    const newUser = new userModel({
      email,
      password: hashedPassword,
      username,
      image: PROFILE_PIC[avatar],
    });
    generateTokenAndSetCookie(newUser._id, res);

    await newUser.save();
    res.status(201).json({
      success: true,
      user: { ...newUser._doc, password: hashedPassword },
    });
  } catch (error) {
    // Error handling
    console.error(`Error signing up: ${error.message}`);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}

export async function login(req, res) {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email: email });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "Invalid email and password" });
    }
    const isPasswordValid = await bcryptjs.compare(password, user.password);
    if (!isPasswordValid) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid email and password" });
    }
    generateTokenAndSetCookie(user._id, res);
    return res
      .status(200)
      .json({ success: true, user: { ...user._doc, password: "" } });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
}

export async function logout(req, res) {
  try {
    res.clearCookie("token");
    res.status(200).json({ success: true, message: "Logged out successfully" });
  } catch (error) {
    console.log(`Error logging out: ${error.message}`);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}
export async function getUser(req, res) {
  try {
    const users = await userModel.find().lean();
    if (!users || users.length === 0) {
      return res
        .status(401)
        .json({ success: false, message: "Không tìm thấy user" });
    }
    const usersWithoutPassword = users.map((user) => {
      const { password, ...userWithoutPassword } = user;
      return userWithoutPassword;
    });
    res.status(200).json({ success: true, users: usersWithoutPassword });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}
