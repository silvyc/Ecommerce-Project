import orderModel from './order.model';

export async function createOrder(req, res) {
  try {
    const order = req.body;
    req.body.active = true;
    const result = await orderModel.create(order);
    res.status(201).json(result);
  } catch (err) {
    res.status(400).json(err.message);
  }
}

export async function readOrderId(req, res) {
  try {
    const id = req.params.id;
    const result = await orderModel.findOne({ _id: id, active: true });
    result ? res.status(200).json(result) : res.sendStatus(404);
  } catch (err) {
    res.status(400).json(err.message);
  }
}

export async function readOrders(req, res) {
  try {
    const { user_id, date1, date2 } = req.query;

    const result = await orderModel.find({
      ...(user_id && { user_id: user_id }),
      ...(date1 &&
        date2 && {
          createdAt: { $gte: new Date(date1), $lt: new Date(date2) },
        }),
      active: true,
    });
    result ? res.status(200).json(result) : res.sendStatus(404);
  } catch (err) {
    res.status(400).json(err.message);
  }
}

export async function updateOrder(req, res) {
  try {
    const id = req.params.id;
    const result = await orderModel.findOneAndUpdate(
      { _id: id, active: true },
      req.body,
      {
        runValidators: true,
      }
    );
    result
      ? res.status(200).json('Changes made to the order with id ' + id)
      : res.sendStatus(404);
  } catch (err) {
    res.status(400).json(err.message);
  }
}

export async function deleteOrder(req, res) {
  try {
    const id = req.params.id;
    const result = await orderModel.findByOneAndUpdate({
      _id: id,
      active: false,
    });
    result
      ? res
          .status(200)
          .json('The order with the id ' + id + ' has been "deleted"')
      : res.sendStatus(404);
  } catch (err) {
    res.status(400).json(err.message);
  }
}
