import React, { useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Shopcontext } from "../Context/Shopcontext";
import axios from "axios";
import { toast } from "react-toastify";

const ResetPassword = () => {
  const { backendURL } = useContext(Shopcontext);
  const { token } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!password || !confirmPassword) {
      return toast.error("All fields are required");
    }

    if (password.length < 6) {
      return toast.error("Password must be at least 6 characters");
    }

    if (password !== confirmPassword) {
      return toast.error("Passwords do not match");
    }

    try {
      setLoading(true);

      const res = await axios.post(
        `${backendURL}/api/user/reset-password/${token}`,
        { password }
      );

      if (res.data.success) {
        toast.success("Password reset successful");

        // redirect after success
        setTimeout(() => {
          navigate("/login");
        }, 2000);

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
          Reset Password
        </h2>

        <input
          type="password"
          placeholder="New Password"
          className="border px-3 py-2 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Confirm Password"
          className="border px-3 py-2 rounded"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />

        <button
          disabled={loading}
          className="bg-black text-white py-2 rounded disabled:opacity-50"
        >
          {loading ? "Updating..." : "Reset Password"}
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;