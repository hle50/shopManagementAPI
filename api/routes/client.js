const express = require("express");
const router = express.Router();
const ClientController = require('../controllers/client');
const checkAuth = require('../middlewares/check-Auth');

router.post('/create', checkAuth, ClientController.createClient);
router.get('/:id', checkAuth, ClientController.getClientById);
router.get('', checkAuth, ClientController.getAll);
router.patch('/update/:id', checkAuth, ClientController.updateClient);
router.delete('/delete/:id', checkAuth, ClientController.delete);

module.exports = router;