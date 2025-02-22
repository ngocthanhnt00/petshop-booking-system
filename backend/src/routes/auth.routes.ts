import { Router, Request, Response } from 'express';
import {
  signupController,
  loginController,
  logoutController,
  authCheckController,
	forgotPasswordController,
	
} from '../controllers/auth.controllers.js';
import { protectRoute } from '../middlewares/protectRoute.js';

const authRouter = Router();

authRouter.post('/signup', signupController);
authRouter.post('/login', loginController);
authRouter.post('/logout', logoutController);
authRouter.get('/authCheck', protectRoute, authCheckController);
authRouter.post('/forgotPassword', forgotPasswordController);

export default authRouter;
