const express = require("express");

const {
  PlaceOrder,
  PlaceOrderRazorpay,
  PlaceOrderStripe,
  updateStatus,
  AllOrders,
  userOrders
} = require("../controllers/OrderController");

const adminAuth = require("../Middleware/AdminAuth");
const authUser = require("../Middleware/Auth");

const orderRouter = express.Router();


// ================= ADMIN FEATURES =================

// Get all orders
orderRouter.post("/list", adminAuth, AllOrders);

// Update order status
orderRouter.post("/status", adminAuth, updateStatus);



// ================= USER FEATURES =================

// Place order (COD)
orderRouter.post("/place", authUser, PlaceOrder);

// Place order with Razorpay
orderRouter.post("/razorpay", authUser, PlaceOrderRazorpay);

// Place order with Stripe
orderRouter.post("/stripe", authUser, PlaceOrderStripe);

// Get orders of logged-in user
orderRouter.post("/userorders", authUser, userOrders);



module.exports = orderRouter;