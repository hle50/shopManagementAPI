const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
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
  role:{
    type: Number,
    default: 1 // 1 user 2 admin
  }
});

module.exports = mongoose.model('User', userSchema);