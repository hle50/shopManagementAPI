const mongoose = require('mongoose');

const clientSchema = mongoose.Schema({
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
  address: {
    type: String,
  },
  rating: {
    type: Number,
    default: null
  }
});

module.exports = mongoose.model('Client', clientSchema);