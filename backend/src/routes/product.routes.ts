import { Router } from 'express';
import {
  getAllProduct,
  getCatProducts,
  getDogProducts,
  getHotProduct,
  getNewProduct,
  getProductById,
  getSaleProduct,
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
productRouter.get('/newproducts', getNewProduct);
productRouter.get('/saleproducts', getSaleProduct);
productRouter.get('/hotproducts', getHotProduct);
productRouter.get('/dog-products', getDogProducts);
productRouter.get('/cat-products', getCatProducts);
// productRouter.delete('/products/:id', protectRoute, requireAdmin, toggleProduct);

export default productRouter;
