import React, { useState, useContext, useEffect } from "react";
import { Shopcontext } from "../Context/Shopcontext";
import { toast } from "react-toastify";
import axios from "axios";

const Login = () => {
  const [currentstate, setcurrentstate] = useState("Login"); // Login / Sign Up
  const { setToken, Token, navigate, backendURL } = useContext(Shopcontext);

  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [contact, setcontact] = useState("");
  const [loading, setLoading] = useState(false);

  // Redirect if already logged in
  useEffect(() => {
    if (Token) navigate("/");
  }, [Token]);

  const onSubmitHandler = async (event) => {
  event.preventDefault();

  if (!email || !password || (currentstate === "Sign Up" && (!name || !contact))) {
    toast.error("Please fill all required fields");
    return;
  }

  setLoading(true);

  try {
    let response;

    if (currentstate === "Login") {
      response = await axios.post(`${backendURL}/api/user/login`, { email, password });

    } else {
      response = await axios.post(`${backendURL}/api/user/register`, { name, email, password, contact });
    }

    if (response.data.success) {
      setToken(response.data.token);
      localStorage.setItem("token", response.data.token);
      if (response.data.user?._id) localStorage.setItem("userId", response.data.user._id);

      toast.success(response.data.message);
      // Clear form
      setname(""); setemail(""); setpassword(""); setcontact("");
      navigate("/");
    } else {
      toast.error(response.data.message);

    }
  } catch (err) {
    console.error("Axios error:", err.response || err);
    toast.error(err.data.message);

  } finally {
    setLoading(false);
  }
};

  return (
    <form
  onSubmit={onSubmitHandler}
  className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-5 text-gray-800"
>
  <div className="inline-flex items-center gap-2 mb-2 mt-10">
    <p className="prata-regular text-4xl sm:text-5xl">
      {currentstate}
    </p>
    <hr className="border-none h-[2px] w-10 bg-gray-800" />
  </div>

  {currentstate === "Sign Up" && (
    <>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setname(e.target.value)}
        className="w-full px-4 py-3 border border-gray-800 text-base sm:text-lg"
        required
      />
      <input
        type="text"
        placeholder="Contact Number"
        value={contact}
        onChange={(e) => setcontact(e.target.value)}
        className="w-full px-4 py-3 border border-gray-800 text-base sm:text-lg"
        required
      />
    </>
  )}

  <input
    type="email"
    placeholder="Email"
    value={email}
    onChange={(e) => setemail(e.target.value)}
    className="w-full px-4 py-3 border border-gray-800 text-base sm:text-lg"
    required
  />

  <input
    type="password"
    placeholder="Password"
    value={password}
    onChange={(e) => setpassword(e.target.value)}
    className="w-full px-4 py-3 border border-gray-800 text-base sm:text-lg"
    required
  />

  <div className="w-full flex justify-between text-base sm:text-lg mt-[-6px]">
  <p
  className="cursor-pointer"
  onClick={() => navigate("/forgot-password")}
>
  Forgot your Password?
</p>

    {currentstate === "Login" ? (
      <p
        className="cursor-pointer text-blue-600 hover:underline"
        onClick={() => setcurrentstate("Sign Up")}
      >
        Create account
      </p>
    ) : (
      <p
        className="cursor-pointer text-blue-600 hover:underline"
        onClick={() => setcurrentstate("Login")}
      >
        Login Here
      </p>
    )}
  </div>

  <button
    disabled={loading}
    className="bg-black text-white text-base sm:text-lg font-light px-10 py-3 mt-4"
  >
    {loading
      ? "Please wait..."
      : currentstate === "Login"
      ? "Sign In"
      : "Sign Up"}
  </button>
</form>
  );
};

export default Login;