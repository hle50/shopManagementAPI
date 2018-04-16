const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../utils/utils');

module.exports = (req, res, next) => {
  console.log(req)
  try {
    const token = req.headers['authorization'].split(' ')[1];
    const decoded = jwt.verify(token, JWT_SECRET);
    console.log(decoded);
    req.userData = decoded;
    next();
  }
  catch (error) {
    return res.status(401).json({
      message: 'Auth failed',
    })
  }

};