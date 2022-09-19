import { createSlice } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { axiosBaseQuery } from "../../app/config/rtk_query.ts";

export const usePaymentsApi = createApi({
  reducerPath: "PaymentsApi",
  baseQuery: axiosBaseQuery({
    baseUrl: "/payement",
  }),
  endpoints: (builder) => ({
    getPayments: builder.query({
      query: (obj) => ({
        url: "/list",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetPaymentsQuery } = usePaymentsApi;
const initialState = {};

export const paymentSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      usePaymentsApi.endpoints.getPayments.matchFulfilled,
      (state, { payload }) => {}
    );
  },
});

export const { reducer } = paymentSlice;
