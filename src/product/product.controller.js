import productModel from './product.model';

export async function createProduct(req, res) {
  try {
    const product = req.body;
    product.user_id = req.user._id;
    product.active = true;
    const result = await productModel.create(req.body);
    res.status(201).json(result);
  } catch (err) {
    res.status(400).json(err.message);
  }
}

export async function readProductById(req, res) {
  try {
    const _id = req.params.id;
    const result = await productModel.findOne({ _id, active: true });
    result ? res.status(200).json(result) : res.sendStatus(404);
  } catch (err) {
    res.status(400).json(err.message);
  }
}

export async function readProducts(req, res) {
  try {
    const { name, user_id } = req.query;
    const categories = req.query.categories?.split(',');

    const result = await productModel.find({
      ...(name && { name: new RegExp(name, 'i') }),
      ...(user_id && { user_id: user_id }),
      ...(categories && { categories: { $in: categories } }),
      active: true,
    });
    result ? res.status(200).json(result) : res.sendStatus(404);
  } catch (err) {
    res.status(400).json(err.message);
  }
}

export async function readUserCategories(req, res) {
  try {
    const { user_id } = req.params;
    const result = await productModel.aggregate([
      { $match: { user_id } },
      { $unwind: '$categories' },
      { $group: { _id: '$categories' } },
    ]);
    result.length ? res.status(200).json(result) : res.sendStatus(404);
  } catch (err) {
    res.status(400).json(err.message);
  }
}

export async function updateProduct(req, res) {
  try {
    const _id = req.params.id;
    const result = await productModel.updateOne(
      { _id, active: true },
      req.body,
      {
        runValidators: true,
      }
    );
    result ? res.status(200).json(result) : res.sendStatus(404);
  } catch (err) {
    res.status(400).json(err.message);
  }
}

export async function deleteProduct(req, res) {
  try {
    const _id = req.params.id;
    const result = await productModel.findOneAndUpdate({
      _id: _id,
      active: false,
    });
    result
      ? res
          .status(200)
          .json('The product with the id ' + _id + ' has been "deleted"')
      : res.sendStatus(404);
  } catch (err) {
    res.status(400).json(err.message);
  }
}

export async function rateProduct(req, res) {
  try {
    const id = req.params.id;
  } catch (error) {
    res.status(400).json(err.message);
  }
}
