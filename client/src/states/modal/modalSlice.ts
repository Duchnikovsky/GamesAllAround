import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface ModalState {
  isOpen: boolean;
  modalType: string;
  objectId?: string | null;
}

const InitialState: ModalState = {
  isOpen: false,
  modalType: "",
  objectId: null,
};

export const modalSlice = createSlice({
  name: "modal",
  initialState: InitialState,
  reducers: {
    setModal: (
      state,
      action: PayloadAction<{
        isOpen: boolean;
        modalType: string;
        objectId?: string;
      }>
    ) => {
      state.isOpen = action.payload.isOpen;
      state.modalType = action.payload.modalType;
      state.objectId = action.payload.objectId || null;
    },
  },
});

export const { setModal } = modalSlice.actions;

export default modalSlice.reducer;
