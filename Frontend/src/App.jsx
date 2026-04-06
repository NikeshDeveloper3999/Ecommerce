import React, { useContext, useEffect } from 'react';
import Lenis from 'lenis';
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// pages / components imports
import Home from "./Pages/Home";
import Collection from "./Pages/Collection";
import About from "./Pages/About";
import Contact from "./Pages/Contact";
import Product from "./Pages/Product";
import Cart from "./Pages/Cart";
import Login from "./Pages/Login";
import Placeorder from "./Pages/Placeorder";
import Orders from "./Pages/Orders";
import Navbar from "./Componets/Navbar";
import Fotter from "./Componets/Fotter";
import SearchBar from "./Componets/SearchBar";
import ScrollToTop from "./Componets/ScrollToTop";
import { Shopcontext } from './Context/Shopcontext';
import ForgotPassword from './Pages/ForgotPassword';



const App = () => {
  const {Token} =useContext(Shopcontext);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      smooth: true,
    });

    let rafId;

    function raf(time) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return (
    <>
     {!Token ? (
      <Login/>
    ) : (
    <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
      <ToastContainer />
      <ScrollToTop />   
      <Navbar />
      <SearchBar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/collection" element={<Collection />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/product/:productId" element={<Product />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/place-order" element={<Placeorder />} />
        <Route path="/orders" element={<Orders/>} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
      </Routes>

      <Fotter />
    </div>
)}
</>
  )
};

export default App;



