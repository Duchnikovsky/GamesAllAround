import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface CartState {
  cart: CartItem[];
  totalItems: number;
}

const initialState: CartState = {
  cart: [],
  totalItems: 0,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState: initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const item = state.cart.find((item) => item.id === action.payload.id);
      if (item) {
        item.quantity += 1;
      } else {
        state.cart.push({ ...action.payload, quantity: 1 });
      }
      state.totalItems += 1;
    },
    removeFromCart: (
      state,
      action: PayloadAction<{ id: string; quantity: number }>
    ) => {
      const item = state.cart.find((item) => item.id === action.payload.id);
      if (item) {
        item.quantity -= action.payload.quantity;
        if (item.quantity === 0 || item.quantity < 0) {
          state.cart = state.cart.filter(
            (item) => item.id !== action.payload.id
          );
        }
        state.totalItems -= 1;
      }
    },
    clearCart: (state) => {
      state.cart = [];
      state.totalItems = 0;
    },
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
