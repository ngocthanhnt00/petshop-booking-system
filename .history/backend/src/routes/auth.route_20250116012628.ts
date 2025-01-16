import express from 'express';
import { Request, Response } from 'express';
import { login, logout, signup, getUser } from '../controller/auth.controller';

const router = express.Router();

// Định nghĩa rõ kiểu Request và Response cho các middleware
router.post('/signup', (req: Request, res: Response) => signup(req, res));
router.post('/login', (req: Request, res: Response) => login(req, res));
router.post('/logout', (req: Request, res: Response) => logout(req, res));
router.get('/user', (req: Request, res: Response) => getUser(req, res));

export default router;
