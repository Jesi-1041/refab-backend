const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const mongoose = require('mongoose');  // Import mongoose
const Order = require('./models/Order');  // Import the Order model (we will create this in the next step)

const app = express();
const PORT = 5000;

// Enable CORS
app.use(cors());

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files (for uploaded files)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Setup multer for file uploads
const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage });

// MongoDB connection setup
mongoose.connect('mongodb://localhost:27017/refab')
  .then(() => {
    console.log('✅ Connected to MongoDB');
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err);
  });

  
   

// Routes
app.get('/', (req, res) => {
  res.send('ReFab Backend is Running!');
});

// Handle custom order POST
app.post('/api/custom-order', upload.single('clothUpload'), (req, res) => {
    console.log('Request body:', req.body);  // Log the body to see the data
    console.log('Uploaded file:', req.file);  // Log the file to ensure it's received
  
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
  
    console.log('Order data before save:', order);  // Log the order object before saving
  
    order.save()
      .then(savedOrder => {
        console.log('✅ Order saved to MongoDB:', savedOrder);
        res.status(200).json({ message: 'Order received and saved!', order: savedOrder });
      })
      .catch(err => {
        console.error('❌ Error saving order:', err);
        res.status(500).json({ message: 'Failed to save order to database', error: err });
      });
  });
  

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
