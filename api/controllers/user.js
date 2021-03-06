const bcrypt = require('bcrypt');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const _ = require('lodash')
const { JWT_SECRET } = require('../utils/utils');

exports.createUser = (req, res) => {
  const { email, fullName, avatarUrl, password } = req.body;
// check if email existed
  User.find({ email })
  .exec()
  .then(user => {
    console.log(user);
    if (user.length >= 1) {
      return res.status(409).json({
        message: 'Email existed',
      })
    }
    else {
      bcrypt.hash(password, 10, (err, hash) => {
        console.log(hash);
        if (err) {
          return res.status(500).json({
            error: err,
          })
        }
        else {
          const user = new User({
            email,
            password: hash,
            fullName,
            avatarUrl,
          });
          user.save()
          .then(result => {
            res.status(201).json(({
              message: 'User created successful',
            }))
          })
          .catch(err => {
            res.status(500).json({
              error: err,
            })
          })
        }
      })
    }
  });
};

exports.login = (req, res) => {
  const { email, password } = req.body;
  User.find({ email })
  .exec()
  .then(user => {
    if (user.length < 1) {
      return res.status(400).json({
        message: 'Auth failed',
      })
    }
    bcrypt.compare(password, user[ 0 ].password, (err, result) => {
      if (result) {
        const token = jwt.sign(
          {
            email,
            userId: user[ 0 ]._id,
          },
          JWT_SECRET,
          {
            expiresIn: "24h",
          });
        return res.status(200).json({
          message: 'Auth successful',
          token,
          profile: _.pick(user[ 0 ], [ 'email', 'fullName' ])
        })
      }
      return res.status(400).json({
        message: 'Auth failed',
      })
    })
  })
};

exports.updateUser = (req, res) => {
  // get user id from token
  const userId = req.userData.userId;
  const { fullName, phone, avatarUrl } = req.body;
  console.log(req.userData)
  User.update({ _id: userId }, { $set: { fullName, phone, avatarUrl } })
  .exec()
  .then(result => {
    if (result) {
      // do update user
      return res.status(200).json({
        message: 'Update user successful',
      })
    }
  })
  .catch(error => {
    return res.status(500).json({
      error,
    })
  })
};

exports.getAllUser = (req, res) => {
  User.find({})
  .exec()
  .then(result => {
    return res.status(200).json({
      message: 'Update user successful',
      data: result,
    })
  })
  .catch(error => {
    return res.status(500).json({
      error,
    })
  })
  
};

exports.getProfile = (req, res) => {
  const userId = req.userData.userId;
  
  User.findById({ _id: userId })
  .exec()
  .then(result => {
    if (result) {
      // do update user
      return res.status(200).json({
        message: 'Get user profile successful',
        profile: _.pick(result, [ 'email', 'fullName' ])
      })
    }
  })
  .catch(error => {
    return res.status(500).json({
      error,
    })
  })
}