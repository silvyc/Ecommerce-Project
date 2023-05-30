import jwt from 'jsonwebtoken';
import userModel from '../user/user.model';

export const secretKey = process.env.SECRET_KEY || '5d34ade5ff13201f';

export default async function authenticate(req, res, next) {
  try {
    const authorization = req.headers.authorization;
    const token = authorization?.split(' ')[1];
    const payload = jwt.verify(token, secretKey);
    const { _id } = payload;
    const result = await userModel.findById(_id);

    if (result) {
      req.user = result;
      return next();
    }

    return res.sendStatus(404);
  } catch (err) {
    res.status(400).json(err.message);
  }
}
