import { Router, Request, Response } from 'express';
import {
  getAllCategory,
  toggleCategory,
  insertCategory,
  updateCategory,
  getCategoryById
} from '../controllers/category.controllers';
import { protectRoute, requireAdmin } from '../middlewares/protectRoute';
import { verifyToken } from '../middlewares/verifyToken';

const categoryRouter = Router();

categoryRouter.get('/categories', getAllCategory);
categoryRouter.get('/categories/:id', getCategoryById);
categoryRouter.post('/categories', verifyToken, requireAdmin, insertCategory);
categoryRouter.patch('/categories/:id', verifyToken, requireAdmin, updateCategory);
// categoryRouter.delete('/categories/:id', protectRoute, requireAdmin, toggleCategory);

export default categoryRouter;
