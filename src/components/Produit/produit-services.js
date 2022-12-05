// import { createSlice } from "@reduxjs/toolkit";
// import { createApi, } from "@reduxjs/toolkit/query/react";

// import { axiosBaseQuery } from "../../app/config/rtk_query.ts";

// export const useProduitApi = createApi({
//   reducerPath: "ProduitApi",
//   baseQuery: axiosBaseQuery({
//     baseUrl: "http://localhost:8080/produit",
//   }),
//   endpoints: (builder) => ({
//     getProduit: builder.query({
//       query: (obj) => ({
//         url: "/list",
//         method: "GET",
//       }),

//     }),
//     getProduitById: builder.query({
//       query: (id) => {
//        console.log("ID:", id)
//        return {
//         url: `/find/${id}`,
//         method: 'GET'
//        }
//       }
//      }),
//     deleteProduit: builder.mutation({
//       query: (id) => {
//        console.log("Delete ID:", id)
//        return {
//         url: `/delete/${id}`,
//         method: 'DELETE'
//        }
//       }
//      }),
//      createProduit: builder.mutation({
//       query: (newPost) => {
//        console.log("Create Post: ", newPost)
//        return {
//         url: `/save`,
//         method: 'POST',
//        // body: newPost,
//        data: newPost,
//         headers: {
//          'Content-type': 'application/json',
//          'No-Auth':'True'
//         }
//        }
//       }
//      }),
//      importProduit: builder.mutation({
//       query: (newPost) => {
//        console.log("Create Post: ", newPost)
//        var fd = new FormData();
//      fd.append('file', newPost,newPost.name);
     
//        return {
//         url: `/upload`,
//         method: 'POST',
//        // body: newPost,
//        data: fd,
//         headers: {
//          'Content-type': 'application/json',
//          'No-Auth':'True'
//         }
//        }
//       }
//      }),
//      updateProduit: builder.mutation({
//       query: (updateProduitData) => {
//        console.log("Update Post: ", updateProduitData)
//       const { id, ...data } = updateProduitData
//        console.log("Actual Update Post: ", data)
//        return {
//         url: `/update/${id}`,
//        // params: data,
//         method: 'PUT',
//         data: data,
//         headers: {
//          'Content-type': 'application/json; charset=UTF-8',
//         }
//        }
//       }
//      }),
     
//   }),
//     refetchOnMountOrArgChange: true,
//     refetchOnReconnect: true,
//     refetchOnFocus: true,
//     refetchOnMount: true,
  
 
// });

// export const { useGetProduitQuery,useGetProduitByIdQuery,useDeleteProduitMutation,useCreateProduitMutation,useImportProduitMutation,useUpdateProduitMutation} = useProduitApi;
// const initialState = {};

// export const Produitlice = createSlice({
//   name: "Produit",
//   initialState,
//   reducers: {
//     // deleteProduit: (state, action) => {
//     //  console.log("staaaa",state.value);
//     //   console.log("payloaddd",action.payload);
//     // },
//   },
//   extraReducers: (builder) => {
//     builder.addMatcher(
//       useProduitApi.endpoints.getProduit.matchFulfilled,
//       (state, { payload }) => {

//         state.isLoading = true;
//         state.hasError = false;
//         console.log("state"+state);
//       },
//     );
//   },

// });


// export const { reducer } =Produitlice;

