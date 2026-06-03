const express = require("express");

const {
  PlaceOrder,
  PlaceOrderRazorpay,
  updateStatus,
  verifyRazorpay,
  AllOrders,
  userOrders
} = require("../controllers/OrderController");

const adminAuth = require("../Middleware/AdminAuth");
const authUser = require("../Middleware/authuser");

const orderRouter = express.Router();



// Get all orders
orderRouter.post("/list", adminAuth, AllOrders);

// Update order status
orderRouter.post("/status", adminAuth, updateStatus);

// Place order (COD)
orderRouter.post("/place", authUser, PlaceOrder);

// Place order with Razorpay
orderRouter.post("/razorpay", authUser, PlaceOrderRazorpay);

orderRouter.post("/verifyRazorpay",authUser,verifyRazorpay)

// Get orders of logged-in user
orderRouter.post("/userorders", authUser, userOrders);



module.exports = orderRouter;