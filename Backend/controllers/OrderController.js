const orderModel = require('../models/OrderModel')
const userModel = require('../models/userModel')
const jwt = require("jsonwebtoken")
const razorpay = require('razorpay');
const crypto = require("crypto");

const razorpayIntance = new razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret : process.env.RAZORPAY_SECRET_KEY
})

const currency ='inr'
const deliverCharge = 10
// placing order using COD method

const PlaceOrder = async (req,res)=>{

try{

 const userId = req.user.id;   
 const { items, amount, address, paymentMethod } = req.body;

 const orderData = {
    userId,
    items,
    amount,
    address,
    paymentMethod,
    date: Date.now()
 }

 const newOrder = new orderModel(orderData);

 await newOrder.save();

 // clear cart
 await userModel.findByIdAndUpdate(userId , {cartData:{}})

 res.json({
  success:true,
  message:'Order placed successfully'
 })

}catch(error){

 console.log(error)

 res.json({
  success:false,
  message:error.message
 })

}

}

// placing orders using razorpay method
const PlaceOrderRazorpay = async (req, res) => {

  try {

    const userId = req.user.id;

    const { items, amount, address } = req.body;

    const orderData = {
      userId,
      items,
      address,
      amount,
      paymentMethod: "Razorpay",
      payment: false,
      date: Date.now()
    };

    const newOrder = new orderModel(orderData);

    await newOrder.save();

    const options = {
      amount: amount * 100,
      currency: currency.toUpperCase(),
      receipt: newOrder._id.toString()
    };

    razorpayIntance.orders.create(options, (error, order) => {

      if (error) {
        console.log(error);

        return res.json({
          success: false,
          message: error.message
        });
      }

      res.json({
        success: true,
        order
      });

    });

  } catch (error) {

    console.log(error);

    res.json({
      success: false,
      message: error.message
    });

  }

};

const verifyRazorpay = async (req, res) => {

  try {

    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature
    } = req.body;

    const body =
      razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac(
        "sha256",
        process.env.RAZORPAY_SECRET_KEY
      )
      .update(body.toString())
      .digest("hex");

    if (expectedSignature === razorpay_signature) {

      const razorpayOrder =
        await razorpayIntance.orders.fetch(
          razorpay_order_id
        );

      await orderModel.findByIdAndUpdate(
        razorpayOrder.receipt,
        { payment: true }
      );

      res.json({
        success: true,
        message: "Payment Verified"
      });

    } else {

      res.json({
        success: false,
        message: "Invalid Signature"
      });

    }

  } catch (error) {

    console.log(error);

    res.json({
      success: false,
      message: error.message
    });

  }

};

// user orders data from Admin panel
const AllOrders = async (req, res) => {

  try {

    const orders = await orderModel.find({});

    res.json({
      success: true,
      orders
    });

  } catch (error) {

    res.json({
      success: false,
      message: error.message
    });

  }

}


// user orders data from frontend
const userOrders = async (req, res) => {

  try {

    const token = req.headers.authorization?.split(" ")[1]

    if (!token) {
      return res.json({
        success: false,
        message: "Token not provided"
      })
    }

    
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)

    const userId = decoded.id


    const orders = await orderModel.find({ userId })



    res.json({
      success: true,
      orders
    })

  } catch (error) {

    console.log(error.message);
    res.json({
      success: false,
      message: error.message
    })

  }

}

// update order status from admin panel
const updateStatus = async (req, res) => {

  try {

    const { orderId, status } = req.body;

    await orderModel.findByIdAndUpdate(orderId, { status });

    res.json({
      success: true,
      message: "Status Updated"
    });

  } catch (error) {

    res.json({
      success: false,
      message: error.message
    });

  }

}

module.exports = {
  PlaceOrder,
  PlaceOrderRazorpay,
  updateStatus,
  AllOrders,
  userOrders,
  verifyRazorpay
}