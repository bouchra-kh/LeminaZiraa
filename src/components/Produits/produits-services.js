import { createSlice } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ADMIN,CONSEILLER_AGRICOLE,AGRIGULTEUR,UserHasAccess ,getUser} from "../extends/GlobalFunctions";

import { axiosBaseQuery } from "../../app/config/rtk_query.ts";

export const useProduitsApi = createApi({
  reducerPath: "ProduitsApi",
  baseQuery: axiosBaseQuery({
    baseUrl: "http://localhost:8080/produit",
  }),
  
  endpoints: (builder) => ({
    getProduits: builder.query({
      query:UserHasAccess(AGRIGULTEUR)?(obj) => ({
        url: `/listproduitagriculture/${getUser().id}`,
        method: "GET",
      }): (obj) => ({
        url: "/list",
        method: "GET",
      }),
    }),
    createproduit: builder.mutation({
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
  }),
});

export const { useGetProduitsQuery ,useCreateproduitMutation} = useProduitsApi;
const initialState = {};

export const produitSlice = createSlice({
  name: "produits",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      useProduitsApi.endpoints.getProduits.matchFulfilled,
      (state, { payload }) => {}
    );
  },
});

export const { reducer } = produitSlice;
