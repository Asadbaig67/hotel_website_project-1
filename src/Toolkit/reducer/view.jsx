import { createReducer } from "@reduxjs/toolkit";

const initialState = { view: "user" };

export const view = createReducer(initialState, {
  SETVIEWTYPE: (state, action) => {
    state.view = action.payload;
  },
});
