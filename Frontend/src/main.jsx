import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import ShopcontextProvider from "./Context/Shopcontext";
import { Toaster } from "react-hot-toast";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <ShopcontextProvider>

      <Toaster position="top-right" />

      <App />

    </ShopcontextProvider>
  </BrowserRouter>
);