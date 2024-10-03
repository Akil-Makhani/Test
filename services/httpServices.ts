import { AxiosResponse } from 'axios';
import axiosInstance from './axios';

const httpServices = {
  async get<T>(endpoint: string): Promise<AxiosResponse<T>> {
    const response: AxiosResponse<T> = await axiosInstance.get<T>(
      `${endpoint}`,
    );
    return response;
  },

  async post<T>(
    endpoint: string,
    data: T,
    progress?: any,
  ): Promise<AxiosResponse<T>> {
    const response: AxiosResponse<T> = await axiosInstance.post<T>(
      `${endpoint}`,
      data,
      progress,
    );
    console.log('endpoint', endpoint);
    return response;
  },

  async put<T, D>(endpoint: string, data: D): Promise<AxiosResponse<T>> {
    const response: AxiosResponse<T> = await axiosInstance.put<T>(
      `${endpoint}`,
      data,
    );
    return response;
  },

  async patch<T, D>(endpoint: string, data: D): Promise<AxiosResponse<T>> {
    const response: AxiosResponse<T> = await axiosInstance.patch<T>(
      `${endpoint}`,
      data,
    );
    return response;
  },

  async delete<T>(endpoint: string): Promise<AxiosResponse<T>> {
    const response: AxiosResponse<T> = await axiosInstance.delete<T>(
      `${endpoint}`,
    );
    return response;
  },
};

export default httpServices;
