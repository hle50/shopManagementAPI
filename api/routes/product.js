const express = require("express");
const router = express.Router();
const ProductController = require('../controllers/product');
const checkAuth = require('../middlewares/check-Auth');

router.post('/create', checkAuth, ProductController.createProduct);
router.get('/:id', checkAuth, ProductController.getProductById);
router.get('', checkAuth, ProductController.getAll);

module.exports = router;