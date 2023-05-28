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

export async function updateProduct(req, res) {
  try {
    const id = req.params.id;
    const result = await productModel.findOneAndUpdate(
      { _id: id, active: true },
      req.body,
      {
        runValidators: true,
      }
    );
    result
      ? res.status(200).json('Changes made to the product with id ' + id)
      : res.sendStatus(404);
  } catch (err) {
    res.status(400).json(err.message);
  }
}
export async function deleteProduct(req, res) {
  try {
    const id = req.params.id;
    const result = await productModel.findOneAndUpdate({
      _id: id,
      active: false,
    });
    result
      ? res
          .status(200)
          .json('The product with the id ' + id + ' has been "deleted"')
      : res.sendStatus(404);
  } catch (err) {
    res.status(400).json(err.message);
  }
}
