const orderModel = require('../models/OrderModel')
const userModel = require('../models/usermodel')  
const jwt = require("jsonwebtoken")


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


// placing orders using stripe method
const PlaceOrderStripe = async (req, res) => {

}


// placing orders using razorpay method
const PlaceOrderRazorpay = async (req, res) => {

}


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
  PlaceOrderStripe,
  updateStatus,
  AllOrders,
  userOrders
}