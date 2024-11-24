import { createSlice } from "@reduxjs/toolkit/react";
import { RootState } from "../store";

export interface CategoryState {
  checked: string[]
}

const initialState: CategoryState = {
  checked: []
}

export const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    addCategory: (state, action) => {
      state.checked = [...state.checked, action.payload]
    },
    deleteCategory: (state, action) => {
      const newCategory = state.checked.filter((item) => item !== action.payload)
      state.checked = newCategory
    }
  }
})

export const { addCategory, deleteCategory } = categorySlice.actions
export const selectedCategoryCheck = (state: RootState) => state.category.checked
export default categorySlice.reducer