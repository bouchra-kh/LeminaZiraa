import { createSlice } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { axiosBaseQuery } from "../../app/config/rtk_query.ts";

export const usepublicationsApi = createApi({
  reducerPath: "PublicationsApi",
  baseQuery: axiosBaseQuery({
    baseUrl: "http://localhost:8080/publication",
  }),
  endpoints: (builder) => ({
    getPublications: builder.query({
      query: (obj) => ({
        url: "/list",
        method: "GET",
      }),


    }),
    getpublicationById: builder.query({
      query: (id) => {
       console.log("ID:", id)
       return {
        url: `/find/${id}`,
        method: 'GET'
       }
      }
     }),
  
  deletepublication: builder.mutation({
    query: (id) => {
     console.log("Delete ID:", id)
     return {
      url: `/delete/${id}`,
      method: 'DELETE'
     }
    }
   }),
   createpublication: builder.mutation({
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

   updatepublication: builder.mutation({
    query: (updatepublicationData) => {
     console.log("Update Post: ", updatepublicationData)
    const { id, ...data } = updatepublicationData
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


export const { useGetPublicationsQuery,useDeletepublicationMutation,useCreatepublicationMutation,useUpdatepublicationMutation}  = usepublicationsApi;


const initialState = {};

export const publicationSlice = createSlice({
  name: "publication",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      usepublicationsApi.endpoints.getPublications.matchFulfilled,
      (state, { payload }) => {}
    );
  },
});

export const { reducer } = publicationSlice;
