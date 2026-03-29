const mongoose = require("mongoose");

const { configDotenv } = require("dotenv");

configDotenv();

const url = process.env.MONGO_URL;

const ConnectedDb = async () => {
  try {

    const db = await mongoose.connect(url);
    console.log("✅ MongoDB Connected");

  } catch (err) {
    
    return console.log("❌ DB Error:", err);
    
  }
};

module.exports = ConnectedDb;
