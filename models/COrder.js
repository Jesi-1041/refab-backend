const mongoose = require('mongoose');

// Order Schema
const orderSchema = new mongoose.Schema({
  order_id: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  pincode: { type: String, required: true },
  delivery_date: { type: String, required: true },
  payment_method: { type: String, required: true },
  total: { type: Number, required: true },
  items: { type: String, required: true }, // A string of the items in the cart
  timestamp: { type: String, required: true },
  cartId: { type: mongoose.Schema.Types.ObjectId, ref: 'Cart' } // Reference to Cart model
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
