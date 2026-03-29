import React, { useEffect, useRef } from "react";
import { assets } from "../assets/assets";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Policy = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const cards = sectionRef.current.querySelectorAll(".policy-card");

    
  }, []);

  return (
    <div
      ref={sectionRef}
      className="flex flex-col sm:flex-row justify-around gap-10 text-center py-20 px-4 text-gray-700"
    >
      
      {/* Card 1 */}
      <div className="policy-card p-4">
        <img src={assets.exchange_icon} alt="" className="w-12 m-auto mb-5" />
        <p className="font-semibold">Easy Exchange Policy</p>
        <p className="text-gray-400">We offer hassle free exchange policy</p>
      </div>

      {/* Card 2 */}
      <div className="policy-card p-4">
        <img src={assets.quality_icon} alt="" className="w-12 m-auto mb-5" />
        <p className="font-semibold">7 Days Return Policy</p>
        <p className="text-gray-400">We provide 7 days free return policy</p>
      </div>

      {/* Card 3 */}
      <div className="policy-card p-4">
        <img src={assets.support_img} alt="" className="w-12 m-auto mb-5" />
        <p className="font-semibold">Best Customer Support</p>
        <p className="text-gray-400">We provide 24/7 customer support</p>
      </div>

    </div>
  );
};

export default Policy;