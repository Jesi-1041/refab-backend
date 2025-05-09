const express = require('express');

const Order = require('../models/Order'); // Assuming you have an Order model

module.exports = function(upload) {
  const router = express.Router();
// Handle POST request for custom orders
router.post('/custom-order', upload.single('clothUpload'), async (req, res) => {
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

      const uploadedCloth = req.file ? req.file.filename : null;

      let parsedFeatures = [];
      try {
        parsedFeatures = features ? JSON.parse(features) : [];
      } catch (err) {
        console.error('❌ Error parsing features:', err);
      }

    // Create a new custom order
    const newOrder = new Order({
        name,
        email,
        phone,
        clothingType,
        fabricType,
        productType,
        aestheticStyle,
        features: parsedFeatures,
        vision,
        shippingAddress,
        deliveryDate,
        uploadedCloth
    });

    // Save the order to the database
      const savedOrder = await newOrder.save();
      console.log('✅ Order saved:', savedOrder);
      res.status(200).json({ message: 'Order received and saved!', order: savedOrder });
    } catch (err) {
      console.error('❌ Error processing custom order:', err);
      res.status(500).json({ message: 'Failed to process custom order', error: err.message });
    }
  });

  return router;
};
