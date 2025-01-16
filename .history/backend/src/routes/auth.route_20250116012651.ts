import express, { Request, Response, NextFunction } from 'express';
import { login, logout, signup, getUser } from '../controller/auth.controller';

const router = express.Router();

// Định nghĩa rõ kiểu Request và Response cho các middleware
router.post('/signup', async (req: Request, res: Response, next: NextFunction) => {
	try {
		await signup(req, res); // Await the signup function
	} catch (error) {
		next(error); // Pass any errors to the next middleware
	}
});

router.post('/login', async (req: Request, res: Response, next: NextFunction) => {
	try {
		await login(req, res); // Await the login function
	} catch (error) {
		next(error); // Pass any errors to the next middleware
	}
});

router.post('/logout', async (req: Request, res: Response, next: NextFunction) => {
	try {
		await logout(req, res); // Await the logout function
	} catch (error) {
		next(error); // Pass any errors to the next middleware
	}
});

router.get('/user', (req: Request, res: Response) => getUser(req, res));

export default router;
