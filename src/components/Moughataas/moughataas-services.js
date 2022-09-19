import { createSlice } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { axiosBaseQuery } from "../../app/config/rtk_query.ts";

export const useMoughataasApi = createApi({
  reducerPath: "MoughataasApi",
  baseQuery: axiosBaseQuery({
    baseUrl: "http://localhost:8080/moughataaa",
  }),
  endpoints: (builder) => ({
    getMoughataas: builder.query({
      query: (obj) => ({
        url: "/list",
        method: "GET",
      }),
    }),
    getMoughataaById: builder.query({
      query: (id) => {
       console.log("ID:", id)
       return {
        url: `/find/${id}`,
        method: 'GET'
       }
      }
     }),
    deleteMoughataa: builder.mutation({
      query: (id) => {
       console.log("Delete ID:", id)
       return {
        url: `/delete/${id}`,
        method: 'DELETE'
       }
      }
     }),
     createMoughataa: builder.mutation({
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

     updateMoughataa: builder.mutation({
      query: (updateMoughataaData) => {
       console.log("Update Post: ", updateMoughataaData)
      const { id, ...data } = updateMoughataaData
       //console.log("Actual Update Post: ", data)
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


    
  


export const { useGetMoughataasQuery,useGetMoughataaByIdQuery,useDeleteMoughataaMutation,useCreateMoughataaMutation,useUpdateMoughataaMutation}  = useMoughataasApi;
const initialState = {};

export const moughataasSlice = createSlice({
  name: "moughataas",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      useMoughataasApi.endpoints.getMoughataas.matchFulfilled,
      (state, { payload }) => {}
    );
  },
});

export const { reducer } = moughataasSlice;
