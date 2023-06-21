import { configureStore } from "@reduxjs/toolkit";
import productsSlice from "./features/productSlice";
import filterSlice from "./features/filterSlice";
import cartSlice from "./features/cartSlice";
import userSlice from "./features/userSlice";
const store = configureStore({
  reducer: {
    products: productsSlice,
    productFilter: filterSlice,
    cart: cartSlice,
    user: userSlice,
  },
  devTools: process.env.NODE_ENV !== "production",
});

export default store;
