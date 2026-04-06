import React, { useEffect, useRef } from "react";
import { assets } from "../assets/assets";
import { NavLink } from "react-router";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const footerRef = useRef(null);

  useEffect(() => {
    const el = footerRef.current;

    gsap.from(el, {
      y: 100,          // start from bottom
      opacity: 0,     // hidden
      delay:0.2,
      duration:0.5,
      ease: "power2.out",

      scrollTrigger: {
        trigger:el,
        start: "top 90%", 
        toggleActions: "play none none reset",
      },
      
    });

    ScrollTrigger.refresh(); // for smooth scroll (Lenis)
  }, []);

  return (
    <div  className="px-6 md:px-16  lg:px-24 pt-20 " >

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-12 text-sm text-gray-700">
        
        <div>
          <img src={assets.logo} alt="logo" className="mb-5 w-32" />
          <p className="leading-relaxed text-gray-500">
            Discover the latest trends with us. We provide high-quality products
            with the best customer experience. Shop with confidence and style.
          </p>
        </div>

        <div>
          <p className="text-lg font-semibold mb-5 tracking-wide mt-5">COMPANY</p>
          <ul className="flex flex-col gap-2 text-gray-500">
            <li><NavLink to="/" className="hover:text-black hover:underline transition">Home</NavLink></li>
            <li><NavLink to="/about" className="hover:text-black hover:underline transition">About Us</NavLink></li>
            <li><NavLink to="/collection" className="hover:text-black hover:underline transition">Collection</NavLink></li>
            <li><NavLink to="/contact" className="hover:text-black hover:underline transition">Contact</NavLink></li>
          </ul>
        </div>

        <div>
          <p className="text-lg font-semibold mb-5 tracking-wide mt-5">GET IN TOUCH</p>
          <ul className="flex flex-col gap-2 text-gray-500">
            <li className="hover:text-black transition cursor-pointer">
              +91 8827934630
            </li>
            <li className="hover:text-black transition cursor-pointer">
              contact-nikeshparte@gmail.com
            </li>
          </ul>
        </div>
      </div>

      <div className="mt-12 mb-10 border-t w-full ">
        <p className="text-center text-gray-400 mt-1 text-sm tracking-wide">
          © 2026 Trift.com — All Rights Reserved
        </p>
      </div>

    </div>
  );
};

export default Footer;