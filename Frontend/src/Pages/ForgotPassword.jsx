import React, { useState, useContext } from "react";
import { Shopcontext } from "../Context/Shopcontext";
import axios from "axios";
import { toast } from "react-toastify";

const ForgotPassword = () => {
  const { backendURL } = useContext(Shopcontext);

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      return toast.error("Email is required");
    }

    try {
      setLoading(true);

      const res = await axios.post(
        `${backendURL}/api/user/forgot-password`,
        { email }
      );

      if (res.data.success) {
        toast.success("Reset link sent to your email");
        setEmail("");
      } else {
        toast.error(res.data.message);
      }

    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 w-[320px] bg-white p-6 rounded-lg shadow"
      >
        <h2 className="text-2xl font-semibold text-center">
          Forgot Password
        </h2>

        <input
          type="email"
          placeholder="Enter your email"
          className="border px-3 py-2 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <button
          disabled={loading}
          className="bg-black text-white py-2 rounded disabled:opacity-50"
        >
          {loading ? "Sending..." : "Send Reset Link"}
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;