import { Router } from 'express';
import {
  createProduct,
  deleteProduct,
  readProductById,
  readProducts,
  readUserCategories,
  updateProduct,
} from './product.controller';
import authenticate from '../auth/authenticate';

const productRouter = Router();

productRouter.post('/', authenticate, createProduct);
productRouter.post('/:_id');
productRouter.get('/:_id', readProductById);
productRouter.get('/', readProducts);
productRouter.get('/categories/:user_id', readUserCategories);
productRouter.patch('/:_id', authenticate, updateProduct);
productRouter.delete('/_:id', authenticate, deleteProduct);

export default productRouter;
