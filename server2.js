const express = require('express');
const cors = require('cors');  // Import CORS
const connectDB = require('./db');  // Import the DB connection function
const cartRoutes = require('./routes/cart');  // Import cart routes
const checkoutRoutes = require('./routes/checkout');  // Import checkout routes
const app = express();

app.use(cors());  // Enable CORS for all routes

app.use(express.json());  // For parsing application/json

// Connect to DB
connectDB();

// Use routes
app.use('/api', cartRoutes);
app.use('/api', checkoutRoutes);

// Server listening
const PORT = process.env.PORT || 5002;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
