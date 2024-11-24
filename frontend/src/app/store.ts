import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { apiSlice } from "./api/apiSlice";
import userInfoSlice from "./features/useInfoSlice";
import searchSlice from "./features/searchSlice";
import basketSlice from "./features/basketSlice";
import categorySlice from "./features/categorySlice";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    userInfo: userInfoSlice,
    searchParam: searchSlice,
    basket: basketSlice,
    category: categorySlice
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware), devTools: true
})

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch