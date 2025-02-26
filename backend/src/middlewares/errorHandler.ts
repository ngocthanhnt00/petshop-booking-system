import { Request, Response, NextFunction, ErrorRequestHandler } from 'express';

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  console.error('🔥 Error caught by middleware:', err.message);

  if (err.name === 'ValidationError') {
    res.status(400).json({ success: false, message: err.message });
  } else if (err.name === 'JsonWebTokenError') {
    res.status(401).json({ success: false, message: 'Invalid token' });
  } else if (err.name === 'TokenExpiredError') {
    res.status(401).json({ success: false, message: 'Token expired' });
  } else {
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};
