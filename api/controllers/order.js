const Order = require('../models/order');

// insert Order
exports.createOrder = (req, res) => {
  console.log(req.body);
  const { fullName, phone, client, shipTo, products } = req.body;
  const order = new Order({
    fullName,
    phone,
    shipTo,
    client,
    products,
    user: req.userData.userId,
  });
  order.save()
    .then(result => {
      res.status(200).json({
        message: 'Order created successful',
        result
      })
    })
    .catch(error => {
      res.status(500).json({
        error
      });
    })
};

// get Order by Id

exports.getOrderById = (req, res) => {
  const _id = req.params.id;
  Order.findById(_id)
    .populate("products.product", "name imageUrl")
    .exec()
    .then(result => {
      res.status(200).json({
        result
      })
    })
    .catch(error => {
      res.status(400).json({
        error
      })
    })
}

// get all Order

exports.getAll = (req, res) => {
  const user = req.userData.userId;
  Order.find({ user })
    .populate("products.product", "name imageUrl")
    .exec()
    .then(result => {
      res.status(200).json({
        result
      })
    })
    .catch(error => {
      res.status(500).json({
        error
      })
    })
};

// update Order

exports.updateOrder = (req, res) => {
  const id = req.params.id;
  const { name, price, quantity, imageUrl } = req.body;
  Order.findByIdAndUpdate(id, { name, price, quantity, imageUrl }, { new: true })
    .exec()
    .then(result => {
      res.status(200).json({
        result,
        message: 'Update successful'
      })
    })
    .catch(error => {
      res.status(500).json({
        error,
      })
    })
}

// delete
exports.delete = (req, res) => {
  const id = req.params.id;
  Order.findByIdAndRemove(id)
    .exec()
    .then(result => {
      res.status(200).json({
        result,
        message: 'Delete successful'
      })
    })
    .catch(error => {
      res.status(500).json({
        error,
      })
    })
};