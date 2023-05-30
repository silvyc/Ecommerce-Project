import express from 'express';
import userRouter from './user/user.router';
import productRouter from './product/product.router';
import orderRouter from './order/order.router';

const app = express();
const port = process.env.PORT || 3000;
let server;

app.use(express.json());

app.use('/user', userRouter);
app.use('/product', productRouter);
app.use('/order', orderRouter);

export function startListening() {
  try {
    server = app.listen(port);
    console.log('server running on port ' + port);
  } catch (error) {
    console.log(error);
  }
}

export function closeServer() {
  server.close();
}

export default app;
