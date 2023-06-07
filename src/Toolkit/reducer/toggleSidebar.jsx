import { createReducer } from "@reduxjs/toolkit";

const initialState = { open: true };

export const toggleSidebar = createReducer(initialState, {
  SET_TOGGLE: (state, action) => {
    state.open = action.payload;
  },
});
