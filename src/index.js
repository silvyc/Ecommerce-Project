import express from 'express';
import userRouter from './user/user.router';
import restaurantRouter from './restaurant/restaurant.router';
import productRouter from './product/product.router';
import orderRouter from './order/order.router';
import mongoose from 'mongoose';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use('/user', userRouter);
app.use('/restaurant', restaurantRouter);
app.use('/product', productRouter);
app.use('/order', orderRouter);

//mongodb+srv://<username>:<password>@clusterdbe.cdgt9rh.mongodb.net/test

mongoose
  .connect('mongodb+srv://clusterdbe.cdgt9rh.mongodb.net/', {
    dbName: 'delivery',
    user: 'silvyc',
    pass: 'BrqV8MHnGviG1kC9',
  })
  .then(() => console.log('Database connected successfully'))
  .catch((err) => console.log(err));

try {
  app.listen(port);
  console.log('server running on port ' + port);
} catch (error) {
  console.log(error);
}
