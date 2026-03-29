import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Shopcontext } from "../Context/Shopcontext";
import { assets } from "../assets/assets";
import RelatedProduct from "../Componets/RelatedProduct";

const Product = () => {
  const { productId } = useParams();

  const { products, currency, addtocart } = useContext(Shopcontext);
  const [productData, setproductData] = useState(false);
  const [image, setimage] = useState("");
  const [size, setsize] = useState("");

  const fetchproductdata = () => {
    if (!products || products.length === 0) return;

    const foundProduct = products.find(
      (item) => String(item.product_code) === String(productId)
    );

    if (foundProduct) {
      setproductData(foundProduct);

      if (Array.isArray(foundProduct.product_image) && foundProduct.product_image.length > 0) {
        setimage(foundProduct.product_image[0]);
      }
    }
  };

  useEffect(() => {
    fetchproductdata();
  }, [productId, products]);

  return productData ? (
    <div className="border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Main Content: Images + Info */}
      <div className="flex flex-col lg:flex-row gap-12">
        
        {/* ---------------- Images Section ---------------- */}
        
        

        <div className="flex-1 flex flex-col lg:flex-row gap-4">

  {/* Thumbnails */}
  <div className="order-2 lg:order-1 flex lg:flex-col gap-3 overflow-x-auto lg:overflow-visible scrollbar-hide">
    {productData.product_image.map((item, index) => (
      <img
        key={index}
        src={item}
        alt=""
        onClick={() => setimage(item)}
        className={`min-w-[65px] sm:min-w-[75px] lg:min-w-0 lg:w-20 h-20 object-cover rounded-md cursor-pointer border transition-all duration-200
        ${
          item === image
            ? "border-black scale-105"
            : "border-gray-200 hover:border-black"
        }`}
      />
    ))}
  </div>

  {/* Main Image */}
  <div className="order-1 lg:order-2 w-full flex justify-center">
    <img
      src={image}
      alt=""
      className="
        w-[85%] sm:w-[75%] lg:w-full 
        h-[320px] sm:h-[300px] lg:h-[360px]
        object-cover rounded-lg shadow-sm 
        transition-transform duration-300 hover:scale-[1.02]
      "
    />
  </div>

</div>


        {/* ---------------- Product Info (Right Side) ---------------- */}

<div className="flex-1 flex flex-col gap-5 sm:gap-6">

  {/* Product Name */}
  <h1 className="text-xl mt-3 lg:text-2xlleading-tight">
    {productData.product_name}
  </h1>

  {/* Price */}
  <div className="text-gray-800 -mt-2.5">
    <p>
      {currency}{productData.product_mrp}
    </p>
    <span className="text-xs text-gray-500 block">
      (MRP incl. of all taxes)
    </span>
  </div>

  {/* Product Description */}
  <p className="text-gray-600 text-base lg:text-lg sm:w-4/5 leading-relaxed">
    {productData.product_description}
  </p>

  {/* Size Selector */}
  <div className="flex flex-col gap-2">
    <p className="text-gray-800 font-medium">Select Size</p>

    <div className="flex gap-2 sm:gap-3 flex-wrap">
      {productData.product_size.map((item, index) => (
        <button
          key={index}
          onClick={() => setsize(item)}
          className={`px-3 sm:px-4 py-1.5 sm:py-2 border rounded-md text-gray-700 transition-all
          ${
            item === size
              ? "border-black bg-gray-100"
              : "border-gray-300 hover:border-black"
          }`}
        >
          {item}
        </button>
      ))}
    </div>
  </div>

  {/* Add to Cart */}
  <button
    onClick={() => addtocart(productData.product_code, size)}
    className="bg-black text-white py-2.5 sm:py-3 rounded-md w-full hover:bg-gray-800 transition"
  >
    ADD TO CART
  </button>

  {/* Extra Info */}
  <div className="text-sm text-gray-500 space-y-1 pt-2">
    <p>100% Original Product</p>
    <p>Cash on Delivery available</p>
    <p>Easy return & exchange</p>
  </div>

</div>
      </div>

      {/* ---------------- Description Section ---------------- */}
      <div className="mt-16">
        <div className="p-6 text-sm text-gray-600 border border-gray-300 shadow-sm bg-white rounded-lg flex flex-col gap-4">
          <p className="leading-relaxed">
            Welcome to our ecommerce store! We offer a wide range of high-quality products 
            including fashion, electronics, home essentials, and more. Our platform is designed 
            to provide a smooth shopping experience with secure payments, fast delivery, 
            and easy returns.
          </p>

          <p className="leading-relaxed">
            Customer satisfaction is our top priority. You can explore trending products, 
            best sellers, and exclusive discounts available for a limited time. 
            We ensure trusted brands, verified sellers, and 24/7 customer support 
            to make your online shopping safe and convenient.
          </p>
        </div>
      </div>

      {/* ---------------- Related Products ---------------- */}
      <div className="mt-16">
        <RelatedProduct
          category={productData.product_category}
          subCategory={productData.product_subcategory}
        />
      </div>
    </div>
  ) : (
    <div className="opacity-0"></div>
  );
};

export default Product;