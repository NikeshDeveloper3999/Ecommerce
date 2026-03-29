import React, { useEffect, useState } from "react";
import axios from "axios";
import { backendUrl } from "../App";

const Orders = ({ token }) => {
  const [orders, setOrders] = useState([]);
  const [filterStatus, setFilterStatus] = useState("All"); // ✅ NEW

  // ================= FETCH ORDERS =================
  const fetchAllOrders = async () => {
    if (!token) return;

    try {
      const response = await axios.post(
        backendUrl + "/api/order/list",
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.success) {
        // ✅ SORT: latest orders first
        const sortedOrders = response.data.orders.sort(
          (a, b) => new Date(b.date) - new Date(a.date)
        );

        setOrders(sortedOrders);
      }
    } catch (err) {
      console.log(err);
    }
  };

  // ================= STATUS UPDATE =================
  const statusHandler = async (event, orderId) => {
    try {
      const response = await axios.post(
        backendUrl + "/api/order/status",
        { orderId, status: event.target.value },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.success) fetchAllOrders();
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, [token]);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-bold mb-6">Order Page</h2>

      {/* ================= FILTER TABS ================= */}
      <div className="flex gap-3 mb-6 flex-wrap">
        {[
          "All",
          "Order Placed",
          "Packing",
          "Shipped",
          "Out for delivery",
          "Delivered",
        ].map((status) => (
          <button
            key={status}
            onClick={() => setFilterStatus(status)}
            className={`px-4 py-1 rounded-full text-sm border ${
              filterStatus === status
                ? "bg-black text-white"
                : "bg-white text-gray-600"
            }`}
          >
            {status}
          </button>
        ))}
      </div>

      {/* ================= ORDER LIST ================= */}
      {orders
        .filter((order) =>
          filterStatus === "All" ? true : order.status === filterStatus
        )
        .map((order) => (
          <div
            key={order._id}
            className="flex flex-col sm:flex-row justify-between border rounded-lg shadow p-4 mb-4 bg-white gap-4"
          >
            {/* LEFT: PRODUCT + ADDRESS */}
            <div className="flex gap-4 sm:flex-1">
              <div className="flex items-start justify-center w-12 text-3xl">
                📦
              </div>

              <div className="flex flex-col gap-2">
                {/* PRODUCTS */}
                {order.items.map((item, i) => (
                  <p key={i} className="text-sm text-gray-700">
                    {item.product_name || item.name} x {item.quantity}
                  </p>
                ))}

                {/* ADDRESS */}
                <div className="text-sm text-gray-600 mt-2">
                  <p>
                    {order.address.firstName} {order.address.lastName}
                  </p>
                  <p>{order.address.street}</p>
                  <p>{order.address.city}</p>
                  <p>{order.address.phone}</p>
                </div>
              </div>
            </div>

            {/* MIDDLE: ORDER INFO */}
            <div className="flex flex-col gap-1 text-sm sm:w-48">
              <p>Items: {order.items.length}</p>
              <p>Method: {order.paymentMethod}</p>
              <p>
                Payment:{" "}
                {order.payment ? "Done" : "Pending"}
              </p>
              <p>
                Date:{" "}
                {new Date(order.date).toLocaleDateString()}
              </p>
            </div>

            {/* RIGHT: PRICE + STATUS */}
            <div className="flex flex-col justify-between items-end gap-2">
              <p className="font-semibold text-lg">₹{order.amount}</p>

              <select
                className="border px-3 py-1 rounded text-sm"
                onChange={(e) => statusHandler(e, order._id)}
                value={order.status}
              >
                <option value="Order Placed">Order Placed</option>
                <option value="Packing">Packing</option>
                <option value="Shipped">Shipped</option>
                <option value="Out for delivery">Out for delivery</option>
                <option value="Delivered">Delivered</option>
              </select>
            </div>
          </div>
        ))}
    </div>
  );
};

export default Orders;