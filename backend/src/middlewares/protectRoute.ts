import jwt from 'jsonwebtoken';
import ENV_VARS from '~/config.js';
import userModel from '~/models/user.model.js';
import { Request, Response, NextFunction } from 'express';
export const protectRoute = async (
  req: Request & { user?: { _id: string; email: string; role: string }; token?: string },
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.cookies['token'];
    console.log('Token ne', token);
    if (!token) {
      return res.status(401).json({ message: 'You are not authorized to access this route' });
    }
    if (!ENV_VARS.JWT_SECRET) {
      return res.status(500).json({ message: 'Internal Server Error' });
    }
    const decoded = jwt.verify(token, ENV_VARS.JWT_SECRET) as jwt.JwtPayload & { userId: string };
    if (!decoded) {
      return res.status(401).json({ message: 'You are not authorized to access this route' });
    }
    const user = await userModel.findById(decoded.userId).select('-password');
    console.log('User, : ', user);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    req.user = user;
    req.token = token;
    next();
  } catch (error) {
    if (error instanceof Error) {
      console.error(`Error protecting route middlewares: ${error.message}`);
    } else {
      console.error('Error protecting route middlewares:', error);
    }
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
