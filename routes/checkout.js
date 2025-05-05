const express = require('express');
const Order = require('../models/COrder');
const Cart = require('../models/Cart');
const router = express.Router();

// Checkout (place order)
router.post('/checkout', async (req, res) => {
    console.log("Received body:", req.body);
  try {
    const {
      order_id,
      name,
      email,
      address,
      city,
      state,
      pincode,
      delivery_date,
      payment_method,
      total,
      items,
      cartId,
      timestamp
    } = req.body;

    // Create a new order
    const newOrder = new Order({
      order_id,
      name,
      email,
      address,
      city,
      state,
      pincode,
      delivery_date,
      payment_method,
      total,
      items,
      timestamp,
      cartId  // Associate the cart ID with the order
    });

    // Save the order
    await newOrder.save();

    // Optional: Clear cart after checkout (if you want to delete it)
    await Cart.findByIdAndDelete(cartId);

    res.status(201).json(newOrder);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
