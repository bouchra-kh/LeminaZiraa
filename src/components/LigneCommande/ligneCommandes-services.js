import { createSlice } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { axiosBaseQuery } from "../../app/config/rtk_query.ts";

export const useLigneCommandesApi = createApi({
  reducerPath: "LigneCommandesApi",
  baseQuery: axiosBaseQuery({
    baseUrl: "/lignecommande",
  }),
  endpoints: (builder) => ({
    getLigneCommandes: builder.query({
      query: (obj) => ({
        url: "/list",
        method: "GET",
      }),
    }),
    createLigneCommandes: builder.mutation({
      query: (obj) => ({
        url: "/save",
        method: "POST",
        data: obj,
      }),
    }),
    findLigneCommandes: builder.query({
      query: (id) => ({
        url: `/save/${id}`,
        method: "GET",
      }),
    }),
    deleteLigneCommandes: builder.query({
      query: (id) => ({
        url: `/delete/${id}`,
        method: "DELETE",
      }),
    }),
    updateLigneCommandes: builder.mutation({
      query: (obj) => ({
        url: `/update/${obj.id}`,
        method: "PUT",
        data: obj,
      }),
    }),
  }),
});

export const {
  useGetLigneCommandesQuery,
  useCreateLigneCommandesMutation,
  useDeleteLigneCommandesQuery,
  useFindLigneCommandesQuery,
  useUpdateLigneCommandesMutation,
} = useLigneCommandesApi;
const initialState = {};

export const LigneCommandesSlice = createSlice({
  name: "LigneCommandes",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      useLigneCommandesApi.endpoints.getLigneCommandes.matchFulfilled,
      (state, { payload }) => {}
    );
  },
});

export const { reducer } = LigneCommandesSlice;
