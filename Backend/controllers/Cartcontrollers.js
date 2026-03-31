// add products to user cart 
const userModel = require('../models/usermodel') 

const addTocart = async (req, res) => {
  try {
    const { itemId, size } = req.body;
    const userId = req.user.id; 

    const userData = await userModel.findById(userId);
    if (!userData) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    let cartData = userData.cartData || {};
    if (!cartData[itemId]) cartData[itemId] = {};

    cartData[itemId][size] = (cartData[itemId][size] || 0) + 1;

    userData.cartData = cartData;

    // Tell mongoose nested object changed
    userData.markModified("cartData");

    const savedUser = await userData.save();

    res.json({
      success: true,
      message: "Added to cart",
      cartData: savedUser.cartData
    });

  } catch (error) {
    console.error(error);   // keep console only in catch
    res.status(500).json({ success: false, message: error.message });
  }
};


// update user cart
const Updatecart = async (req, res) => {

  try {

    const { itemId, size, quantity } = req.body;
    const userId = req.user.id;

    const userData = await userModel.findById(userId);

    if (!userData) {
      return res.json({ success: false, message: "User not found" });
    }

    let cartData = userData.cartData || {};

    if (!cartData[itemId]) cartData[itemId] = {};

    if (quantity <= 0) {

      delete cartData[itemId][size];

      if (Object.keys(cartData[itemId]).length === 0) {
        delete cartData[itemId];
      }

    } else {

      cartData[itemId][size] = quantity;

    }

    userData.cartData = cartData;
    userData.markModified("cartData");

    await userData.save();

    res.json({
      success: true,
      message: "Cart updated",
      cartData
    });

  } catch (err) {

    console.error(err);   // keep console only in catch

    res.json({
      success: false,
      message: err.message
    });

  }

};


// get user cart data
const Getusercart = async (req, res) => {

  try {

    const userId = req.user.id;

    const userData = await userModel.findById(userId);

    if (!userData) {
      return res.json({ success: false, message: "User not found" });
    }

    const cartData = userData.cartData || {};

    res.json({
      success: true,
      cartData
    });

  } catch (err) {

    console.error(err);  // keep console only in catch

    res.json({
      success: false,
      message: err.message
    });

  }

};

module.exports = { Updatecart, Getusercart, addTocart };