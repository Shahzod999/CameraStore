import { createSlice } from "@reduxjs/toolkit";
import { RootState } from '../store'

export interface SearchState {
  search: string
}

const initialState: SearchState = {
  search: ""
}


export const searchSlice = createSlice({
  name: "searchParam",
  initialState,
  reducers: {
    searchProducts: (state, action) => {
      state.search = action.payload
    }
  }
})

export const { searchProducts } = searchSlice.actions
export const selectedSearchParams = (state: RootState) => state.searchParam.search
export default searchSlice.reducer