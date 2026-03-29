import React from 'react';
import { assets } from '../assets/assets';

const Navbar = ({settoken}) => {
  return (
    <div className="flex items-center justify-between p-[1%]">

    <img src={assets.logo} alt="Admin Logo" className="w-[max(10%,80px)] ml-1 " />     
    <button className=" bg-gray-600 text-white px-5 py-2 sm:px-7  rounded-full text-xs sm:text-sm " onClick={()=>settoken('')}> Logout</button>

    </div>
  );
};

export default Navbar;