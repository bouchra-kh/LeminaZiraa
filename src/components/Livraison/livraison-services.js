import { createSlice } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { axiosBaseQuery } from "../../app/config/rtk_query.ts";

export const useLivraisonsApi = createApi({
  reducerPath: "LivraisonsApi",
  baseQuery: axiosBaseQuery({
    baseUrl: "/livraison",
  }),
  endpoints: (builder) => ({
    getLivraisons: builder.query({
      query: (obj) => ({
        url: "/",
        method: "GET",
      }),
    }),
    createLivraisons: builder.mutation({
      query: (obj) => ({
        url: "/save",
        method: "POST",
        data: obj,
      }),
    }),
    findLivraisons: builder.query({
      query: (id) => ({
        url: `/save/${id}`,
        method: "GET",
      }),
    }),
    deleteLivraisons: builder.query({
      query: (id) => ({
        url: `/delete/${id}`,
        method: "DELETE",
      }),
    }),
    updateLivraisons: builder.mutation({
      query: (obj) => ({
        url: `/update/${obj.id}`,
        method: "PUT",
        data: obj,
      }),
    }),
  }),
});

export const {
  useGetLivraisonsQuery,
  useCreateLivraisonsMutation,
  useDeleteLivraisonsQuery,
  useFindLivraisonsQuery,
  useUpdateLivraisonsMutation,
} = useLivraisonsApi;
const initialState = {};

export const livraisonSlice = createSlice({
  name: "livraison",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      useLivraisonsApi.endpoints.getLivraisons.matchFulfilled,
      (state, { payload }) => {}
    );
  },
});

export const { reducer } = livraisonSlice;
