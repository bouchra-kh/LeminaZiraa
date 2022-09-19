import { createSlice } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { axiosBaseQuery } from "../../app/config/rtk_query.ts";

export const useCommandesApi = createApi({
  reducerPath: "CommandesApi",
  baseQuery: axiosBaseQuery({
    baseUrl: "/commande",
  }),
  endpoints: (builder) => ({
    getCommandes: builder.query({
      query: (obj) => ({
        url: "/list",
        method: "GET",
      }),
    }),

    createCommandes: builder.mutation({
      query: (obj) => ({
        url: "/save",
        method: "POST",
        data: obj,
      }),
    }),
    findCommandes: builder.query({
      query: (id) => ({
        url: `/save/${id}`,
        method: "GET",
      }),
    }),
    deleteCommandes: builder.query({
      query: (id) => ({
        url: `/delete/${id}`,
        method: "DELETE",
      }),
    }),
    updateCommandes: builder.mutation({
      query: (obj) => ({
        url: `/update/${obj.id}`,
        method: "PUT",
        data: obj,
      }),
    }),
  }),
});

export const {
  useGetCommandesQuery,
  useCreateCommandesMutation,
  useDeleteCommandesQuery,
  useUpdateCommandesMutation,
  useFindCommandesQuery,
} = useCommandesApi;
const initialState = {};

export const commandeSlice = createSlice({
  name: "commandes",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      useCommandesApi.endpoints.getCommandes.matchFulfilled,
      (state, { payload }) => {}
    );
  },
});

export const { reducer } = commandeSlice;
