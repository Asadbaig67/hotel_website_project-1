import { createReducer } from "@reduxjs/toolkit";

const initialState = { isOpen: false };

export const openSidebar = createReducer(initialState, {
  "TOGGLESIDEBAR": (state, action) => {
    state.isOpen = action.payload;
  },
});
