import React, { useContext, useEffect, useState, useRef } from "react";
import { Shopcontext } from "../Context/Shopcontext";
import Title from "./Title";
import ProductItem from "./ProductItem";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const LatestCollection = () => {
  const { products } = useContext(Shopcontext);
  const [latestproduct, setlatestproduct] = useState([]);
  const sectionRef = useRef(null);

  // Get latest products
  useEffect(() => {
    if (Array.isArray(products)) {
      setlatestproduct(products.slice(0, 10));
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
              filter: "blur(0px)"
            }),
        }
      );

    }, sectionRef);

    return () => ctx.revert();
  }, [latestproduct]);

  return (
    <div className="my-16 px-4 sm:px-8" ref={sectionRef}>
      
      {/* Heading */}
      <div className="text-center py-8 text-3xl">
        <Title text1={"LATEST"} text2={"COLLECTION"} />
        <p className="w-full sm:w-3/4 mx-auto text-sm md:text-base text-gray-500 leading-relaxed">
          Discover our newest arrivals with premium quality and modern design.
        </p>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5 gap-y-8">
        {latestproduct.map((item) => (
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

export default LatestCollection;