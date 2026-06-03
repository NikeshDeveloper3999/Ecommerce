import React, { useContext, useState } from 'react'
import Title from '../Componets/Title'
import Carttotal from '../Componets/Carttotal'
import { assets } from '../assets/assets'
import { Shopcontext } from '../Context/Shopcontext'
import { Form } from 'react-router-dom'
import { toast } from 'react-toastify'
import axios from "axios";
import Orders from './Orders'

const Placeorder = () => {
  

  const [method, setmethod] = useState('cod')
  const [formData , setformData] = useState({
  firstName:'',
  lastName:'',
  street:'',
  email:'',
  city:'',
  state:'',
  zipcode:'',
  country:'',
  phone:''
})


const {navigate ,placeOrder , backendURL, cartItem,setcartItem,Token ,carttotalAmount, products,currency,delivery_fee} = useContext(Shopcontext);
const onchangeHandler = (event)=>{
  const name = event.target.name;
  const value = event.target.value;
  setformData(data => ({   ...data,[name]: value}))

}

const initPay = (order) => {

const options = {
key: import.meta.env.VITE_RAZORPAY_KEY_ID,

amount: order.amount,

currency: order.currency,

name: "Order Payment",

description: "Order Payment",

order_id: order.id,

receipt: order.receipt,

modal: {
  ondismiss: function () {
    toast.error("Payment Cancelled");
  }
},

handler: async (response) => {

  try {

    const verifyResponse = await axios.post(
      backendURL + "/api/order/verifyRazorpay",
      response,
      {
        headers: {
          Authorization: `Bearer ${Token}`
        }
      }
    );

    if (verifyResponse.data.success) {

      toast.success("Payment Successful");

      setcartItem({});

      navigate("/orders");

    } else {

      toast.error("Payment Verification Failed");

    }

  } catch (error) {

    console.log(error);

    toast.error(error.message);

  }

}

};

const rzp = new window.Razorpay(options);

rzp.on("payment.failed", function (response) {

console.log(response);

toast.error("Payment Failed");

});

rzp.open();

}

const onSubmitHandler = async (event) => {

  event.preventDefault();

  try {

    let orderItems = [];

    for (const productId in cartItem) {

      const productData = products.find(
        (product) => product.product_code === productId
      );

      if (!productData) continue;

      for (const size in cartItem[productId]) {

        const quantity = cartItem[productId][size];

        if (quantity > 0) {

          orderItems.push({
            ...productData,
            size: size,
            quantity: quantity
          });

        }

      }

    }

    if (orderItems.length === 0) {
      toast.error("Cart is empty");
      return;
    }


    let orderData = {
      address: formData,
      items: orderItems,
      amount: carttotalAmount() + delivery_fee,
      paymentMethod: method
    };

    const tokenToUse = Token || localStorage.getItem("token");

switch(method){

// api call for cod 
 case 'cod': 
const response = await axios.post(backendURL + "/api/order/place",orderData,
{ headers: { Authorization: `Bearer ${tokenToUse}` } });

    if (response.data.success){
      setcartItem({});
      navigate("/orders");
    } else {
      toast.error(response.data.message);
    }
break ;

case 'razorpay':
const responserazorPay = await axios.post(backendURL + "/api/order/razorpay",orderData,
{ headers: { Authorization: `Bearer ${tokenToUse}` } });

    if (responserazorPay.data.success){
      initPay(responserazorPay.data.order)
    } else {
      toast.error(responserazorPay.data.message);  
    }
    break ; 
  }
  } catch (error) {
    toast.error(error.message);

  }

};



return (
    
<form onSubmit={onSubmitHandler} className="flex flex-col sm:flex-row justify-between gap-10 max-w-6xl mx-auto pt-10 px-4">

      {/* ================= LEFT SIDE ================= */}
      <div className="flex flex-col gap-4 w-full sm:max-w-[480px] ">

        <div className="text-xl sm:text-2xl my-3">
          <Title text1={'DELIVERY'} text2={'INFORMATION'} />
        </div>

<div className="flex gap-3">
  <input
    required
    onChange={onchangeHandler}
    value={formData.firstName}
    name="firstName"
    type="text"
    placeholder="First Name"
    className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
  />

  <input
    required
    onChange={onchangeHandler}
    value={formData.lastName}
    name="lastName"
    type="text"
    placeholder="Last Name"
    className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
  />
</div>

<input
  required
  type="email"
  onChange={onchangeHandler}
  value={formData.email}
  name="email"
  placeholder="Email Address"
  className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
/>

<input
  required
  type="text"
  onChange={onchangeHandler}
  value={formData.street}
  name="street"
  placeholder="Street"
  className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
/>

<div className="flex gap-3">
  <input
    required
    type="text"
    onChange={onchangeHandler}
    value={formData.city}
    name="city"
    placeholder="City"
    className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
  />

  <input
    required
    type="text"
    onChange={onchangeHandler}
    value={formData.state}
    name="state"
    placeholder="State"
    className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
  />
</div>

<div className="flex gap-3">
  <input
    required
    type="text"
    onChange={onchangeHandler}
    value={formData.zipcode}
    name="zipcode"
    placeholder="Pincode"
    className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
  />

  <input
    required
    type="text"
    onChange={onchangeHandler}
    value={formData.country}
    name="country"
    placeholder="Country"
    className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
  />
</div>

<input
  required
  type="number"
  onChange={onchangeHandler}
  value={formData.phone}
  name="phone"
  placeholder="Phone"
  className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
/>

</div>
      {/* ================= RIGHT SIDE ================= */}
<div className="mt-12 sm:mt-0 w-full sm:w-[40%]">

  <div className="min-w-[280px]">
    <Carttotal/>
  </div>

  {/* PAYMENT SECTION */}
  <div className="mt-12">

    <Title text1={'PAYMENT'} text2={'METHOD'} />

    <div className="flex flex-col lg:flex-row gap-4 mt-4">

      
      {/* RAZORPAY */}
      <div
        onClick={() => setmethod('razorpay')}
        className="flex items-center justify-center gap-3 border px-4 py-3 cursor-pointer rounded-md w-full lg:w-[170px] hover:shadow-sm"
      >
        <p className={`w-4 h-4 border rounded-full flex-shrink-0 ${method === 'razorpay' ? 'bg-green-400' : ''}`}></p>

        <img
          src={assets.razorpay_logo}
          alt="Razorpay"
          className="h-5 object-contain"
        />
      </div>

      {/* COD */}
      <div
        onClick={() => setmethod('cod')}
        className="flex items-center justify-center gap-3 border px-4 py-3 cursor-pointer rounded-md w-full lg:w-[170px] hover:shadow-sm"
      >
        <p className={`w-4 h-4 border rounded-full flex-shrink-0 ${method === 'cod' ? 'bg-green-400' : ''}`}></p>

        <p className="text-gray-600 text-sm font-medium">
          CASH ON DELIVERY
        </p>
      </div>

    </div>

    {/* PLACE ORDER BUTTON */}
<div className="w-full mt-10">
  <button
    type="submit"
    className="w-full bg-black text-white py-2  rounded-lg font-medium tracking-wide hover:bg-gray-800 transition">
    PLACE ORDER
  </button>
</div>
  </div>

</div>
    </form>
  )
}

export default Placeorder



