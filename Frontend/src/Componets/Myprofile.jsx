import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  Mail,
  Phone,
  MapPin,
  ShoppingBag,
  Calendar,
  Edit,
  Trash2,
  LogOut,
} from "lucide-react";
import { Shopcontext } from "../Context/Shopcontext";
import { useNavigate } from "react-router-dom";

const Myprofile = () => {
  const [user, setUser] = useState(null);

  const { backendURL, Token, setToken } =
    useContext(Shopcontext);

  const navigate = useNavigate();

  // ================================
  // GET USER DETAILS
  // ================================
  const getUserDetails = async () => {
    try {
      const response = await axios.get(
        backendURL + "/api/user/me",
        {
          headers: {
            Authorization: `Bearer ${Token}`,
          },
        }
      );

      
      setUser(response.data.user);

    } catch (error) {
      console.log(error);

      toast.error("Failed to fetch user details");
    }
  };

  const logoutHandler = () => {
    localStorage.removeItem("token");

    setToken("");
toast.success(' acoount logout successfull')

    navigate("/login");
  };

  const deleteAccount = async () => {
    try {

      const confirmDelete = window.confirm(
        "Are you sure you want to delete your account?"
      );

      if (!confirmDelete) return;

      const response = await axios.delete(
        `${backendURL}/api/user/delete/${user._id}`,
        {
          headers: {
            Authorization: `Bearer ${Token}`,
          },
        }
      );

      console.log(response.data);

      toast.error("Account deleted successfully");

      localStorage.removeItem("token");

      setToken("");

      navigate("/login");

    } catch (error) {

      console.log(error);

      toast.error("Failed to delete account");
    }
  };

  useEffect(() => {
    if (Token) {
      getUserDetails();
    }
  }, [Token]);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl font-semibold">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-5xl mx-auto">

        {/* Heading */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-gray-800">
            My Profile
          </h1>

          
        </div>

        {/* Profile Card */}
        <div className="bg-white rounded-2xl shadow-md overflow-hidden">

          {/* Top Banner */}
          <div className="bg-gradient-to-r from-black to-gray-700 h-40"></div>

          <div className="px-6 pb-6">

            {/* Avatar */}
            <div className="-mt-16 flex flex-col md:flex-row md:items-end md:justify-between">

              <div className="flex items-center gap-5">

                <img
                  src={
                    user.image ||
                    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400"
                  }
                  alt="profile"
                  className="w-32 h-32 rounded-full border-4 border-white object-cover shadow-lg"
                />

                <div>
                  <h2 className="text-2xl font-bold text-gray-300">
                    {user.full_name}
                  </h2>

                </div>
              </div>
            </div>

            {/* Info Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">

              {/* Email */}
              <div className="bg-gray-50 p-5 rounded-xl border">
                <div className="flex items-center gap-3 mb-2">
                  <Mail className="text-black" />

                  <h3 className="font-semibold text-gray-700">
                    Email
                  </h3>
                </div>

                <p className="text-gray-600">
                  {user.email}
                </p>
              </div>

              {/* Phone */}
              <div className="bg-gray-50 p-5 rounded-xl border">
                <div className="flex items-center gap-3 mb-2">
                  <Phone className="text-black" />

                  <h3 className="font-semibold text-gray-700">
                    Phone
                  </h3>
                </div>

                <p className="text-gray-600">
                  {user.mobile_number}
                </p>
              </div>

              {/* Address */}
              <div className="bg-gray-50 p-5 rounded-xl border">
                <div className="flex items-center gap-3 mb-2">
                  <MapPin className="text-black" />

                  <h3 className="font-semibold text-gray-700">
                    Address
                  </h3>
                </div>

                <p className="text-gray-600">
                   {  "Bhopal, Madhya Pradesh"}
                </p>
              </div>

              {/* Joined */}
              <div className="bg-gray-50 p-5 rounded-xl border">
                <div className="flex items-center gap-3 mb-2">
                  <Calendar className="text-black" />

                  <h3 className="font-semibold text-gray-700">
                    Joined
                  </h3>
                </div>

                <p className="text-gray-600">
                  {new Date(
                    user.createdAt
                  ).toLocaleDateString()}
                </p>
              </div>
            </div>

            {/* Stats */}
            
            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4 mt-8">

              {/* Orders */}
              <button
                onClick={() => navigate("/orders")}
                className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition"
              >
                View Orders
              </button>

              {/* Logout */}
              <button
                onClick={logoutHandler}
                className="border border-black text-black px-6 py-3 rounded-lg hover:bg-black hover:text-white transition flex items-center gap-2"
              >
                <LogOut size={18} />
                Logout
              </button>

              {/* Delete */}
              <button
                onClick={deleteAccount}
                className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition flex items-center gap-2"
              >
                <Trash2 size={18} />
                Delete Account
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Myprofile;