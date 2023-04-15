import { createReducer } from "@reduxjs/toolkit";

const initialState = { url: "" };

export const setDataUrl = createReducer(initialState, {
  SETURL: (state, action) => {
    state.url = action.payload;
  },
});
