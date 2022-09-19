import { createSlice } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { axiosBaseQuery } from "../../app/config/rtk_query.ts";

export const useProduitsApi = createApi({
  reducerPath: "ProduitsApi",
  baseQuery: axiosBaseQuery({
    baseUrl: "/produit",
  }),
  endpoints: (builder) => ({
    getProduits: builder.query({
      query: (obj) => ({
        url: "/list",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetProduitsQuery } = useProduitsApi;
const initialState = {};

export const produitSlice = createSlice({
  name: "produits",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      useProduitsApi.endpoints.getProduits.matchFulfilled,
      (state, { payload }) => {}
    );
  },
});

export const { reducer } = produitSlice;
