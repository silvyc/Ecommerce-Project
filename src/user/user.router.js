import { Router } from 'express';
import {
  createUser,
  deleteUser,
  login,
  readUserById,
  updateUser,
} from './user.controller';
import authenticate from '../auth/authenticate';

const userRouter = Router();

userRouter.post('/login', login);
userRouter.post('/', createUser);
userRouter.get('/:_id', readUserById);
userRouter.patch('/', authenticate, updateUser);
userRouter.delete('/', authenticate, deleteUser);

export default userRouter;
