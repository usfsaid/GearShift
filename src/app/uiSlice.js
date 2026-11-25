import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
  searchTerm: "",
  intakeOpen: false,
  toast: null,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setSearchTerm(state, action) {
      state.searchTerm = action.payload;
    },
    openIntake(state) {
      state.intakeOpen = true;
    },
    closeIntake(state) {
      state.intakeOpen = false;
    },
    showToast: {
      reducer(state, action) {
        state.toast = action.payload;
      },
      prepare: ({ message, type = "success" }) => ({
        payload: { id: nanoid(), message, type },
      }),
    },
    clearToast(state) {
      state.toast = null;
    },
  },
});

export const { setSearchTerm, openIntake, closeIntake, showToast, clearToast } =
  uiSlice.actions;
export default uiSlice.reducer;

export const selectSearchTerm = (state) => state.ui.searchTerm;
export const selectIntakeOpen = (state) => state.ui.intakeOpen;
export const selectToast = (state) => state.ui.toast;
