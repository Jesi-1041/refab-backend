const express = require('express');
const Cart = require('../models/Cart');
const router = express.Router();

// Get Cart by session ID
router.get('/cart/:sessionId', async (req, res) => {
  try {
    const cart = await Cart.findOne({ sessionId: req.params.sessionId });
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }
    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add item to the cart
router.post('/cart', async (req, res) => {
  try {
    const { sessionId, cartItems } = req.body;
    console.log("Received body:", req.body);

    let cart = await Cart.findOne({ sessionId });

    if (cart) {
      // If cart exists, update it
      cart.cartItems = cartItems;
    } else {
      // If no cart exists, create a new one
      cart = new Cart({
        sessionId,
        cartItems
      });
    }

    await cart.save();
    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Delete cart
router.delete('/cart/:sessionId', async (req, res) => {
  try {
    const cart = await Cart.findOneAndDelete({ sessionId: req.params.sessionId });
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }
    res.json({ message: 'Cart deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
