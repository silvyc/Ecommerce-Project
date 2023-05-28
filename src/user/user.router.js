import { Router } from 'express';
import {
  createUser,
  deleteUser,
  readUserById,
  readUserByMP,
  updateUser,
} from './user.controller';

const userRouter = Router();

userRouter.post('/', createUser);
userRouter.get('/:email/:password', readUserByMP);
userRouter.get('/:id', readUserById);
userRouter.patch('/:id', updateUser);
userRouter.delete('/:id', deleteUser);

export default userRouter;
