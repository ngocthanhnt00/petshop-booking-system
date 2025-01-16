import { Request, Response } from 'express';
import bcryptjs from 'bcryptjs';
import userModel from '~/models/user.model.js'; // Adjust the path according to your project structure
import { generateTokenAndSetCookie } from '~/utils/generateToken.js'; // Adjust the path according to your project structure

export const signupController = async (req: Request, res: Response): Promise<Response | void> => {
  try {
    const { email, password, username } = req.body;
    if (!email || !password || !username) {
      return res.status(400).json({
        success: false,
        message: 'Please provide an email, password and username'
      });
    }

    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regexEmail.test(email)) {
      return res.status(400).json({ success: false, message: 'Please provide a valid email' });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'Password must be at least 6 characters'
      });
    }

    if (username.length < 3) {
      return res.status(400).json({
        success: false,
        message: 'Username must be at least 3 characters'
      });
    }

    const existingUserByEmail = await userModel.findOne({ email });
    if (existingUserByEmail) {
      return res.status(400).json({
        success: false,
        message: 'User with this email already exists'
      });
    }

    const existingUserByName = await userModel.findOne({ username });
    if (existingUserByName) {
      return res.status(400).json({
        success: false,
        message: 'User with this username already exists'
      });
    }

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const PROFILE_PIC = ['avatar1.png', 'avatar2.png', 'avatar3.png'];
    const avatar = Math.floor(Math.random() * PROFILE_PIC.length);

    const newUser = new userModel({
      email,
      password: hashedPassword,
      username,
      image: PROFILE_PIC[avatar]
    });

    await newUser.save();
    generateTokenAndSetCookie(newUser._id, res);

    res.status(201).json({
      success: true,
      user: { ...newUser._doc, password: '' }
    });
  } catch (error) {
    if (error instanceof Error) {
      console.error(`Error signing up: ${error.message}`);
    } else {
      console.error('Error signing up:', error);
    }
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};
