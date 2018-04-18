const bcrypt = require('bcrypt');
const Shipper = require('../models/shipper');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../utils/utils');

exports.createShipper = (req, res) => {
  const { email, fullName, avatarUrl, phone, note } = req.body;
  const owner = req.userData.userId;
// check if email existed
  Shipper.find({ email })
    .exec()
    .then(user => {
      console.log(user);
      if (user.length >= 1) {
        return res.status(409).json({
          message: 'Email existed',
        })
      }
      else {
        bcrypt.hash(phone, 10, (err, hash) => {
          console.log(hash);
          if (err) {
            return res.status(500).json({
              error: err,
            })
          }
          else {
            const user = new Shipper({
              email,
              password: hash,
              fullName,
              avatarUrl,
              phone,
              owner,
              note
            });
            user.save()
              .then(result => {
                res.status(201).json(({
                  message: 'Shipper created successful',
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

exports.getAll = (req, res) =>{
  const owner = req.userData.userId;
  Shipper.find({ owner })
    .exec()
    .then(result => {
      res.status(200).json({
        result
      })
    })
    .catch(error => {
      res.status(500).json({
        error
      })
    })
}

exports.getShipperById = (req, res) => {
  const _id = req.params.id;
  Shipper.findById(_id)
    .exec()
    .then(result => {
      res.status(200).json({
        result
      })
    })
    .catch(error => {
      res.status(400).json({
        error
      })
    })
}

// update shipper

exports.updateShipper = (req, res) => {
  const id = req.params.id;
  const { fullName, phone, avatarUrl, note} = req.body;
  Shipper.findByIdAndUpdate(id, { fullName, phone, avatarUrl, note }, { new: true })
    .exec()
    .then(result => {
      res.status(200).json({
        result,
        message: 'Update successful'
      })
    })
    .catch(error => {
      res.status(500).json({
        error,
      })
    })
}

// delete
exports.deleteShipper = (req, res) => {
  const id = req.params.id;
  Shipper.findByIdAndRemove(id)
    .exec()
    .then(result => {
      res.status(200).json({
        result,
        message: 'Delete successful'
      })
    })
    .catch(error => {
      res.status(500).json({
        error,
      })
    })
};
// exports.login = (req, res) => {
//   const { email, password } = req.body;
//   Shipper.find({ email })
//     .exec()
//     .then(user => {
//       if (user.length < 1) {
//         return res.status(401).json({
//           message: 'Auth failed',
//         })
//       }
//       bcrypt.compare(password, user[0].password, (err, result) => {
//         if (result) {
//           const token = jwt.sign(
//             {
//               email,
//               userId: user[0]._id,
//             },
//             JWT_SECRET,
//             {
//               expiresIn: "24h",
//             });
//           return res.status(200).json({
//             message: 'Auth successful',
//             token,
//           })
//         }
//         return res.status(401).json({
//           message: 'Auth failed',
//         })
//       })
//     })
// };
//
// exports.updateShipper = (req, res) => {
//   // get user id from token
//   const userId = req.userData.userId;
//   const { fullName, phone, avatarUrl } = req.body;
//   console.log(req.userData)
//   Shipper.update({ _id: userId }, { $set: {fullName, phone, avatarUrl} })
//     .exec()
//     .then(result => {
//       if (result) {
//         // do update user
//         return res.status(200).json({
//           message: 'Update user successful',
//         })
//       }
//     })
//     .catch(error => {
//       return res.status(500).json({
//         error,
//       })
//     })
// };
