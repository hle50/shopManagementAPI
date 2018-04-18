const Client = require('../models/client');

// insert product
exports.createClient = (req, res) => {
  console.log(req);
  const { fullName, phone, avatarUrl, note, address } = req.body;
  const client = new Client({
    fullName,
    phone,
    avatarUrl,
    note,
    address,
    owner: req.userData.userId,
  });
  client.save()
    .then(result => {
      res.status(200).json({
        message: 'Client created successful'
      })
    })
    .catch(error => {
      res.status(500).json({
        error
      });
    })
};

// get Client by Id

exports.getClientById = (req, res) => {
  const _id = req.params.id;
  Client.findById(_id)
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
};

// get all client

exports.getAll = (req, res) => {
  const owner = req.userData.userId;
  Client.find({ owner })
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
};

// update product

exports.updateClient = (req, res) => {
  const id = req.params.id;
  const { fullName, phone, avatarUrl, note, address } = req.body;
  Client.findByIdAndUpdate(id, { fullName, phone, avatarUrl, note, address }, { new: true })
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
exports.delete = (req, res) => {
  const id = req.params.id;
  Client.findByIdAndRemove(id)
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