const mongoose = require('mongoose')
const userModel = require('../models/UserModel') 
const findUser = async ({ email }) => {
const user = await userModel.findOne({
    $or: [
      { email: email }
    ],
  })
    
return user
}

module.exports = { findUser }
