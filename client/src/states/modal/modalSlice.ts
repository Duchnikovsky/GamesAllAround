import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface ModalState {
  isOpen: boolean;
  modalType: string;
}

const InitialState: ModalState = {
  isOpen: false,
  modalType: '',
};

export const modalSlice = createSlice({
  name: 'modal',
  initialState: InitialState,
  reducers: {
    setModal: (state, action: PayloadAction<{isOpen: boolean, modalType: string}>) => {
      state.isOpen = action.payload.isOpen;
      state.modalType = action.payload.modalType;
    },
  },
})

export const { setModal } = modalSlice.actions;

export default modalSlice.reducer;