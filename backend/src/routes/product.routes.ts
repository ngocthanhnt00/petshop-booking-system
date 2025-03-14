import { Router } from 'express';
import {
  getAllProduct,
  getNewProduct,
  getProductById,
  insertProduct,
  getSaleProduct,
  getHotProduct,
  getDogProducts,
  getCatProducts,
	searchProductsByKey
} from '../controllers/product.controllers';
import { protectRoute, requireAdmin } from '../middlewares/protectRoute';
import { get } from 'http';
import { verifyToken } from '../middlewares/verifyToken';

const productRouter = Router();
productRouter.get('/products', getAllProduct);
productRouter.get('/products/:id', getProductById);
productRouter.get('/newproducts', getNewProduct);
productRouter.get('/saleproducts', getSaleProduct);
productRouter.get('/hotproducts', getHotProduct);
productRouter.get('/dog-products', getDogProducts);
productRouter.get('/cat-products', getCatProducts);

productRouter.post('/products', verifyToken, requireAdmin, insertProduct);
productRouter.patch('/products/:id', verifyToken, requireAdmin, updateProduct);
productRouter.get('/newproducts', getNewProduct);
productRouter.get('/saleproducts', getSaleProduct);
productRouter.get('/hotproducts', getHotProduct);
productRouter.get('/dog-products', getDogProducts);
productRouter.get('/cat-products', getCatProducts);
// productRouter.delete('/products/:id', protectRoute, requireAdmin, toggleProduct);

productRouter.get('/products/search', searchProductsByKey)
// productRouter.get('/products/category/:categoryId', getProductsByCategoryId)
// productRouter.patch('/products/:id', verifyToken, requireAdmin, updateProduct);
// // productRouter.delete('/products/:id', protectRoute, requireAdmin, toggleProduct);


export default productRouter;
