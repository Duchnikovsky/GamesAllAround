import { configureStore } from "@reduxjs/toolkit";
import categoryReducer from "./category/categorySlice";
import modalReducer from "./modal/modalSlice";

export const store = configureStore({
  reducer: {
    category: categoryReducer,
    modal: modalReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
