const express = require("express");
const router = express.Router();
const ShipperController = require('../controllers/shipper');
const checkAuth = require('../middlewares/check-Auth');

router.post('/create', checkAuth, ShipperController.createShipper);
router.get('', checkAuth, ShipperController.getAll);
router.patch('/update/:id', checkAuth, ShipperController.updateShipper);
router.delete('/delete/:id', checkAuth, ShipperController.deleteShipper);
router.get('/:id', checkAuth, ShipperController.getShipperById)

module.exports = router;