import { apiSlice } from "./apiSlice";

export const productApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    fetchAllProducts: builder.query({
      query: () => "/products/allproducts",
      providesTags: ["Products"]
    }),
    addNewProduct: builder.mutation({
      query: (data) => ({
        url: "/products",
        method: "POST",
        body: data
      }),
      invalidatesTags: ["Products"]
    }),
    deleteProducts: builder.mutation({
      query: (id) => ({
        url: `/products/${id}`,
        method: "DELETE"
      }),
      invalidatesTags: ["Products"]
    }),
    updateProduct: builder.mutation({
      query: ({ id, data }) => ({
        url: `/products/${id}`,
        method: "PUT",
        body: data
      }),
      invalidatesTags: ["Products"]
    }),
    getSingleProduct: builder.query({
      query: (id) => ({
        url: `/products/${id}`
      })
    }),
    searchProducts: builder.query({
      query: (name = "") => ({
        url: '/products/search',
        params: { name },
      })
    })
  })
})

export const { useFetchAllProductsQuery, useAddNewProductMutation, useDeleteProductsMutation, useUpdateProductMutation, useGetSingleProductQuery, useSearchProductsQuery } = productApiSlice