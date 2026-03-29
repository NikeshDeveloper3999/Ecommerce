import React, { useEffect, useState } from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();

  const slides = [
    { img: assets.image1, caption: "Men" },
    { img: assets.image2, caption: "Women" },
    { img: assets.image3, caption: "Kids" },
  ];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (index === slides.length - 1) {
        setIndex(0);
      } else {
        setIndex(index + 1);
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [index]);

  return (
 <div
  className="w-full rounded-2xl cursor-pointer relative z-0"
  onClick={() => navigate("/collection")}
>
  <div className="relative h-[80vh] overflow-hidden rounded-2xl z-5">
    
    <img
      src={slides[index].img}
      alt=""
      className="w-full h-full object-cover opacity-95"
      
    />

    {/* Caption */}
    <div className="absolute bottom-0 w-full px-4 py-6">
      <h2 className="text-xl text-white  sm:text-3xl font-bold  "   >
        {slides[index].caption}
      </h2>
    </div>

    {/* Dots */}
    <div className="absolute bottom-5 w-full flex justify-center gap-2">
      {slides.map((_, i) => (
        <span
          key={i}
          className={`h-2 w-2 sm:h-3 sm:w-3 rounded-full ${
            i === index ? "bg-white" : "bg-pink-200"
          }`}
        ></span>
      ))}
    </div>

  </div>
</div>
  )
};

export default Hero;