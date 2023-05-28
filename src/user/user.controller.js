import userModel from './user.model';
import jwt from 'jsonwebtoken';

export async function createUser(req, res) {
  try {
    const user = req.body;
    req.body.active = true;
    const result = await userModel.create(user);
    res.status(201).json(result);
  } catch (err) {
    res.status(400).json(err.message);
  }
}

export async function readUserByCredentials(req, res) {
  try {
    const { email, password } = req.query;
    const result = await userModel.findOne({ email, password, active: true });

    if (result) {
      const token = jwt.sign(result.toJSON(), process.env.SECRET_KEY);
      return res.status(200).json({ token: token });
    }
    res.sendStatus(404);
  } catch (err) {
    return res.status(400).json(err.message);
  }
}

export async function readUserById(req, res) {
  try {
    const id = req.params.id;
    const result = await userModel.findOne({ _id: id, active: true });
    result ? res.status(200).json(result) : res.sendStatus(404);
  } catch (err) {
    res.status(400).json(err.message);
  }
}

export async function updateUser(req, res) {
  try {
    const id = req.params.id;
    const result = await userModel.findOneAndUpdate(
      { _id: id, active: true },
      req.body,
      {
        runValidators: true,
      }
    );
    result
      ? res.status(200).json('Changes made to the user with id ' + id)
      : res.sendStatus(404);
  } catch (err) {
    res.status(400).json(err.message);
  }
}

export async function deleteUser(req, res) {
  try {
    const id = req.params.id;
    const result = await userModel.findOneAndUpdate({ _id: id, active: false });
    result
      ? res
          .status(200)
          .json('The user with the id ' + id + ' has been "deleted"')
      : res.sendStatus(404);
  } catch (err) {
    res.status(400).json(err.message);
  }
}
