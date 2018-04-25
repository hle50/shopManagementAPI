const express = require("express");
const router = express.Router();
const UserController = require('../controllers/user');
const checkAuth = require('../middlewares/check-Auth');

router.post('/signup', UserController.createUser);
router.post('/login', UserController.login);
router.patch('/update', checkAuth, UserController.updateUser);
router.get('/getProfile', checkAuth, UserController.getProfile);
router.get('/getAll', UserController.getAllUser);


module.exports = router;