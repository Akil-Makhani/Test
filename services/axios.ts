import axios from 'axios';
import { BASE_URL } from "@/utils/api";
import { clearLocalStorage, getItemLocalStorage } from "@/utils/browserSetting";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

axiosInstance.interceptors.request.use(async (config: any) => {
  const token: string | null = getItemLocalStorage('token');
  if (token) {
    config.headers = {
      Authorization: `Bearer ${token}`,
      'Access-Control-Allow-Origin': '*',
      // "Access-Control-Allow-Headers": 'application/json',
      
    };
   
  }
  return config;
});

axiosInstance.interceptors.response.use(undefined, (error: any) => {
  if (error.message === 'Network Error' && !error.response) {
    console.log('Network error - make sure API is running!');
  }
  if (error.response) {
    const { status } = error.response;
    if (status === 404) {
      console.log('Not Found');
    }
    if (status === 401) {
      if (typeof window !== 'undefined' && window.location) {
        window.location.href = '/';
        clearLocalStorage();
        console.log('Your session has expired, please login again');
      }
    }
    return error.response;
  }

  console.log(error);
  return error;
});

export default axiosInstance;
