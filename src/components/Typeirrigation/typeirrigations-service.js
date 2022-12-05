import { createSlice } from "@reduxjs/toolkit";
import { createApi, } from "@reduxjs/toolkit/query/react";

import { axiosBaseQuery } from "../../app/config/rtk_query.ts";

export const useTypeirrigationsApi = createApi({
  reducerPath: "TypeirrigationsApi",
  baseQuery: axiosBaseQuery({
    baseUrl: "http://localhost:8080/Typeirrigation",
  }),
  endpoints: (builder) => ({
    getTypeirrigations: builder.query({
      query: (obj) => ({
        url: "/list",
        method: "GET",
      }),

    }),
    getTypeirrigationById: builder.query({
      query: (id) => {
       console.log("ID:", id)
       return {
        url: `/find/${id}`,
        method: 'GET'
       }
      }
     }),
    deleteTypeirrigation: builder.mutation({
      query: (id) => {
       console.log("Delete ID:", id)
       return {
        url: `/delete/${id}`,
        method: 'DELETE'
       }
      }
     }),
     createTypeirrigation: builder.mutation({
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
     importTypeirrigation: builder.mutation({
      query: (newPost) => {
       console.log("Create Post: ", newPost)
       var fd = new FormData();
     fd.append('file', newPost,newPost.name);
     
       return {
        url: `/upload`,
        method: 'POST',
       // body: newPost,
       data: fd,
        headers: {
         'Content-type': 'application/json',
         'No-Auth':'True'
        }
       }
      }
     }),
     updateTypeirrigation: builder.mutation({
      query: (updateTypeirrigationData) => {
       console.log("Update Post: ", updateTypeirrigationData)
      const { id, ...data } = updateTypeirrigationData
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
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
    refetchOnFocus: true,
    refetchOnMount: true,
  
 
});

export const { useGetTypeirrigationsQuery,useGetTypeirrigationByIdQuery,useDeleteTypeirrigationMutation,useCreateTypeirrigationMutation,useImportTypeirrigationMutation,useUpdateTypeirrigationMutation} = useTypeirrigationsApi;
const initialState = {};

export const TypeirrigationSlice = createSlice({
  name: "Typeirrigation",
  initialState,
  reducers: {
    // deleteTypeirrigation: (state, action) => {
    //  console.log("staaaa",state.value);
    //   console.log("payloaddd",action.payload);
    // },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      useTypeirrigationsApi.endpoints.getTypeirrigations.matchFulfilled,
      (state, { payload }) => {

        state.isLoading = true;
        state.hasError = false;
        console.log("state"+state);
      },
    );
  },

});


export const { reducer } =TypeirrigationSlice;

