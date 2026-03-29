import React, { useEffect, useState } from "react";
import axios from "axios";
import { backendUrl } from "../App";
import { toast } from "react-toastify";

const List = ({ token }) => { // destructure token from props
  const [list, setList] = useState([]);

  const fetchList = async () => {
    try {
      const response = await axios.get(backendUrl + "/api/product/list", {    
       headers: {
            Authorization: `Bearer ${token}`
      }
    });

    console.log(response.data.products);
      if (response.data.success) {
        setList(response.data.products);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

const removeProduct = async (id) => {
  try {
    const response = await axios.post(
      backendUrl + "/api/product/delete",
      { id },
      {
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      }
    );

    if (response.data.success) {
      toast.success(response.data.message);
      fetchList(); // refresh the list
    } else {
      toast.error(response.data.message);
    }
  } catch (error) {
    toast.error(error.response?.data?.message || error.message);
  }
};
  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className="p-6">
      <p className="mb-4 font-semibold text-lg">All Products List</p>

      {/* Table Header */}
      <div className="grid grid-cols-5 gap-4 font-medium border-b pb-2 mb-2">
        <span>Image</span>
        <span>Name</span>
        <span>Category</span>
        <span>Price</span>
        <span>Action</span>
      </div>

      {/* Product List */}
      {list.length === 0 ? (
        <p>No products found.</p>
      ) : (
        list.map((product) => (
          <div
            key={product._id}
            className="grid grid-cols-5 gap-4 items-center border-b py-2"
          >
            <img
              src={product.product_image?.[0] || "/placeholder.png"}
              alt={product.product_name}
              className="w-16 h-16 object-cover rounded"
            />

            <span>{product.product_name}</span>

            <span>{product.product_category || ''}</span>

            <span>
              ₹{product.product_discount_price || product.product_mrp || 0}
            </span>

            <div className="flex gap-2">
              <button
                className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                onClick={() =>{ if (window.confirm("Are you sure you want to delete this product?")) { removeProduct(product._id)} }} 
              >
                Delete
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default List;