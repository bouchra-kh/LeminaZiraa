import { createSlice } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { axiosBaseQuery } from "../../app/config/rtk_query.ts";

export const useRolesApi = createApi({
  reducerPath: "RolesApi",
  baseQuery: axiosBaseQuery({
    baseUrl: "/role",
  }),
  endpoints: (builder) => ({
    getRoles: builder.query({
      query: (obj) => ({
        url: "/list",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetRolesQuery } = useRolesApi;
const initialState = {};

export const roleSlice = createSlice({
  name: "roles",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      useRolesApi.endpoints.getRoles.matchFulfilled,
      (state, { payload }) => {}
    );
  },
});

export const { reducer } = roleSlice;
