import { createSlice } from "@reduxjs/toolkit/react";
import { RootState } from "../store";

export interface BasketState {
  basket: any
}

const initialState: BasketState = {
  basket: JSON.parse(localStorage.getItem("basket") || "[]"),
}

export const basketSlice = createSlice({
  name: 'basket',
  initialState,
  reducers: {
    addProductsToBasket: (state, action) => {
      const productExist = state.basket.find((id: string) => id == action.payload)
      console.log(productExist);

      if (productExist) {
        return alert("Product Exist");
      }
      
      state.basket.push(action.payload)
      localStorage.setItem("basket", JSON.stringify(state.basket))
      console.log('nonnne');

    },
    deleteFromBasket: (state, action) => {
      state.basket = state.basket.filter((id) => id !== action.payload)
      localStorage.setItem("basket", JSON.stringify(state.basket))
    }
  }
})

export const { addProductsToBasket, deleteFromBasket } = basketSlice.actions
export const selectedBasket = (state: RootState) => state.basket.basket
export default basketSlice.reducer