import React from "react";
import { NavLink } from "react-router-dom";
import { assets } from "../assets/assets";

const Sidebar = () => {
  return (
    <div className="h-screen border-r bg-white 
                    w-16 sm:w-20 md:w-[18%] transition-all duration-300">

      <div className="flex flex-col gap-4 pt-6 px-2 md:px-4 text-[15px]">

        <NavLink
          to="/add"
          className="flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l hover:bg-gray-100"
        >
          <img src={assets.add_icon} alt="" className="w-5 h-5" />
          <p className="hidden md:block">Add Item</p>
        </NavLink>

        <NavLink
          to="/list"
          className="flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l hover:bg-gray-100"
        >
          <img src={assets.order_icon} alt="" className="w-5 h-5" />
          <p className="hidden md:block">List Item</p>
        </NavLink>

        <NavLink
          to="/orders"
          className="flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l hover:bg-gray-100"
        >
          <img src={assets.order_icon} alt="" className="w-5 h-5" />
          <p className="hidden md:block">Order</p>
        </NavLink>

      </div>
    </div>
  );
};

export default Sidebar;