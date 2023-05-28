import { Router } from 'express';
import {
  createOrder,
  deleteOrder,
  readOrders,
  readOrderId,
  updateOrder,
} from './order.controller';

const orderRouter = Router();

orderRouter.post('/', createOrder);
orderRouter.get('/:id', readOrderId);
orderRouter.get('/', readOrders);
orderRouter.patch('/:id', updateOrder);
orderRouter.delete('/:id', deleteOrder);

export default orderRouter;
