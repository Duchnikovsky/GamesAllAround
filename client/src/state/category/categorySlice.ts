import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface CategoryState {
  name: string;
}

const initialState: CategoryState = {
  name: 'All categories',
};

export const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    setCategory: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
  },
});

export const { setCategory } = categorySlice.actions;

export default categorySlice.reducer;