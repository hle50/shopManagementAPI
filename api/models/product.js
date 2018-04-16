const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
  name: {
    type: String,
    required: [ true, 'Name is required' ],
  },
  price: {
    type: Number,
    required: [ true, 'Price is required' ],
  },
  quantity: {
    type: Number,
    required: [ true, 'Quantity is required' ],
  },
  imageUrl: {
    type: String,
  },
  status: {
    type: Boolean,
    default: true,
  },
  dateCreated: {
    type: String,
    default: new Date().toISOString(),
  },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
});

module.exports = mongoose.model('Product', productSchema);