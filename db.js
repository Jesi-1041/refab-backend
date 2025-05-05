const mongoose = require('mongoose');

// MongoDB URI
const uri = 'mongodb://localhost:27017/refab1'; // Use your MongoDB URI

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/refab1');

    console.log('Connected to MongoDB');
  } catch (err) {
    console.error('Failed to connect to MongoDB:', err);
    process.exit(1); // Exit the process if connection fails
  }
};

module.exports = connectDB;
