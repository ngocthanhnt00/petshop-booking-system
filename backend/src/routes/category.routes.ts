import { Router, Request, Response } from 'express';
import { getAllCategory, toggleCategory, insertCategory, updateCategory } from '~/controllers/category.controllers';
import { protectRoute, requireAdmin } from '~/middlewares/protectRoute';

const categoryRouter = Router();

categoryRouter.get('/categories', getAllCategory);
categoryRouter.post('/categories', protectRoute, insertCategory);
categoryRouter.patch('categories/:id', protectRoute, updateCategory);
categoryRouter.delete('/categories/:id', protectRoute, requireAdmin, toggleCategory);

export default categoryRouter;
