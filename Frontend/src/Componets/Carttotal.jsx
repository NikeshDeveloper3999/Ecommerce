import React,{useContext} from 'react'
import { Shopcontext } from '../Context/Shopcontext' 
import Title from './Title'



const Carttotal = () => {

const {currency ,delivery_fee , carttotalAmount} =  useContext(Shopcontext);
    return (
    <div className='w-full'>
      
      <div className="text-2xl">

        <title text1={'CART'} text2={'TOTALS'} /> 
      </div>

      <div className="flex flex-col gap-2 mt-2 text-sm ">

<div className="flex justify-between"> 
    <p>Subtotal</p>
    <p>{currency} {carttotalAmount()}.00 </p>

</div>
<hr />
<div className="flex justify-between">
    <p>Shipping fee</p>
    <p>{currency}{carttotalAmount() === 0 ? 0 :delivery_fee}.00  </p>
</div>
<hr />
      <div className="flex justify-between">

<b>Total</b>
<b>{currency}{carttotalAmount() === 0 ? 0 :carttotalAmount()+delivery_fee}</b>

      </div>
      
      
      </div>

    </div>
  )
}

export default Carttotal

