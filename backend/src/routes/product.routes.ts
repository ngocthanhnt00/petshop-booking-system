import { Router } from 'express';
import {
  getAllProduct,
  getProductById,
  insertProduct,
  toggleProduct,
  updateProduct
} from '../controllers/product.controllers';
import { protectRoute, requireAdmin } from '../middlewares/protectRoute';
import { get } from 'http';
import { verifyToken } from '../middlewares/verifyToken';

const productRouter = Router();
productRouter.get('/products', getAllProduct);
productRouter.get('/products/:id', getProductById);
productRouter.post('/products', verifyToken, requireAdmin, insertProduct);
productRouter.patch('/products/:id', verifyToken, requireAdmin, updateProduct);
// productRouter.delete('/products/:id', protectRoute, requireAdmin, toggleProduct);

export default productRouter;
