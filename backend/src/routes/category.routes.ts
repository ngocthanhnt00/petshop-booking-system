import { Router, Request, Response } from 'express';
import {
  getAllCategory,
  toggleCategory,
  insertCategory,
  updateCategory,
  getCategoryById
} from '../controllers/category.controllers';
import { protectRoute, requireAdmin } from '../middlewares/protectRoute';

const categoryRouter = Router();

categoryRouter.get('/categories', getAllCategory);
categoryRouter.get('/categories/:id', getCategoryById);
categoryRouter.post('/categories', protectRoute, requireAdmin, insertCategory);
categoryRouter.patch('/categories/:id', protectRoute, requireAdmin, updateCategory);
categoryRouter.delete('/categories/:id', protectRoute, requireAdmin, toggleCategory);

export default categoryRouter;
