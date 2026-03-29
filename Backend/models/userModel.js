const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  full_name: { type: String, required: true, trim: true },
  email: { type: String, unique: true, required: true, trim: true },
  mobile_number: { type: String, unique: true, sparse: true, trim: true },
  password: { type: String, required: true },

  aadhar_number: { 
    type: String,
    unique: true,
    sparse: true,
    default: null
  },

  cartData: {
    type: Object,
    default: {}
  },

  address_line_1: { type: String, trim: true },

  address: {
    address_line_2: { type: String, trim: true },
    area: { type: String, trim: true },
    city: { type: String, trim: true },
    state: { type: String, trim: true },
    pincode: { type: Number },
    nation: { type: String, default: "Bharat", trim: true }
  },

  isActive: {
    type: String,
    enum: ["Active", "InActive", "Banned"],
    default: "Active"
  }

}, { timestamps: true, minimize: false });

const userModel = mongoose.models.User || mongoose.model("User", userSchema);

module.exports = userModel;