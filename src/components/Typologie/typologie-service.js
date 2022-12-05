import { createSlice } from "@reduxjs/toolkit";
import { createApi, } from "@reduxjs/toolkit/query/react";

import { axiosBaseQuery } from "../../app/config/rtk_query.ts";

export const useTypologiesApi = createApi({
  reducerPath: "TypologiesApi",
  baseQuery: axiosBaseQuery({
    baseUrl: "http://localhost:8080/Typologie",
  }),
  endpoints: (builder) => ({
    getTypologies: builder.query({
      query: (obj) => ({
        url: "/list",
        method: "GET",
      }),

    }),
    getTypologieById: builder.query({
      query: (id) => {
       console.log("ID:", id)
       return {
        url: `/find/${id}`,
        method: 'GET'
       }
      }
     }),
    deleteTypologie: builder.mutation({
      query: (id) => {
       console.log("Delete ID:", id)
       return {
        url: `/delete/${id}`,
        method: 'DELETE'
       }
      }
     }),
     createTypologie: builder.mutation({
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
     importTypologie: builder.mutation({
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
     updateTypologie: builder.mutation({
      query: (updateTypologieData) => {
       console.log("Update Post: ", updateTypologieData)
      const { id, ...data } = updateTypologieData
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

export const { useGetTypologiesQuery,useGetTypologieByIdQuery,useDeleteTypologieMutation,useCreateTypologieMutation,useImportTypologieMutation,useUpdateTypologieMutation} = useTypologiesApi;
const initialState = {};

export const TypologieSlice = createSlice({
  name: "Typologie",
  initialState,
  reducers: {
    // deleteTypologie: (state, action) => {
    //  console.log("staaaa",state.value);
    //   console.log("payloaddd",action.payload);
    // },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      useTypologiesApi.endpoints.getTypologies.matchFulfilled,
      (state, { payload }) => {

        state.isLoading = true;
        state.hasError = false;
        console.log("state"+state);
      },
    );
  },

});


export const { reducer } =TypologieSlice;

