import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "../config/rtk_query.ts";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import jwt_decode from "jwt-decode";
export const useAuthApi = createApi({
  reducerPath: "AuthApi",
  baseQuery: axiosBaseQuery({
    baseUrl: "",
  }),

  endpoints: (builder) => ({
    login: builder.mutation({
      query: ({ username, password }) => ({
        url: "/login",
        method: "post",
        data: { username, password },
      }),
    }),
    register: builder.mutation({
      query: ({ username, password, confirmpassword }) => ({
        url: "/register",
        method: "post",
        data: { username, password, confirmpassword },
      }),
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation } = useAuthApi;

const initialState = {
  user: undefined,
  isAuthenticated: false,
  loginError: "",

  userAuthorizations: [],
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logOut: (state) => {
      state = initialState;
      localStorage.clear();

      return state;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      useAuthApi.endpoints.login.matchFulfilled,
      (state, action) => {
        const obj = jwt_decode(action.payload.id_token);
        localStorage.setItem("access_token", action.payload.id_token);
        console.log("authentification", obj);

        state.isAuthenticated = true;
        state.firstTime = false;
        state.user = obj.user;
        state.userAuthorizations = obj.auth.split(",");
      }
    );
    builder.addMatcher(
      useAuthApi.endpoints.login.matchRejected,
      (state, action) => {
        state.user = undefined;
        state.isAuthenticated = false;
        state.loginError = "Unvalid  username or password";
      }
    );
  },
});

export const { logOut } = authSlice.actions;
export const { reducer } = authSlice;
