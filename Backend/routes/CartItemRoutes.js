const express = require("express");
const {Updatecart, Getusercart , addTocart} = require('../controllers/Cartcontrollers');
const authuser = require("../Middleware/Auth");


const Cartrouter = express.Router();

Cartrouter.post('/get',authuser,Getusercart)
Cartrouter.post('/add',authuser,addTocart)
Cartrouter.post('/update',authuser, Updatecart)

module.exports = Cartrouter;

