import React, { useState, useContext } from "react";
import { Shopcontext } from "../Context/Shopcontext";
import axios from "axios";
import { toast } from "react-toastify";

const ForgotPassword = () => {
  const { backendURL } = useContext(Shopcontext);
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        `${backendURL}/api/user/forgot-password`,
        { email }
      );

      if (res.data.success) {
        toast.success("Reset link sent to your email");
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-[300px]">
        <h2 className="text-2xl font-semibold text-center">
          Forgot Password
        </h2>

        <input
          type="email"
          placeholder="Enter your email"
          className="border px-3 py-2"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <button className="bg-black text-white py-2">
          Send Reset Link
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;