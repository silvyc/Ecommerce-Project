import { Router } from 'express';
import {
  createProduct,
  deleteProduct,
  readProductById,
  readProductByRC,
  updateProduct,
} from './product.controller';

const productRouter = Router();

productRouter.post('/', createProduct);
productRouter.get('/', readProductByRC);
productRouter.get('/:id', readProductById);
productRouter.patch('/:id', updateProduct);
productRouter.delete('/:id', deleteProduct);

export default productRouter;
