const express = require("express");
const router = express.Router();
const ProductController = require('../controllers/product');
const checkAuth = require('../middlewares/check-Auth');

router.post('/create', checkAuth, ProductController.createProduct);
router.get('/:id', checkAuth, ProductController.getProductById);
router.get('', checkAuth, ProductController.getAll);
router.patch('/update/:id', checkAuth, ProductController.updateProduct);
router.delete('/delete/:id', checkAuth, ProductController.delete);

module.exports = router;