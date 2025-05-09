const express = require('express');
const router = express.Router();
const Order = require('../models/Order'); // Assuming you have an Order model

// Handle POST request for custom orders
router.post('/custom-order', async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      clothingType,
      fabricType,
      productType,
      aestheticStyle,
      features,
      vision,
      shippingAddress,
      deliveryDate,
      price
    } = req.body;

    // Create a new custom order
    const newOrder = new Order({
      name,
      email,
      phone,
      clothingType,
      fabricType,
      productType,
      aestheticStyle,
      features,
      vision,
      shippingAddress,
      deliveryDate,
      price,
    });

    // Save the order to the database
    await newOrder.save();

    // Respond with success
    res.status(200).json({ message: 'Order placed successfully!', order: newOrder });

  } catch (error) {
    console.error('Error processing custom order:', error);
    res.status(500).json({ error: 'Something went wrong. Please try again.' });
  }
});

module.exports = router;
