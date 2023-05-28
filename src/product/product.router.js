import { Router } from 'express';
import {
  createProduct,
  deleteProduct,
  readProductById,
  readProductByUC,
  updateProduct,
} from './product.controller';

const productRouter = Router();

productRouter.post('/', createProduct);
productRouter.get('/', readProductByUC);
productRouter.get('/:id', readProductById);
productRouter.patch('/:id', updateProduct);
productRouter.delete('/:id', deleteProduct);

export default productRouter;
