import React, { useContext, useEffect, useState, useRef } from "react";
import { Shopcontext } from "../Context/Shopcontext";
import Title from "./Title";
import ProductItem from "./ProductItem";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const BsetSeller = () => {
  const { products } = useContext(Shopcontext);
  const [BestSeller, setBestSeller] = useState([]);
  const sectionRef = useRef(null);

  // Filter best seller products
  useEffect(() => {
    if (Array.isArray(products)) {
      const bestProducts = products.filter((item) => item.bestseller);
      setBestSeller(bestProducts.slice(0, 5));
    }
  }, [products]);

  // GSAP Animation
  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      
      // Section animation
      gsap.from(sectionRef.current, {
        y: 80,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 90%",
          toggleActions: "play none none reverse",
        },
      });

      // Cards animation (Top → Bottom + scroll-based)
      ScrollTrigger.batch(
        sectionRef.current.querySelectorAll(".product-card"),
        {
          start: "top 90%",

          onEnter: (batch) =>
            gsap.to(batch, {
              opacity: 1,
              y: 0,
              stagger: 0.15,
              duration: 0.5,
              ease: "power2.out",
            }),

          onLeaveBack: (batch) =>
            gsap.to(batch, {
              opacity: 0,
              y: -60,
              stagger: 0.1,
              duration: 0.3,
            }),
        }
      );

    }, sectionRef);

    return () => ctx.revert();
  }, [BestSeller]);

  return (
    <div className="my-16 px-4 sm:px-8" ref={sectionRef}>
      
      {/* Heading */}
      <div className="text-center text-3xl py-8">
        <Title text1="BEST" text2="SELLERS" />
        <p className="w-full sm:w-3/4 mx-auto text-sm md:text-base text-gray-500 leading-relaxed">
          Discover our most loved products chosen by customers.
        </p>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5 gap-y-8">
        {BestSeller.map((item) => (
          <div
            key={item.product_code}
            className="product-card opacity-0 translate-y-[-60px] transform transition-all duration-300 hover:scale-105 hover:shadow-xl rounded-xl"
          >
            <ProductItem
              product_code={item.product_code}
              product_name={item.product_name}
              product_mrp={item.product_mrp}
              product_image={item.product_image}
            />
          </div>
        ))}
      </div>

    </div>
  );
};

export default BsetSeller;