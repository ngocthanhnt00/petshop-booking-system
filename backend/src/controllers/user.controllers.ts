import { Request, Response } from 'express';
import userModel from '../models/user.model';

export const getAllUser = async (req: Request, res: Response) => {
  try {
    const result = await userModel.find();
    res.status(200).json({ success: true, result });
  } catch (error) {
    if (error instanceof Error) {
      console.error(`Error user up: ${error.message}`);
    } else {
      console.error('Error user up:', error);
    }
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    console.log(id, 'ID');
    const { email, fullname, phone_number, address, role, avatar_url } = req.body;

    if (!email || !fullname || !phone_number || !address || !role || !avatar_url) {
      res.status(400).json({
        success: false,
        message: 'Vui lòng cung cấp đầy đủ thông tin người dùng'
      });
    }
    const updatedUser = await userModel.findByIdAndUpdate(
      id,
      { email, fullname, phone_number, address, role, avatar_url },
      { new: true, runValidators: true }
    );
    if (!updatedUser) {
      res.status(404).json({ message: 'Không tìm thấy người dùng' });
      return;
    }
    res.status(200).json({ message: 'Người dùng đã được cập nhật thành công', user: updatedUser });
  } catch (error) {
    if (error instanceof Error) {
      console.error(`Error user up: ${error.message}`);
    } else {
      console.error('Error user up:', error);
    }
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};
