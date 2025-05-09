const mongoose = require('mongoose');
const { getCartDB } = require('../db');

// Order Schema
const orderSchema = new mongoose.Schema({
  order_id: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  pincode: { type: String, required: true },
  delivery_date: { type: Date, required: true },
  payment_method: { type: String, required: true },
  total: { type: Number, required: true },
  items: { type: String, required: true }, // A string of the items in the cart
  timestamp: { type: Date, default: Date.now },
  cartId: { type: mongoose.Schema.Types.ObjectId, ref: 'Cart' } // Reference to Cart model
});

const CheckoutOrder = getCartDB().model('CheckoutOrder', orderSchema);
module.exports = CheckoutOrder;

