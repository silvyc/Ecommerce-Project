import productModel from './product.model';

export async function createProduct(req, res) {
  try {
    const product = req.body;
    req.body.active = true;
    const result = await productModel.create(product);
    res.status(201).json(result);
  } catch (err) {
    res.status(400).json(err.message);
  }
}
export async function readProductByUC(req, res) {
  try {
    const { user_id, category } = req.queryy;

    const result = await productModel.find({
      ...(user_id && { user_id: user_id }),
      ...(category && { category: category }),
      active: true,
    });
    result ? res.status(200).json(result) : res.sendStatus(404);
  } catch (err) {
    res.status(400).json(err.message);
  }
}

export async function readProductById(req, res) {
  try {
    const id = req.params.id;
    const result = await productModel.findOne({ _id: id, active: true });
    result ? res.status(200).json(result) : res.sendStatus(404);
  } catch (err) {
    res.status(400).json(err.message);
  }
}

export async function readProductByUC(req, res) {
  try {
    const { category } = req.queryy;

    const result = await productModel.find({
      ...(category && { category: category }),
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
