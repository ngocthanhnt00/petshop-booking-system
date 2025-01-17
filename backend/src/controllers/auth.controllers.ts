import { Request, Response } from 'express';
import bcryptjs from 'bcryptjs';
import userModel from '~/models/user.model'; // Adjust the path according to your project structure
import { generateTokenAndSetCookie } from '~/utils/generateToken.js'; // Adjust the path according to your project structure

export const signupController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password, fullname } = req.body;
    if (!email || !password || !fullname) {
      res.status(400).json({
        success: false,
        message: 'Please provide an email, password and fullname'
      });
    }

    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regexEmail.test(email)) {
      res.status(400).json({ success: false, message: 'Please provide a valid email' });
    }

    if (password.length < 6) {
      res.status(400).json({
        success: false,
        message: 'Password must be at least 6 characters'
      });
    }

    if (fullname.length < 3) {
      res.status(400).json({
        success: false,
        message: 'Username must be at least 3 characters'
      });
    }

    const existingUserByEmail = await userModel.findOne({ email });
    if (existingUserByEmail) {
      res.status(400).json({
        success: false,
        message: 'User with this email already exists'
      });
    }
    // const existingUserByName = await userModel.findOne({ username });
    // if (existingUserByName) {
    //   res.status(400).json({
    //     success: false,
    //     message: 'User with this username already exists'
    //   });
    // }

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const PROFILE_PIC = ['avatar1.png', 'avatar2.png', 'avatar3.png'];
    const avatar = Math.floor(Math.random() * PROFILE_PIC.length);

    const newUser = new userModel({
      email,
      password: hashedPassword,
      fullname,
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

export const loginController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;
    console.log('Email', email);
    console.log('Password', password);
    const user = await userModel.findOne({ email });
    if (!user) {
      res.status(404).json({ success: false, message: 'Invalid email and password' });
    }

    const isPasswordValid = await bcryptjs.compare(password, user.password);
    if (!isPasswordValid) {
      res.status(401).json({ success: false, message: 'Invalid email and password' });
    }

    generateTokenAndSetCookie(user._id, res);
    res.status(200).json({ success: true, user: { ...user._doc, password: '' } });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};
export const logoutController = async (req: Request, res: Response): Promise<void> => {
  try {
    res.clearCookie('token');
    res.status(200).json({ success: true, message: 'Logged out successfully' });
  } catch (error) {
    if (error instanceof Error) {
      console.log(`Error logging out: ${error.message}`);
    } else {
      console.log('Error logging out:', error);
    }
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};
export const authCheckController = async (
  req: Request & { user?: { _id: string; email: string; role: string }; token?: string },
  res: Response
): Promise<void> => {
  try {
    console.log('req.user', req.user);
    res.status(200).json({ success: true, user: req.user, token: req.token });
  } catch (error) {
    if (error instanceof Error) {
      console.log('Error in authCheck controller', error.message);
    } else {
      console.log('Error in authCheck controller', error);
    }
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};
