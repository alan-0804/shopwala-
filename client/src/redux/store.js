import { configureStore } from "@reduxjs/toolkit";

import productReducer from "./productSlice";
import priceReducer from "./priceSlice";
import cartReducer from "./cartSlice";

export const store = configureStore({
  reducer: {
    products: productReducer,
    prices: priceReducer,
    cart: cartReducer
  }
});