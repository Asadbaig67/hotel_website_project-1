import { createReducer } from "@reduxjs/toolkit";

const initialState = { success_State: false };

export const setSuccess = createReducer(initialState, {
  SUCCESS: (state, action) => {
    state.success_State = action.payload;
  },
});
