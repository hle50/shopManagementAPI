const express = require("express");
const router = express.Router();
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../uploads'))
  },
  filename: function (req, file, cb) {
    cb(null, +Date.now() + '-' + file.originalname)
  }
});

const upload = multer({ storage: storage });

// Handle incoming GET requests to /orders
router.post('/', upload.single('file'), function (req, res) {
  console.log('testtt', req.file.path);
  // get file name
  const tmp = req.file.path.split("\\");
  res.status(200).json({ path: tmp[ tmp.length - 1 ] })

});

module.exports = router;
