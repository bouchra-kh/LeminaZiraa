import { createSlice } from "@reduxjs/toolkit";
import { createApi, } from "@reduxjs/toolkit/query/react";

import { axiosBaseQuery } from "../../app/config/rtk_query.ts";

export const useWilayasApi = createApi({
  reducerPath: "WilayasApi",
  baseQuery: axiosBaseQuery({
    baseUrl: "http://localhost:8080/wilaya",
  }),
  endpoints: (builder) => ({
    getWilayas: builder.query({
      query: (obj) => ({
        url: "/list",
        method: "GET",
      }),
    }),
    getWilayaById: builder.query({
      query: (id) => {
       console.log("ID:", id)
       return {
        url: `/find/${id}`,
        method: 'GET'
       }
      }
     }),
    deleteWilaya: builder.mutation({
      query: (id) => {
       console.log("Delete ID:", id)
       return {
        url: `/delete/${id}`,
        method: 'DELETE'
       }
      }
     }),
     createWilaya: builder.mutation({
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

     updateWilaya: builder.mutation({
      query: (updateWilayaData) => {
       console.log("Update Post: ", updateWilayaData)
      const { id, ...data } = updateWilayaData
       console.log("Actual Update Post: ", data)
       return {
        url: `/update/${id}`,
       // params: data,
        method: 'PUT',
        data: data,
        headers: {
         'Content-type': 'application/json; charset=UTF-8',
        }
       }
      }
     }),
     
  }),
  
 
});

export const { useGetWilayasQuery,useGetWilayaByIdQuery,useDeleteWilayaMutation,useCreateWilayaMutation,useUpdateWilayaMutation} = useWilayasApi;
const initialState = {};

export const wilayaSlice = createSlice({
  name: "wilaya",
  initialState,
  reducers: {
    // deleteWilaya: (state, action) => {
    //  console.log("staaaa",state.value);
    //   console.log("payloaddd",action.payload);
    // },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      useWilayasApi.endpoints.getWilayas.matchFulfilled,
      (state, { payload }) => {

        state.isLoading = true;
        state.hasError = false;
        console.log("state"+state);
      }
    );
  },
});


export const { reducer } =wilayaSlice;

