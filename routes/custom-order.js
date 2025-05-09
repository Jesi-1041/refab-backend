const express = require('express');
const Order = require('../models/Order');

function customOrderRoute(upload) {
  const router = express.Router();

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
        deliveryDate
      } = req.body;

      const uploadedCloth = req.file ? req.file.filename : null;

      let parsedFeatures = [];
      try {
        parsedFeatures = features ? JSON.parse(features) : [];
      } catch (err) {
        console.error('❌ Error parsing features:', err);
      }

      const order = new Order({
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

      const savedOrder = await order.save();
      console.log('✅ Order saved:', savedOrder);
      res.status(200).json({ message: 'Order received and saved!', order: savedOrder });
    } catch (err) {
      console.error('❌ Error processing custom order:', err);
      res.status(500).json({ message: 'Failed to process custom order', error: err.message });
    }
  });

  return router;
}

module.exports = customOrderRoute;
