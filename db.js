const mongoose = require("mongoose");
const dotenv = require("dotenv");
// Load environment variables
dotenv.config();
let cartDB; 

const connectCartDB = async () => {
 try {
    cartDB = await mongoose.createConnection(process.env.MONGO_URI, {
      dbName: 'refabDB',
    });
    console.log('✅ Connected to MongoDB (Cart/Refab DB)');
  } catch (err) {
    console.error('❌ MongoDB (Cart/Refab) connection error:', err);
  }
};

module.exports = {
  connectCartDB,
  getCartDB: () => cartDB
};