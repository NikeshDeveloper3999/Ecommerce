import React, { useContext, useEffect, useState, useRef } from 'react';
import { Shopcontext } from '../Context/Shopcontext';
import Title from '../Componets/Title';
import { assets } from '../assets/assets';
import Carttotal from '../Componets/Carttotal';
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Cart = () => {
  const { products, currency, cartItem, updatequantity, navigate } = useContext(Shopcontext);
  const [cartData, setcartData] = useState([]);
  const sectionRef = useRef(null);

  useEffect(() => {
    if (products.length > 0) {
      const tempdata = [];

      for (const productCode in cartItem) {
        for (const size in cartItem[productCode]) {
          if (cartItem[productCode][size] > 0) {
            tempdata.push({
              _id: productCode,
              size: size,
              quantity: cartItem[productCode][size]
            });
          }
        }
      }

      setcartData(tempdata);
    }
  }, [cartItem, products]);

  useEffect(() => {
    const items = sectionRef.current.querySelectorAll(".cart-item");

    gsap.from(items, {
      x: -80,
      opacity: 0,
      duration: 0.8,
      stagger: 0.2,
      ease: "power2.out",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 90%",
        toggleActions: "play none none reset",
      },
    });

    ScrollTrigger.refresh();
  }, [cartData]);

  return (
    <div className='border-t pt-14' ref={sectionRef}>

      <div className="text-2xl mb-3">
        <Title text1={'YOUR'} text2={'CART'} />
      </div>

      <div>
        {cartData.map((item, index) => {

          const productData = products.find(
            (product) => product.product_code === item._id
          );

          if (!productData) return null;

          const price = productData.product_discount_price || productData.product_mrp;

          return (
            <div
              key={index}
              className="cart-item py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4"
            >
              <div className="flex items-start gap-6">
                <img
                  src={productData.product_image?.[0] || '/placeholder.png'}
                  alt=""
                  className='w-16 sm:w-20'
                />

                <div>
                  <p className='text-xs sm:text-lg font-medium'>
                    {productData.product_name}
                  </p>

                  <div className="flex items-center gap-5 mt-2">
                    <p>{currency}{price}</p>
                    <p className='px-2 sm:px-3 sm:py-1 border bg-slate-200'>
                      {item.size}
                    </p>
                  </div>
                </div>
              </div>

              <input
                type="number"
                min={1}
                value={item.quantity}
                className='border max-w-16 px-2 py-1'
                onChange={(e) => {
                  const value = Number(e.target.value);
                  if (value > 0) updatequantity(item._id, item.size, value);
                }}
              />

              <img
                src={assets.bin_icon}
                alt=""
                className='w-4 sm:w-5 cursor-pointer'
                onClick={() => updatequantity(item._id, item.size, 0)}
              />
            </div>
          );
        })}
      </div>

      <div className="flex justify-end my-20">
        <div className="w-full sm:w-[450px]">
          <Carttotal />

          <div className="w-full text-end">
            <button
              onClick={() => navigate('/place-order')}
              className='bg-black text-white text-sm my-8 px-8 py-3'
            >
              PROCEED TO CHECKOUT
            </button>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Cart;