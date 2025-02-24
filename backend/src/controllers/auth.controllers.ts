import { Request, Response } from 'express';
import bcryptjs from 'bcryptjs';
import crypto from 'crypto';
import sendEmail from '../utils/sendEmail';
import userModel from '../models/user.model'; // Adjust the path according to your project structure
import { generateAccessToken, generateRefreshToken } from '../utils/jwt.js'; // Adjust the path according to your project structure
import ENV_VARS from '../config';

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
      avatar: PROFILE_PIC[avatar]
    });

    await newUser.save();
    generateAccessToken(newUser._id, res);

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
      res.status(404).json({ success: false, message: 'user is not defined' });
      return;
    }

    const isPasswordValid = await bcryptjs.compare(password, user.password);
    if (!isPasswordValid) {
      res.status(401).json({ success: false, message: 'Invalid email and password' });
      return;
    }

    const accessToken = await generateAccessToken(user._id, res);
    const refreshToken = await generateRefreshToken(user._id, res);
    await userModel.findByIdAndUpdate(user._id, { refreshToken }, { new: true });
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: ENV_VARS.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });
    res.status(200).json({ success: true, user: { ...user._doc, password: '' }, accessToken });
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

export const forgotPasswordController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email } = req.body;
    console.log('email', email);
    if (!email) {
      res.status(400).json({ success: false, message: 'Please provide an email' });
      return;
    }

    const user = await userModel.findOne({ email });
    if (!user) {
      res.status(404).json({ success: false, message: 'User with this email does not exist' });
      return;
    }

    const resetToken = crypto.randomBytes(6).toString('hex');
    const resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    const resetPasswordExpire = Date.now() + 3 * 60 * 1000; // **3 phút**

    user.reset_password_token = resetPasswordToken;
    user.reset_password_expires = resetPasswordExpire;
    await user.save();

    const resetUrl = `${req.protocol}://${req.get('host')}/passwordreset/${resetToken}`;
    const message = `
			Mã xác nhận của bạn là: ${resetToken}
    `;

    try {
      await sendEmail(user.email, 'Reset Your PetShop Password', message, '');
      res.status(200).json({ success: true, message: 'Email sent' });
    } catch (error) {
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;
      await user.save();

      res.status(500).json({ success: false, message: 'Email could not be sent' });
    }
  } catch (error) {
    console.error(`Error in forgotPasswordController: ${error}`);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};
export const resetPasswordController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { resetToken, newPassword } = req.body;

    if (!resetToken || !newPassword) {
      res.status(400).json({ success: false, message: 'Mã xác nhận và mật khẩu mới là bắt buộc' });
      return;
    }

    // Hash resetToken để so sánh với token đã lưu trong DB
    const hashedToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    console.log(hashedToken, 'hashedToken');
    // Tìm user có token hợp lệ và chưa hết hạn
    const user = await userModel.findOne({
      reset_password_token: hashedToken,
      reset_password_expires: { $gt: Date.now() } // Kiểm tra xem token còn hạn không
    });

    if (!user) {
      res.status(400).json({ success: false, message: 'Mã xác nhận không hợp lệ hoặc đã hết hạn' });
      return;
    }
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(newPassword, salt);
    // Cập nhật mật khẩu mới
    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();

    res.status(200).json({ success: true, message: 'Mật khẩu đã được cập nhật thành công' });
  } catch (error) {
    console.error('Error in resetPasswordController:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};
