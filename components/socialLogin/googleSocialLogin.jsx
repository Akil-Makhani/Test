import React from "react";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { setToken, setItemLocalStorage } from "../../utils/browserSetting";
import { BASE_URL } from "../../utils/api";
import { toast } from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import { Button } from "@mui/material";
import { useRouter } from "next/router";

const GoogleSocialLogin = ({ role ,closeLoginPopup }) => {
  const router = useRouter();

  const fetchGoogleUserProfile = async (access_token) => {
    try {
      const res = await axios.get('https://www.googleapis.com/oauth2/v3/userinfo', {
        headers: {
          Authorization: `Bearer ${access_token}`,  
        },
      });

      return res.data;
    } catch (error) {
      toast.error("Failed to fetch user profile: " + error.message);
      throw error;
    }
  };

  const handleGoogleSuccess = async (tokenResponse) => {
    const { access_token } = tokenResponse;

    try {
      const userProfile = await fetchGoogleUserProfile(access_token);


      const { name, email } = userProfile; 
      
      const [firstName, lastName] = name.split(' ');

      const res = await axios.post(`${BASE_URL}/auth/social/login`, {
        token: access_token,
        role: role,
        name: {
          first: firstName,
          last: lastName || '', 
        },
        email: email, 
      });

      if (res.status === 201 && res.data.status) {
        toast.success("Login successful!");

        setItemLocalStorage("name", `${res?.data?.data?.user?.name?.first} ${res?.data?.data?.user?.name?.last}`);
        setItemLocalStorage("role", res?.data?.data?.user?.role);
        setToken(res?.data?.data?.token);
        
        if(role === "hostel_owner")
        {
          router.push("/list");
        }
        else
        {
          closeLoginPopup();
        }
      } else {
        toast.error("Social login failed: " + res.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data.message || error.message);
    }
  };

  const login = useGoogleLogin({
    onSuccess: handleGoogleSuccess,
    onError: (error) => toast.error("Google login failed: " + error),
  });

  return (
    <Button className="min-w-0 p-0 text-3xl" onClick={() => login()}>
      <FcGoogle />
    </Button>
  );
};

export default GoogleSocialLogin;
