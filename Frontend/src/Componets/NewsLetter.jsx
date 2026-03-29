import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const NewsLetter = () => {
  const offerRef = useRef(null);
  const [email, setEmail] = useState("");
useEffect(() => {
  const el = offerRef.current;

  gsap.from(el, {
    x: -100,
    opacity: 0,
    duration: 1,
    ease: "power2.out",
    scrollTrigger: {
      trigger: el,
      start: "top 95%", 
toggleActions: "play none none reset",

    },
  });

  ScrollTrigger.refresh(); 
}, []);


  const onsubmitHandler = (ev) => {
    ev.preventDefault();
    alert("Subscribed: " + email);
    setEmail("");
  };

  return (
    <div className="w-full flex justify-center px-4 py-16 bg-gradient-to-r from-pink-50 to-gray-100">
      <div
        ref={offerRef}
        className="w-full max-w-3xl bg-white rounded-2xl shadow-lg p-8 sm:p-12 text-center"
      >
        <h2 className="text-3xl sm:text-4xl font-semibold text-gray-800">
          Subscribe & Get <span className="text-pink-300">10% Off</span>
        </h2>

        <p className="text-gray-500 mt-4 text-sm sm:text-base leading-relaxed">
          Stay updated with our latest collections, exclusive deals, and special
          offers. No spam, only good vibes ✨
        </p>

        <form
          onSubmit={onsubmitHandler}
          className="mt-8 flex flex-col sm:flex-row items-center gap-3"
        >
          <input
            type="email"
            placeholder="Enter your email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full flex-1 px-5 py-3 rounded-full border border-gray-300 outline-none focus:ring-2 focus:ring-pink-300 transition"
          />

          <button
            type="submit"
            className="w-full sm:w-auto px-8 py-3 rounded-full bg-black text-white font-medium hover:bg-pink-200 transition duration-300"
          >
            Subscribe
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewsLetter;