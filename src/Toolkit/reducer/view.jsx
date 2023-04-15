import { createReducer } from "@reduxjs/toolkit";

const initialState = { view: "admin" };

export const view = createReducer(initialState, {
  SETVIEWTYPE: (state, action) => {
    state.view = action.payload;
  },
});
