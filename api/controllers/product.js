const Product = require('../models/product');

// insert product
exports.createProduct = (req, res) => {
  console.log(req);
  const { name, price, quantity, imageUrl } = req.body;
  const product = new Product({
    name,
    price,
    quantity,
    imageUrl,
    user: req.userData.userId,
  });
  product.save()
    .then(result => {
      res.status(200).json({
        message: 'Product created successful'
      })
    })
    .catch(error => {
      res.status(500).json({
        error
      });
    })
};

// get Product by Id

exports.getProductById = (req, res) => {
  const _id = req.params.id;
  Product.findById(_id)
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

// get all product

exports.getAll = (req, res) => {
  const user = req.userData.userId;
  Product.find({ user })
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

// update product

exports.updateProduct = (req, res) => {
  const id = req.params.id;
  const { name, price, quantity, imageUrl } = req.body;
  Product.findByIdAndUpdate(id, { name, price, quantity, imageUrl }, { new: true })
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
  Product.findByIdAndRemove(id)
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