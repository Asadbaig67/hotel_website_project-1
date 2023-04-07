import { createReducer } from "@reduxjs/toolkit";

const initialState = { header: [] };

export const setHeader = createReducer(initialState, {
  SETHEADER: (state, action) => {
    state.header = action.payload;
  },
});