const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const { connectCartDB } = require('./db'); // Cart DB connector

// Wrap everything in an async function to use await
(async () => {
  const app = express();
  const PORT = process.env.PORT || 5000;

  // --- Connect to Admin DB (for Order model) ---
  try {
    await mongoose.connect(process.env.MONGO_URI_ADMIN, {
      dbName: 'adminDB',
    });
    console.log(`✅ Connected to AdminDB at ${process.env.MONGO_URI_ADMIN}`);
  } catch (err) {
    console.error('❌ MongoDB (Admin) connection error:', err);
    process.exit(1); // Exit if admin DB fails
  }

  // --- Connect to Cart DB ---
  await connectCartDB(); // Ensure this happens before requiring routes

  // Now that DBs are connected, require dependent modules
  const Order = require('./models/Order');
  
  // --- Multer Setup for File Uploads ---
  const storage = multer.diskStorage({
    destination: 'uploads/',
    filename: (req, file, cb) => {
      cb(null, Date.now() + '-' + file.originalname);
    }
  });

  const upload = multer({ storage });

  // --- Routes ---
  const customOrderRoute = require('./routes/custom-order')(upload); // <-- Pass the upload middleware here
  
  const cartRoutes = require('./routes/cart');
  const checkoutRoutes = require('./routes/checkout');

  // --- Middlewares ---
  const allowedOrigins = [
    'https://refabwearthechange.netlify.app' 
  ];

  app.use(cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true
  }));

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // --- Define Routes ---
  app.use('/api', customOrderRoute); // Custom order route
  app.use('/api', cartRoutes); // Cart routes
  app.use('/api', checkoutRoutes); // Checkout routes

  app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

  // --- Default Route ---
  app.get('/', (req, res) => {
    res.send('ReFab Merged Backend is Running!');
  });

  // --- Start Server ---
  app.listen(PORT, () => {
    console.log(`🚀 Merged server running at http://localhost:${PORT}`);
  });
})();
