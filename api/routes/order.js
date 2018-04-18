const express = require("express");
const router = express.Router();
const OrderController = require('../controllers/order');
const checkAuth = require('../middlewares/check-Auth');

router.post('/create', checkAuth, OrderController.createOrder);
router.get('/:id', checkAuth, OrderController.getOrderById);
router.get('', checkAuth, OrderController.getAll);
router.patch('/update/:id', checkAuth, OrderController.updateOrder);
router.delete('/delete/:id', checkAuth, OrderController.delete);

module.exports = router;