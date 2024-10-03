import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { registerApi } from "../../services/webflowServices";
import { Button } from "@mui/material";
import { FaApple, FaFacebookF } from "react-icons/fa";
import { GoogleOAuthProvider } from "@react-oauth/google";
import axios from "axios";
import AppleLogin from "react-apple-login";
import { FacebookProvider, LoginButton } from "react-facebook";
import SignInPopup from "./signinPopup";
import GoogleSocialLogin from "../socialLogin/googleSocialLogin";
import { BASE_URL } from "@/utils/api";
import { setItemLocalStorage, setToken } from "@/utils/browserSetting";
import { useRouter } from "next/router";

const LoginPopup = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    fullname: "",
    phoneNumber: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isSignInOpen, setIsSignInOpen] = useState(false); // State for sign-in popup
  const router = useRouter();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    if (
      !formData.email ||
      !formData.password ||
      !formData.fullname ||
      !formData.phoneNumber
    ) {
      setError("All fields are required.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await registerApi({
        name: formData?.fullname,
        email: formData?.email,
        password: formData?.password,
        contact: formData?.phoneNumber,
      });

      if (response?.data?.status) {
        toast.success(response?.data?.message || "Registration successful!");
        setFormData({
          fullname: "",
          phoneNumber: "",
          email: "",
          password: "",
        });
        router.push("/verifyOtp");
        onClose(); // Close LoginPopup
      } else {
        toast.error(
          response?.data?.message || "Something went wrong, please try again."
        );
      }
    } catch (error) {
      setError(
        error.response?.data?.message || "An error occurred, please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const openSignInForm = () => {
    setIsSignInOpen(true);
  };

  const handleFacebookSuccess = async (response) => {
    try {
      const { accessToken } = response.authResponse;

      // Manually fetch user profile from Facebook using the access token
      const profileRes = await axios.get(
        `https://graph.facebook.com/me?fields=name,email&access_token=${accessToken}`
      );

      const { name, email } = profileRes.data;

      const res = await axios.post(`${BASE_URL}/auth/social/login`, {
        token: accessToken,
        role: "user",
        email,
        name,
      });

      if (res.status === 201 && res.data.status) {
        toast.success("Login successful!");

        setItemLocalStorage("name", name);
        setItemLocalStorage("role", res?.data?.data?.user?.role);
        setToken(res?.data?.data?.token);
        onClose();
      } else {
        toast.error("Social login failed: " + res.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data.message || error.message);
    }
  };

  const handleFacebookFailure = (error) => {
    toast.error("Facebook login failed: " + error.message);
  };

  const handleAppleSuccess = async (response) => {
    try {
      const { authorization, user } = response;

      const { id_token } = authorization;

      const name = user?.name
        ? `${user.name.firstName} ${user.name.lastName}`
        : null;
      const email = user?.email || null;

      const res = await axios.post(`${BASE_URL}/auth/social/login`, {
        token: id_token,
        role: "user",
        provider: "apple",
        name: name,
        email: email,
      });

      if (res.status === 201 && res.data.status) {
        toast.success("Login successful!");

        setItemLocalStorage(
          "name",
          name ||
            `${res.data.data.user.name.first} ${res.data.data.user.name.last}`
        );
        setItemLocalStorage("role", res?.data?.data?.user?.role);
        setToken(res?.data?.data?.token);

        router.push("/list");
      } else {
        toast.error("Social login failed: " + res.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data.message || error.message);
    }
  };

  const handleAppleFailure = (response) => {
    toast.error("Apple login failed: " + response.error);
  };

  if (!isOpen) return null;

  return (
    <>
      <Toaster position="top-center" />
      {!isSignInOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white rounded-2xl w-[95%] max-w-2xl p-5 font-manrope">
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
            <form onSubmit={handleSignup} className="mx-8">
              <h2 className="text-xl font-bold text-gray-800 mb-4 text-center">
                👋 Sign up your Account
              </h2>

              <div className="mb-5">
                {/* <label
                htmlFor="fullname"
                className="text-base block font-semibold text-gray-700"
              >
                Full Name
              </label> */}
                <input
                  type="text"
                  id="fullname"
                  name="fullname"
                  value={formData.fullname}
                  onChange={handleChange}
                  className="w-full px-3 py-4 border rounded-xl focus:outline-none focus:ring-1 focus:ring-teal-500 text-black text-sm placeholder:text-gray-500"
                  placeholder="Full Name"
                />
              </div>
              <div className="mb-5">
                {/* <label
                htmlFor="phoneNumber"
                className="text-base block font-semibold text-gray-700"
              >
                Phone Number
              </label> */}
                <input
                  type="text"
                  id="phoneNumber"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  className="w-full px-3 py-4 border rounded-xl focus:outline-none focus:ring-1 focus:ring-teal-500 text-black text-sm placeholder:text-gray-500"
                  placeholder="Phone Number"
                />
              </div>
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
              <div className="mb-8">
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
              <button
                type="submit"
                className="w-full bg-[#40E0D0] font-semibold text-white py-4 rounded-full hover:bg-[#40E0D0] transition duration-200"
                disabled={loading}
              >
                {loading ? "Signing up..." : "Sign up"}
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
              <FacebookProvider appId={process.env.NEXT_PUBLIC_FACEBOOK_APP_ID}>
                <LoginButton
                  scope="public_profile,email"
                  onSuccess={handleFacebookSuccess}
                  onError={handleFacebookFailure}
                  className="min-w-0 p-0 text-3xl"
                >
                  <FaFacebookF />
                </LoginButton>
              </FacebookProvider>
              <GoogleOAuthProvider
                clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}
              >
                <GoogleSocialLogin role="user" closeLoginPopup={onClose} />
              </GoogleOAuthProvider>

              <AppleLogin
                clientId={process.env.NEXT_PUBLIC_APPLE_CLIENT_ID}
                redirectURI={process.env.NEXT_PUBLIC_APPLE_REDIRECT_URI}
                responseType="code id_token"
                scope="name email"
                render={(renderProps) => (
                  <Button
                    className="min-w-0 p-0 text-3xl text-black"
                    onClick={renderProps.onClick}
                  >
                    <FaApple />
                  </Button>
                )}
                onSuccess={handleAppleSuccess}
                onError={handleAppleFailure}
              />
            </div>
            <h4 className="text-basec text-center text-sm text-gray-400">
              Already have an account?
              <a
                className="text-primary-blue font-medium ml-1 cursor-pointer "
                onClick={openSignInForm}
              >
                Sign In
              </a>
            </h4>
          </div>
        </div>
      )}

      <SignInPopup
        isOpen={isSignInOpen}
        onClose={() => setIsSignInOpen(false)}
        openSignUpForm={() => setIsSignInOpen(false)}
        closeLoginPopup={onClose}
      />
    </>
  );
};

export default LoginPopup;
