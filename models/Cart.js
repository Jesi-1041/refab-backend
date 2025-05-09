const mongoose = require('mongoose');
const { getCartDB } = require('../db'); // import the custom connection

// Cart Item Subschema
const CartItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  price: {
    type: Number,
    required: true,
    min: [0, 'Price must be a positive number']
  },
  qty: {
    type: Number,
    required: [true, 'Quantity is required'],
    min: [1, 'Quantity must be at least 1'],
    default: 1 // Default value if not provided
  }
}, { _id: false });

// Cart Schema
const CartSchema = new mongoose.Schema({
  sessionId: {
    type: String,
    required: true,
    index: true // Faster lookup
  },
  cartItems: {
    type: [CartItemSchema],
    validate: {
      validator: arrayLimit,
      message: '{PATH} exceeds the limit of 100 items'
    }
  }
}, {
  timestamps: true
});

// Optional validation to limit items in the cart
function arrayLimit(val) {
  return val.length <= 100; // Example limit
}

let cartDB = getCartDB();
if (!cartDB) {
  throw new Error('Cart DB connection is not established. Ensure connectCartDB is called before using this model.');
}

// Ensure Cart uses the cartDB connection
const Cart = cartDB.model('Cart', CartSchema);
module.exports = Cart;
