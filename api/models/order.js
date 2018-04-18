const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
  fullName: {
    type: String,
    required: [ true, 'Full name is required' ],
  },
  phone: {
    type: String,
    required: [ true, 'Phone is required' ],
  },
  isCompleted: {
    type: Boolean,
    default: false,
  },
  dateCreated: {
    type: String,
    default: new Date().toISOString(),
  },
  dateCompleted: {
    type: String,
    default: null
  },
  client: { type: mongoose.Schema.Types.ObjectId, ref: 'Client', required: true },
  note: {
    type: String,
  },
  shipTo: {
    type: String,
    required: [ true, 'Address to ship is required' ]
  },
  products: [
    {
      quantity: {
        type: Number,
        required: [ true, 'Quantity is required' ]
      },
      price: {
        type: Number,
        required: [ true, 'Price is required' ]
      },
      product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    }
  ],
  user : { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
});

module.exports = mongoose.model('Order', orderSchema);