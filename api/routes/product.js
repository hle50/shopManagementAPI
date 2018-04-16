const express = require("express");
const router = express.Router();
const ProductController = require('../controllers/product');
const checkAuth = require('../middlewares/check-Auth');

router.post('/create', checkAuth, ProductController.createProduct);

module.exports = router;