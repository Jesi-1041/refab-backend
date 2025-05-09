const mongoose = require('mongoose');

// Define the schema for the order
const orderSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { 
    type: String, 
    required: true,
    match: [/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Please provide a valid email address.'] 
  },
  phone: { 
    type: String, 
    required: false,
    match: [/^\+?[1-9]\d{1,14}$/, 'Please provide a valid phone number.'] 
  },
  clothingType: { 
    type: String, 
    required: true 
  },
  fabricType: { type: String, required: true },
  productType: { 
    type: String, 
    required: true 
  },
  aestheticStyle: { 
    type: String, 
    required: true 
  },
  features: { 
    type: [String], 
    default: [], 
    validate: [arrayLimit, 'Features array cannot exceed 5 items.'] 
  },
  vision: { type: String, required: false },
  shippingAddress: { type: String, required: true },
  deliveryDate: { 
    type: Date, 
    required: false, 
    validate: {
      validator: function(value) {
        return value ? !isNaN(Date.parse(value)) : true;
      },
      message: 'Invalid delivery date.'
    }
  },
  uploadedCloth: { type: String, required: false },
  createdAt: { type: Date, default: Date.now }
});

// Function to limit the number of features
function arrayLimit(val) {
  return val.length <= 5;
}

// Create and export the model
const Order = mongoose.model('Order', orderSchema);
if (mongoose.connection.name !== 'adminDB') {
  mongoose.createConnection(process.env.MONGO_URI_ADMIN);
}
module.exports = Order;
