import { Router } from 'express';
import { getAllProduct, insertProduct, toggleProduct, updateProduct } from '../controllers/product.controllers';
import { protectRoute, requireAdmin } from '../middlewares/protectRoute';

const productRouter = Router();
productRouter.get('/products', getAllProduct);
productRouter.post('/products', protectRoute, requireAdmin, insertProduct);
productRouter.patch('/products/:id', protectRoute, requireAdmin, updateProduct);
productRouter.delete('/products/:id', protectRoute, requireAdmin, toggleProduct);

export default productRouter;
