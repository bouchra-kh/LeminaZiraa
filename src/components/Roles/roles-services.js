import { createSlice } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { axiosBaseQuery } from "../../app/config/rtk_query.ts";

export const useRolesApi = createApi({
  reducerPath: "RolesApi",
  baseQuery: axiosBaseQuery({
    baseUrl: "http://localhost:8080/role",
  }),
  endpoints: (builder) => ({
    getRoles: builder.query({
      query: (obj) => ({
        url: "/list",
        method: "GET",
      }),
    }),
    createrole: builder.mutation({
      query: (newPost) => {
       console.log("Create Post: ", newPost)
       return {
        url: `/save`,
        method: 'POST',
       // body: newPost,
       data: newPost,
        headers: {
         'Content-type': 'application/json',
         'No-Auth':'True'
        }
       }
      }
     }),
  }),
});

export const { useGetRolesQuery ,useCreateroleMutation} = useRolesApi;
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
