import { BaseQueryFn, createApi } from "@reduxjs/toolkit/query/react";
import axios, { AxiosRequestConfig, AxiosError } from "axios";
export const axiosBaseQuery =
  (
    { baseUrl }: { baseUrl: string } = { baseUrl: "http://127.0.0.1:8000/" }
  ): BaseQueryFn<
    {
      url: string;
      method: AxiosRequestConfig["method"];
      data?: AxiosRequestConfig["data"];
      params?: AxiosRequestConfig["params"];
    },
    unknown,
    unknown
  > =>
  async ({ url, method, data, params }) => {
    try {
      const result = await axios({ url: baseUrl + url, method, data, params });
      return { data: result.data };
    } catch (axiosError) {
      let err = axiosError as AxiosError;
      return {
        error: {
          status: err.response?.status,
          data: err.response?.data || err.message,
          err:err
        },
      };
    }
  };
  axios.interceptors.request.use(
    (config) => {
    //   const accessToken = localStorage.getItem("access_token");
     
  
      config.headers = {
        // 'Access-Control-Allow-Origin': '*'
        // Authorization: `Bearer ${accessToken}`,
        // Accept: 'application/json',
      };
      return config;
    },
    (error) => {
      Promise.reject(error);
    },
  );