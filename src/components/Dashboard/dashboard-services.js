import { createSlice } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { axiosBaseQuery } from "../../app/config/rtk_query.ts";

export const useDashboardApi = createApi({
  reducerPath: "DashboardApi",
  baseQuery: axiosBaseQuery({
    baseUrl: "http://localhost:8080/publication",
  }),
  endpoints: (builder) => ({
    // getMoughataas: builder.query({
    //   query: (obj) => ({
    //     url: "/list",
    //     method: "GET",
    //   }),
    // }),
    getDashboardById: builder.query({
      query: (id) => {
       console.log("ID:", id)
       return {
        url: `/listpublication/${id}`,
        method: 'GET'
       }
      }
     }),
    // deleteMoughataa: builder.mutation({
    //   query: (id) => {
    //    console.log("Delete ID:", id)
    //    return {
    //     url: `/delete/${id}`,
    //     method: 'DELETE'
    //    }
    //   }
    //  }),
    //  createMoughataa: builder.mutation({
    //   query: (newPost) => {
    //    console.log("Create Post: ", newPost)
    //    return {
    //     url: `/save`,
    //     method: 'POST',
    //    // body: newPost,
    //    data: newPost,
    //     headers: {
    //      'Content-type': 'application/json',
    //      'No-Auth':'True'
    //     }
    //    }
    //   }
    //  }),
    //  importMoughataa: builder.mutation({
    //   query: (newPost) => {
    //    console.log("Create Post: ", newPost)
    //    var fd = new FormData();
    //  fd.append('file', newPost,newPost.name);
     
    //    return {
    //     url: `/upload2`,
    //     method: 'POST',
    //    // body: newPost,
    //    data: fd,
    //     headers: {
    //      'Content-type': 'application/json',
    //      'No-Auth':'True'
    //     }
    //    }
    //   }
    //  }),
    //  updateMoughataa: builder.mutation({
    //   query: (updateMoughataaData) => {
    //    console.log("Update Post: ", updateMoughataaData)
    //   const { id, ...data } = updateMoughataaData
    //    //console.log("Actual Update Post: ", data)
    //    return {
    //     url: `/update/${id}`,
    //    // params: data,
    //     method: 'PUT',
    //     data: data,
    //     headers: {
    //      'Content-type': 'application/json; charset=UTF-8',
    //     }
    //    }
    //   }
    //  }),
     
  }),
  
 
});


    
  


export const {useGetDashboardByIdQuery}  = useDashboardApi;
const initialState = {};

export const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // builder.addMatcher(
    //   useMoughataasApi.endpoints.getMoughataas.matchFulfilled,
    //   (state, { payload }) => {}
    // );
  },
});

export const { reducer } = dashboardSlice;
