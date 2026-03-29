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
    className="text-gray-700 cursor-pointer group block"
  >
    <div className="overflow-hidden rounded-xl w-full h-64 bg-gray-100 flex items-center justify-center">
      <img
        className="w-full h-full object-cover hover:scale-110 transition duration-300 ease-in-out"
        src={mainImage}
        alt={product_name || "Product Image"}
      />
    </div>

    {/* Product Name */}
    <p className="pt-3 pb-1 text-sm group-hover:text-black transition truncate">
      {product_name || "Unnamed Product"}
    </p>
<div className="flex items-center gap-2">
  {/* If discount exists AND is different */}
  {product_discount_price && product_discount_price !== product_mrp ? (
    <>
      {/* Original Price */}
      <p className="text-gray-400 text-sm line-through">
        {currency}{product_mrp}
      </p>

      {/* Discount Price */}
      <p className="text-sm font-semibold text-pink-500">
        {currency}{product_discount_price}
      </p>
    </>
  ) : (
    /* Only one price */
    <p className="text-sm font-semibold text-gray-700">
      {currency}{product_mrp}
    </p>
  )}
</div>
  </Link>
);
};

export default ProductItem;