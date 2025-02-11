import { Router } from 'express';

import { protectRoute } from '../middlewares/protectRoute';
const userRouter = Router();
import { getAllUser, updateUser } from '../controllers/user.controllers';
userRouter.get('/users', protectRoute, getAllUser);
userRouter.patch('/users/:id', protectRoute, updateUser);

export default userRouter;
