import { Router } from 'express';
import {
  createUser,
  deleteUser,
  readUserByCredentials,
  readUserById,
  updateUser,
} from './user.controller';

const userRouter = Router();

userRouter.post('/', createUser);
userRouter.get('/', readUserByCredentials);
userRouter.get('/:id', readUserById);
userRouter.patch('/:id', updateUser);
userRouter.delete('/:id', deleteUser);

export default userRouter;
