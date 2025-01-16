import { Router, Request, Response } from 'express';
import { signupController } from '~/controllers/auth.controllers.js';

const authRouter = Router();

authRouter.post('/signup', signupController);

export default authRouter;
