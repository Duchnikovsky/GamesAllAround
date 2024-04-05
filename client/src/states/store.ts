import { configureStore } from "@reduxjs/toolkit";
import modalReducer from "./modal/modalSlice";
import cartReducer from "./cart/cartSlice";

export const store = configureStore({
  reducer: {
    modal: modalReducer,
    cart: cartReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
