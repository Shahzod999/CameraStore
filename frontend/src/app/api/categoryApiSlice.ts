import { Category } from "../types/CategoryTypes";
import { apiSlice } from "./apiSlice";

export const categoryApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllCategory: builder.query<Category[], void>({
      query: () => "/category/categories",
      providesTags: ["Category"]
    }),
    addNewCategory: builder.mutation({
      query: (data) => ({
        url: "/category",
        method: "POST",
        body: data
      }),
      invalidatesTags: ["Category"]
    }),
    deleteCategory: builder.mutation({
      query: (id) => ({
        url: `/category/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Category"]
    })
  })
})

export const { useGetAllCategoryQuery, useAddNewCategoryMutation, useDeleteCategoryMutation } = categoryApiSlice