import { createReducer } from "@reduxjs/toolkit";

const initialState = { disable: { disabled: true, name: "booking" } };

export const disable = createReducer(initialState, {
  DISABLE: (state, action) => {
    state.disable = action.payload;
  },
});
