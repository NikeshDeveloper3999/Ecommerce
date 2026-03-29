import React, { useContext, useEffect, useState } from "react";
import { Shopcontext } from "../Context/Shopcontext";
import { assets } from "../assets/assets";
import Title from "../Componets/Title";
import Productitem from "../Componets/ProductItem";
import { FaFilter, FaChevronDown } from "react-icons/fa";

// Component to show when no products match
const NoProducts = () => {
  return (
    <div className="col-span-full text-center py-20 text-gray-500 text-lg">
      No products found for the selected filters.
    </div>
  );
};




const Collection = () => {
  const { products, showSearch, search } = useContext(Shopcontext);

  const [showFilter, setshowFilter] = useState(false);
  const [filterProducts, setfilterProducts] = useState([]);
  const [category, setcategory] = useState([]);
  const [subcategory, setsubcategory] = useState([]);
  const [sortType, setsortType] = useState("relavant");
const [currentPage, setCurrentPage] = useState(1);
const productsPerPage = 12; 




  // Toggle category selection
  const toggleCategory = (e) => {
    const value = e.target.value;
    if (category.includes(value)) {
      setcategory(category.filter((item) => item !== value));
    } else {
      setcategory([...category, value]);
    }
  };

  // Toggle subcategory selection
  const togglesubCategory = (e) => {
    const value = e.target.value;
    if (subcategory.includes(value)) {
      setsubcategory(subcategory.filter((item) => item !== value));
    } else {
      setsubcategory([...subcategory, value]);
    }
  };

  // Apply filters: search, category, subcategory
  const applyFilter = () => {
    let productcopy = products.slice();

    if (showSearch && search) {
      productcopy = productcopy.filter((item) =>
        item.product_name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (category.length > 0) {
      productcopy = productcopy.filter((item) =>
        category.includes(item.product_category)
      );
    }

    if (subcategory.length > 0) {
      productcopy = productcopy.filter((item) =>
        subcategory.includes(item.product_subcategory)
      );
    }

    setfilterProducts(productcopy);
  };

  // Sort products based on sortType
  const sortProduct = () => {
    let fillterCopy = filterProducts.slice();

    switch (sortType) {
      case "low-high":
        setfilterProducts(
          fillterCopy.sort(
            (a, b) =>
              (a.product_discount_price || a.product_mrp) -
              (b.product_discount_price || b.product_mrp)
          )
        );
        break;

      case "high-low":
        setfilterProducts(
          fillterCopy.sort(
            (a, b) =>
              (b.product_discount_price || b.product_mrp) -
              (a.product_discount_price || a.product_mrp)
          )
        );
        break;

      default:
        applyFilter();
        break;
    }
  };


const indexOfLastProduct = currentPage * productsPerPage;
const indexOfFirstProduct = indexOfLastProduct - productsPerPage;

const currentProducts = filterProducts.slice(
  indexOfFirstProduct,
  indexOfLastProduct
);



const totalPages = Math.ceil(filterProducts.length / productsPerPage);


  useEffect(() => {
    applyFilter();
    setCurrentPage(1);
  }, [category, subcategory, showSearch, search, products]);

  useEffect(() => {
    sortProduct();
  }, [sortType]);



  return (
  <div className="flex flex-col sm:flex-row gap-6 pt-10 border-t">

    {/* ================= LEFT FILTER ================= */}
    <div className="sm:w-40">

      {/* Filter Toggle (Mobile) */}
      <div
        onClick={() => setshowFilter(!showFilter)}
        className="flex items-center justify-between cursor-pointer sm:cursor-default"
      >
        <p className="text-lg  flex items-center gap-2">
          <FaFilter /> Filters
        </p>

        <FaChevronDown
          className={`sm:hidden transition-transform ${
            showFilter ? "rotate-180" : ""
          }`}
        />
      </div>

      {/* FILTER CONTENT */}
      <div
        className={`mt-4 space-y-6 ${
          showFilter ? "block" : "hidden"
        } sm:block`}
      >
        {/* CATEGORY */}
        <div className="border p-4 rounded-lg shadow-sm">
          <p className="font-small mb-3">Categories</p>

          <div className="space-y-2 text-sm text-gray-600">
            {["Men", "Women", "Kids"].map((cat) => (
              <label key={cat} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  value={cat}
                  onChange={toggleCategory}
                  className="accent-black"
                />
                {cat}
              </label>
            ))}
          </div>
        </div>

        {/* TYPES */}
        <div className="border p-4 rounded-lg shadow-sm ">
          <p className="font-small mb-3">Types</p>

          <div className="space-y-2 text-sm text-gray-600">
            {["Topwear", "Bottomwear", "Winterwear"].map((type) => (
              <label key={type} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  value={type}
                  onChange={togglesubCategory}
                  className="accent-black"
                />
                {type}
              </label>

            ))}
          </div>
        </div>
      </div>
    </div>

    {/* ================= RIGHT PRODUCTS ================= */}
    <div className="flex-1">

      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <Title text1={"ALL"} text2={"COLLECTION"} />

        {/* SORT */}
        <select
          onChange={(e) => setsortType(e.target.value)}
          className="border px-3 py-2 rounded-md text-sm focus:outline-none"
        >
          <option value="relavant">Sort by: Relevant</option>
          <option value="low-high">Low to High</option>
          <option value="high-low">High to Low</option>
        </select>
      </div>

      {/* PRODUCT GRID */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {filterProducts.length > 0 ? (
         currentProducts.map((item, index) => (
            <Productitem
              key={index}
              product_code={item.product_code}
              product_name={item.product_name}
              product_mrp={item.product_mrp}
              product_discount_price={item.product_discount_price}
              product_image={item.product_image}
            />
          ))
        )
        
        
        : (
          <NoProducts />
        )}
      </div>

{/* PAGINATION */}
{filterProducts.length > 0 && (
  <div className="flex justify-center mt-8 gap-4">

    {/* Previous Button */}
    <button
      onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
      disabled={currentPage === 1}
      className=" px-2 border rounded disabled:opacity-50"
    >
      Prev
    </button>

    {/* Page Indicator */}
    <span className="px-1 border rounded bg-gray-100 ">
      Page {currentPage}
    </span>

    {/* Next Button */}
    <button
      onClick={() =>
        setCurrentPage((prev) =>
          indexOfLastProduct < filterProducts.length ? prev + 1 : prev
        )
      }
      disabled={indexOfLastProduct >= filterProducts.length}
      className="px-1 border rounded disabled:opacity-50"
    >
      Next
    </button>

  </div>
)}
    </div>
  </div>
);
};

export default Collection;