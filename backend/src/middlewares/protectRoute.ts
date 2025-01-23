import jwt from 'jsonwebtoken';
import ENV_VARS from '../config.js';
import userModel from '../models/user.model.js';
import { Request, Response, NextFunction } from 'express';
import { IUser } from '../interfaces/user.interface';
import { UserRoles } from '../enums/user.enum';
interface AuthenticatedRequest extends Request {
  user?: IUser;
  token?: string;
}

export const protectRoute = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const token = req.cookies?.token;
    console.log('Token:', token);

    if (!token) {
      res.status(401).json({ message: 'You are not authorized to access this route' });
      return;
    }

    if (!ENV_VARS.JWT_SECRET) {
      res.status(500).json({ message: 'Internal Server Error' });
      return;
    }

    const decoded = jwt.verify(token, ENV_VARS.JWT_SECRET) as jwt.JwtPayload & { userId: string };

    if (!decoded) {
      res.status(401).json({ message: 'You are not authorized to access this route' });
      return;
    }

    const user = await userModel.findById(decoded.userId).select('-password');
    console.log('User:', user);

    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    req.user = user;
    req.token = token;
    next();
  } catch (error) {
    console.error('Error in protectRoute middleware:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
export const requireAdmin = (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
  if (!req.user) {
    res.status(401).json({ message: 'Bạn chưa đăng nhập' });
    return;
  }

  if (req.user.role !== UserRoles.ADMIN) {
    res.status(403).json({ message: 'Bạn không có quyền thực hiện hành động này' });
    return;
  }
  next();
};
