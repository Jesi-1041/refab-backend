const mongoose = require('mongoose');

// Cart Schema
const CartSchema = new mongoose.Schema({
  sessionId: { type: String, required: true },
  cartItems: [
    {
      name: String,
      price: Number,
      qty: Number
    }
  ]
});

const Cart = mongoose.model('Cart', CartSchema);

module.exports = Cart;
