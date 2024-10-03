import React, { useState } from "react";
import { FaFacebookF, FaApple } from "react-icons/fa";
import { Button, Checkbox, FormControlLabel } from "@mui/material";
import { FcGoogle } from "react-icons/fc";
import toast, { Toaster } from "react-hot-toast";
import { logInApi } from "../../services/webflowServices";
import { setItemLocalStorage,setToken } from "@/utils/browserSetting";

const SignInPopup = ({ isOpen, onClose, openSignUpForm, closeLoginPopup }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      setError("All fields are required.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await logInApi({
        email: formData.email,
        password: formData.password,
      });

      if (response?.data?.status) {
        setItemLocalStorage("name", response?.data?.data?.user?.name.first);
        setItemLocalStorage("id", response?.data?.data?.user?._id);
        setItemLocalStorage("role", response?.data?.data?.user?.role);
        setToken(response?.data?.data?.token);
        toast.success(response?.data?.message);
        onClose(); // Close SignInPopup
        closeLoginPopup(); // Close LoginPopup
      } else {
        toast.error(response.data.message || "An error occurred.");
      }
    } catch (error) {
      setError(
        error.response?.data?.message || "An error occurred, please try again."
      );
      console.error("Login error:", error.response);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <Toaster position="top-center" />
      <div className="bg-white rounded-2xl w-[90%] max-w-md p-5 font-manrope">
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="text-black hover:text-gray-600 transition duration-150"
          >
            ✕
          </button>
        </div>
        <div className="flex flex-col justify-center items-center">
          <span className="text-[#40E0D0] flex text-2xl font-extrabold mb-2">
            Mix<p className="text-black text-2xl font-extrabold ">Dorm</p>
          </span>
        </div>
        <form onSubmit={handleSignIn} className="mx-8">
          <h2 className="text-xl font-bold text-gray-800 mb-6 text-center">
            👋 Login In Your Account
          </h2>

          <div className="mb-5">
            {/* <label
              htmlFor="email"
              className="text-base block font-semibold text-gray-700"
            >
              Email
            </label> */}
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-4 border rounded-xl focus:outline-none focus:ring-1 focus:ring-teal-500 text-black text-sm placeholder:text-gray-500"
              placeholder="Email"
            />
          </div>
          <div className="mb-5">
            {/* <label
              htmlFor="password"
              className="text-base block font-semibold text-gray-700"
            >
              Password
            </label> */}
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-3 py-4 border rounded-xl focus:outline-none focus:ring-1 focus:ring-teal-500 text-black text-sm placeholder:text-gray-500"
              placeholder="Password"
            />
          </div>
          <div className="flex justify-between items-center mb-6">
            <FormControlLabel
              control={
                <Checkbox
                  className="text-sm"
                  sx={{
                    color: "rgba(0,0,0,0.4)", // blue-800 color from Tailwind
                    "&.Mui-checked": {
                      color: "#40E0D0", // blue-800 when checked
                    },
                  }}
                />
              }
              label={<span className="text-sm">Remember me</span>}
            />

            <a
              href="/forgot-password"
              className="text-[#40E0D0] font-medium ml-1 cursor-pointer"
            >
              Forgot password?
            </a>
          </div>
          <button
            type="submit"
            className="w-full my-3 bg-[#40E0D0] font-semibold  text-white py-4 rounded-4xl hover:bg-teal-500 transition duration-200"
            disabled={loading}
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>
          {error && (
            <div className="mb-4 text-center text-red-600">{error}</div>
          )}
        </form>
        <div className="flex items-center justify-center mx-8 space-x-4 my-8">
          <span className="flex-1 border-t border-gray-200"></span>
          <span className="text-gray-600">Or</span>
          <span className="flex-1 border-t border-gray-200"></span>
        </div>

        <div className="flex items-center gap-x-4 justify-center mb-6">
          <Button className="min-w-0 p-0 text-3xl">
            <FaFacebookF />
          </Button>
          <Button className="min-w-0 p-0 text-3xl">
            <FcGoogle />
          </Button>
          <Button className="min-w-0 p-0 text-3xl text-black">
            <FaApple />
          </Button>
        </div>
        <h4 className="text-basec text-center text-sm text-gray-400">
          Don't have an account?
          <a
            className="text-[#40E0D0] font-medium ml-1 cursor-pointer"
            onClick={openSignUpForm}
          >
            Sign Up
          </a>
        </h4>
      </div>
    </div>
  );
};

export default SignInPopup;
