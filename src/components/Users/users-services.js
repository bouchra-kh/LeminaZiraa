import { createSlice } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { axiosBaseQuery } from "../../app/config/rtk_query.ts";

export const useUsersApi = createApi({
  reducerPath: "UsersApi",
  baseQuery: axiosBaseQuery({
    baseUrl: "http://localhost:8080",
  }),
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: (obj) => ({
        url: "/list",
        method: "GET",
      }),
    }),
    getUserById: builder.query({
      query: (id) => {
       console.log("ID:", id)
       return {
        url: `/find/${id}`,
        method: 'GET'
       }
      }
     }),
    deleteUser: builder.mutation({
      query: (id) => {
       console.log("Delete ID:", id)
       return {
        url: `/delete/${id}`,
        method: 'DELETE'
       }
      }
     }),
     createUser: builder.mutation({
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

     updateUser: builder.mutation({
      query: (updateUserData) => {
       console.log("Update Post: ", updateUserData)
      const { id, ...data } = updateUserData
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


  


export const { useGetUsersQuery,useGetUserByIdQuery,useDeleteUserMutation,useCreateUserMutation,useUpdateUserMutation} = useUsersApi;
const initialState = {};

export const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      useUsersApi.endpoints.getUsers.matchFulfilled,
      (state, { payload }) => {}
    );
  },
});

export const { reducer } = userSlice;
