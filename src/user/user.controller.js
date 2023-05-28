import userModel from './user.model';
import jwt from 'jsonwebtoken';

export async function createUser(req, res) {
  try {
    const user = req.body;
    user.active = true;
    const result = await userModel.create(user);
    res.status(201).json(result);
  } catch (err) {
    res.status(400).json(err.message);
  }
}

export async function login(req, res) {
  try {
    const { email, password } = req.body;
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
    const _id = req.params.id;
    const result = await userModel.findOne({ _id, active: true });
    result ? res.status(200).json(result) : res.sendStatus(404);
  } catch (err) {
    res.status(400).json(err.message);
  }
}

export async function updateUser(req, res) {
  try {
    const { _id } = req.user;
    const updates = req.body;
    const result = await userModel.updateOne({ _id, active: true }, updates, {
      runValidators: true,
    });
    result ? res.status(200).json(result) : res.sendStatus(404);
  } catch (err) {
    res.status(400).json(err.message);
  }
}

export async function deleteUser(req, res) {
  try {
    const { _id } = req.user;
    const result = await userModel.updateOne(
      { _id, active: true },
      { active: false }
    );
    result ? res.status(200).json(result) : res.sendStatus(404);
  } catch (err) {
    res.status(400).json(err.message);
  }
}
