import React, { useContext, useEffect, useState } from 'react';
import { Shopcontext } from '../Context/Shopcontext';
import ProductItem from './ProductItem';
import Title from './Title';

const RelatedProduct = ({ category, subCategory }) => {
  const { products } = useContext(Shopcontext);
  const [related, setRelated] = useState([]);

  useEffect(() => {
    if (products.length > 0) {
      // Make a copy
      let productscopy = products.slice();

      // Filter by category
      if (category) {
        productscopy = productscopy.filter(
          (item) => item.product_category === category
        );
      }

      // Filter by subcategory
      if (subCategory) {
        productscopy = productscopy.filter(
          (item) => item.product_subcategory === subCategory
        );
      }

      // Take first 5 items
      setRelated(productscopy.slice(0, 5));
    }
  }, [products, category, subCategory]);

  return (
    <div className="my-24">
      <div className="text-center text-3xl py-2">
        <Title text1={'RELATED'} text2={'PRODUCTS'} />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
        {related.length > 0 ? (
          related.map((item, index) => (
            <ProductItem
              key={index}
              product_code={item.product_code}
              product_name={item.product_name}
              product_mrp={item.product_mrp}
              product_discount_price={item.product_discount_price}
              product_image={item.product_image}
            />
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500 py-10">
            No related products found.
          </p>
        )}
      </div>
    </div>
  );
};

export default RelatedProduct;