import React, { useContext, useState ,useRef , useEffect} from "react";
import { gsap } from "gsap";
import { assets } from "../assets/assets";
import { NavLink, Link } from "react-router-dom";
import {Shopcontext } from "../Context/Shopcontext";
import Login from "../Pages/Login";


const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const { setshowSearch ,showSearch,Getcartcount  , navigate,Token , setToken ,setcartItem } = useContext(Shopcontext);
  
  
  
  const logout = ()=>{
    navigate('/login')
    localStorage.removeItem('token')
    setToken('');
    setcartItem({})
  }

  const navRef = useRef(null);

useEffect(() => {
  gsap.fromTo(
  navRef.current,
  { y: -80, opacity: 0 },
  { y: 0, opacity: 1, clearProps: "transform" }
);
  gsap.from(".nav-item", {
    x:-40,
    opacity: 0,
    stagger: 0.55,
    delay: 0.7,
  });
}, []);


  return (

 
    <div className="flex item-center justify-between py-2 font-medium  z-50"  ref={navRef}>
      <Link to={'/'}>
      <img src={assets.logo} alt="logo" className="w-36"  />
      </Link>

      <ul className="hidden sm:flex gap-5 text-sm text-grey-700 items-center">
        <NavLink to="/" className="flex flex-col items-center gap-1 ">
          <p  className="nav-item" >HOME</p>
          <hr className=" w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>

        <NavLink to="/collection" className="flex flex-col items-center gap-1 ">
          <p  >COLLECTION</p>
          <hr className=" w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>

        <NavLink to="/about" className="flex flex-col items-center gap-1">
          <p>ABOUT</p>
          <hr className=" w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>

        <NavLink to="/contact" className="flex flex-col items-center gap-1">
          <p>CONTACT</p>
          <hr className=" w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
      </ul>
      <div className="flex items-center gap-6">
      {!(location.pathname === "/collection" && showSearch) && (
  <img
    onClick={() => {
      setshowSearch(true);
      navigate("/collection");
    }}
    src={assets.search_icon}
    className="w-5 cursor-pointer"
  />
)}
<div className="group relative z-50">
  <img
    onClick={() => (Token ? null : navigate("/login"))}
    src={assets.profile_icon}
    alt=""
    className="cursor-pointer w-5"
  />

  {Token && (
    <div className="group-hover:block hidden absolute right-0 pt-4   z-10">
      <div className="flex flex-col gap-2 w-36 px-5 py-3 bg-white text-gray-600 rounded-md shadow-lg border z-10 relative">
        <p className="cursor-pointer hover:text-black">My Profile</p>
        <p onClick={() => navigate("/orders")} className="cursor-pointer hover:text-black">
          Orders
        </p>
        <p onClick={logout} className="cursor-pointer hover:text-red-500">
          Logout
        </p>
      </div>
    </div>
  )}
</div>

        <Link to="/cart" className="relative">
          <img src={assets.cart_icon} className="w-5 min-w-5" alt="" />
          <p className="absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[-6px]">
            {Getcartcount()}
          </p>
        </Link>
        <img
          onClick={() => setVisible(true)}
          src={assets.menu_icon}
          alt=""
          className="cursor-pointer w-5 sm:hidden "
        />
      </div>

      {/* sidebar menu for small screen  */}
      <div
        className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all duration-300 ease-in-out ${
          visible ? "w-full" : "w-0"
        }`}
      >
        <div className="flex flex-col text-gray-600">
          <div
            onClick={() => setVisible(false)}
            className="flex items-center gap-4 p-3 cursor-pointer"
          >
            <img src={assets.dropdown_icon} className="h-4 rotate-180" alt="" />
            <p>Back</p>
          </div>
<NavLink onClick={()=>setVisible(false)} className='py-2 pl-6 border' to='/'>HOME</NavLink>
<NavLink onClick={()=>setVisible(false)} to='/collection ' className='py-2 pl-6 border' >COLLLECTION</NavLink>
<NavLink  onClick={()=>setVisible(false)} to='/about' className='py-2 pl-6 border' >ABOUT</NavLink>
<NavLink onClick={()=>setVisible(false)} to='/contact' className='py-2 pl-6 border' >CONTACT</NavLink>

        </div>
      </div>
    </div>
  );
};

export default Navbar;   