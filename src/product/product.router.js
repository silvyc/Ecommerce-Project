import { Router } from 'express';
import {
  createProduct,
  deleteProduct,
  readProductById,
  readProducts,
  updateProduct,
} from './product.controller';
import authenticate from '../auth/authenticate';

const productRouter = Router();

productRouter.post('/', authenticate, createProduct);
productRouter.get('/', readProducts);
productRouter.get('/:_id', readProductById);
productRouter.patch('/:_id', authenticate, updateProduct);
productRouter.delete('/_:id', authenticate, deleteProduct);

export default productRouter;
