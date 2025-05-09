const express = require('express');
const Cart = require('../models/Cart');
const router = express.Router();

/**
 * @route   GET /api/cart/:sessionId
 * @desc    Get cart by session ID
 */
router.get('/cart/:sessionId', async (req, res) => {
  try {
    const cart = await Cart.findOne({ sessionId: req.params.sessionId });
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }
    res.status(200).json(cart);
  } catch (err) {
    console.error('GET /cart/:sessionId error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

/**
 * @route   POST /api/cart
 * @desc    Create or update cart by session ID
 */
router.post('/cart', async (req, res) => {
  try {
    const { sessionId, cartItems } = req.body;

    if (!sessionId || !Array.isArray(cartItems)) {
      return res.status(400).json({ message: 'Invalid cart payload' });
    }

    console.log(`Saving cart for sessionId: ${sessionId}`); // Add logging to help with debugging

    let cart = await Cart.findOne({ sessionId });

    if (cart) {
      cart.cartItems = cartItems; // Update cart items
    } else {
      cart = new Cart({ sessionId, cartItems }); // Create a new cart
    }

    await cart.save();

    console.log(`Cart saved successfully for sessionId: ${sessionId}`); // Log success

    res.status(200).json({
      message: 'Cart saved successfully',
      sessionId: cart.sessionId,
      cartItems: cart.cartItems,
      // You may add an orderId generation mechanism here if needed
    });

  } catch (err) {
    console.error('POST /cart error:', err); // Add better error logging
    res.status(500).json({ message: 'Server error' });
  }
});

/**
 * @route   DELETE /api/cart/:sessionId
 * @desc    Delete cart by session ID
 */
router.delete('/cart/:sessionId', async (req, res) => {
  try {
    const cart = await Cart.findOneAndDelete({ sessionId: req.params.sessionId });
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }
    res.status(200).json({ message: 'Cart deleted successfully' });
  } catch (err) {
    console.error('DELETE /cart/:sessionId error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
