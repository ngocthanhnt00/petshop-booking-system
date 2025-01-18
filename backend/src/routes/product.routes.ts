import { Router } from 'express';
import { getAllProduct, insertProduct } from '~/controllers/product.controllers';
import { protectRoute, requireAdmin } from '~/middlewares/protectRoute';

const productRouter = Router();
productRouter.get('/products', getAllProduct);
productRouter.post('/products', protectRoute, requireAdmin, insertProduct);

export default productRouter;
