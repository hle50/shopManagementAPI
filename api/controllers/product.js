const Product = require('../models/product');

// insert product
exports.createProduct = (req, res) => {
  console.log(req);
  const {name, price, quantity, imageUrl} = req.body;
  const product = new Product({
    name,
    price,
    quantity,
    imageUrl,
    user: req.userData.userId,
  });
  product.save()
    .then(result =>{
      res.status(200).json({
        message: 'Product created successful'
      })
    })
    .catch(error =>{
      res.status(500).json({
        error
      });
    })
};

// get Product by Id

// get all product

// update product

// delete