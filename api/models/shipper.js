const mongoose = require('mongoose');

const shipperSchema = mongoose.Schema({
  email: {
    type: String,
    required: [ true, 'Email is required' ],
    unique: true,
    match:
      [ /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
        'Email is not valid'
      ],
  },
  password: {
    type: String,
    required: [ true, 'Password is required' ],
  },
  fullName: {
    type: String,
    required: [ true, 'Full name is required' ],
  },
  phone: {
    type: String,
    required: [ true, 'Phone is required' ],
  },
  avatarUrl: {
    type: String,
  },
  active: {
    type: Boolean,
    default: true,
  },
  dateCreated: {
    type: String,
    default: new Date().toISOString(),
  },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  note: {
    type: String,
  },
});

module.exports = mongoose.model('Shipper', shipperSchema);