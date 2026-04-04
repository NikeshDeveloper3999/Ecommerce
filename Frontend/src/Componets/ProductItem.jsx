import React, { useContext } from 'react';
import { Shopcontext } from '../Context/Shopcontext';
import { Link } from 'react-router-dom';

const ProductItem = ({ product_code, product_name, product_mrp, product_image,product_discount_price }) => {
  const { currency } = useContext(Shopcontext);

  // Safe fallback for product_image
  const mainImage = Array.isArray(product_image) && product_image.length > 0 ? product_image[0] : '/placeholder.png';

 return (
  <Link
    to={`/product/${product_code}`}
    state={{
      product: {
        product_code,
        product_name,
        product_mrp,
        product_discount_price,
        product_image,
      },
    }}
    className="group block bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition duration-300"
  >
    {/* IMAGE CONTAINER */}
    <div className="w-full aspect-[4/5] bg-gray-100 overflow-hidden rounded-lg">
  <img
    src={mainImage}
    alt={product_name || "Product Image"}
    className="w-full h-full object-contain p-2 group-hover:scale-105 transition duration-300"
  />
</div>

    {/* CONTENT */}
    <div className="p-3">
      {/* Product Name */}
      <p className="text-sm sm:text-base font-medium text-gray-700 group-hover:text-black transition line-clamp-2">
        {product_name || "Unnamed Product"}
      </p>

      {/* PRICE */}
      <div className="flex items-center gap-2 mt-1">
        {product_discount_price && product_discount_price !== product_mrp ? (
          <>
            <p className="text-gray-400 text-xs sm:text-sm line-through">
              {currency}{product_mrp}
            </p>
            <p className="text-sm sm:text-base font-semibold text-pink-500">
              {currency}{product_discount_price}
            </p>
          </>
        ) : (
          <p className="text-sm sm:text-base font-semibold text-gray-800">
            {currency}{product_mrp}
          </p>
        )}
      </div>
    </div>
  </Link>

);
};

export default ProductItem;