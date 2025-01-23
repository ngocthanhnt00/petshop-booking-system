import { Router } from 'express';
import { getAllProduct, insertProduct, toggleProduct } from '~/controllers/product.controllers';
import { protectRoute, requireAdmin } from '~/middlewares/protectRoute';

const productRouter = Router();
productRouter.get('/products', getAllProduct);
productRouter.post('/products', protectRoute, requireAdmin, insertProduct);
productRouter.delete('/products/:id', toggleProduct);

export default productRouter;
