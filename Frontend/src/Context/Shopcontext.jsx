import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const Shopcontext = createContext();

const ShopcontextProvider = (props) => {

  const currency = "₹";
  const delivery_fee = 10;
  const backendURL = import.meta.env.VITE_BACKEND_URL;

  const [search, setsearch] = useState("");
  const [showSearch, setshowSearch] = useState(false);
  const [cartItem, setcartItem] = useState({});
  const [orders, setorders] = useState([]);
  const [products, setproduct] = useState([]);
  const [Token, setToken] = useState(localStorage.getItem("token") || "");

  const navigate = useNavigate();

  // ================= ADD TO CART =================

  const addtocart = async (itemId, size) => {

    if (!size) {
      toast.error("Select product size");
      return;
    }

    let cartData = structuredClone(cartItem || {});

    if (!cartData[itemId]) cartData[itemId] = {};

    cartData[itemId][size] = (cartData[itemId][size] || 0) + 1;

    setcartItem(cartData);

    const tokenToUse = Token || localStorage.getItem("token");

    if (!tokenToUse) {
      toast.error("Login required to add items to cart");
      return;
    }

    try {

      const response = await axios.post(
        `${backendURL}/api/cart/add`,
        { itemId, size },
        { headers: { Authorization: `Bearer ${tokenToUse}` } }
      );

      toast.success(response.data.message);

    } catch (error) {

      toast.error(error.response?.data?.message || error.message);

    }
  };


  // ================= CART COUNT =================

  const Getcartcount = () => {

    let totalCount = 0;

    for (const itemId in cartItem) {
      for (const size in cartItem[itemId]) {
        totalCount += cartItem[itemId][size] || 0;
      }
    }

    return totalCount;

  };


  // ================= UPDATE QUANTITY =================
const updatequantity = async (itemId, size, quantity) => {

  let cartData = structuredClone(cartItem || {});

  if (quantity <= 0) {

    delete cartData[itemId][size];

    if (Object.keys(cartData[itemId]).length === 0) {
      delete cartData[itemId];
    }

  } else {

    if (!cartData[itemId]) cartData[itemId] = {};

    cartData[itemId][size] = quantity;

  }

  setcartItem(cartData);

  if (Token) {

    try {

      const response = await axios.post(
        `${backendURL}/api/cart/update`,
        { itemId, size, quantity },
        { headers: { Authorization: `Bearer ${Token}` } }
      );

      console.log(response.data.message);
      toast.success(  "message" +  response.data.message);

    } catch (error) {
console.log(error)
      toast.error(error.message);

    }

  }

};

  // ================= TOTAL AMOUNT =================

  const carttotalAmount = () => {

    let totalAmount = 0;

    for (const productCode in cartItem) {

      const itemInfo = products.find(
        (product) => product.product_code === productCode
      );

      if (!itemInfo) continue;

      for (const size in cartItem[productCode]) {

        const quantity = cartItem[productCode][size];

        if (quantity > 0) {

          const price =
            itemInfo.product_discount_price || itemInfo.product_mrp;

          totalAmount += price * quantity;

        }

      }

    }

    return totalAmount;

  };


  // ================= FETCH PRODUCTS =================

  const getproductData = async () => {

    try {

      const response = await axios.get(
        backendURL + "/api/product/userlist"
      );

      if (response.data.success) {

        setproduct(response.data.products);

      }

    } catch (error) {

      toast.error(error.message);

    }

  };

  useEffect(() => {

    getproductData();

  }, []);


  // ================= PLACE ORDER =================

  const placeOrder = () => {

    if (Object.keys(cartItem).length === 0) {

      toast.error("Cart is empty");
      return;

    }

    const newOrder = {

      id: Date.now(),
      items: cartItem,
      amount: carttotalAmount() + delivery_fee,
      date: new Date().toLocaleDateString(),
      status: "Order Placed",

    };

    setorders((prev) => [...prev, newOrder]);

    setcartItem({});

    toast.success("Order placed successfully");

    navigate("/orders");

  };


  // ================= GET USER CART =================
const getusercart = async (token) => {

  if (!token) return;

  try {

    const response = await axios.post(
      `${backendURL}/api/cart/get`,
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    );

    if (response.data.success) {

      setcartItem(response.data.cartData);

    }

  } catch (error) {

    toast.error(error.response?.data?.message || error.message);

  }

};


useEffect(() => {

  const storedToken = localStorage.getItem("token");

  if (storedToken) {

    setToken(storedToken);

    getusercart(storedToken);

  }

}, []);

  // ================= CONTEXT VALUE =================

  const value = {

    products,
    currency,
    delivery_fee,

    search,
    setsearch,

    showSearch,
    setshowSearch,

    cartItem,
    setcartItem,
    addtocart,
    Getcartcount,

    updatequantity,
    carttotalAmount,

    navigate,

    orders,
    placeOrder,

    backendURL,
    setToken,
    Token

  };

  return (
    <Shopcontext.Provider value={value}>
      {props.children}
    </Shopcontext.Provider>
  );

};

export default ShopcontextProvider;