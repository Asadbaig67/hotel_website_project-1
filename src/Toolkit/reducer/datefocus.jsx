import { createReducer } from "@reduxjs/toolkit";

const initialState = { dateFocus: false };

export const SetDateFocus = createReducer(initialState, {
  SET_FOCUS: (state, action) => {
    state.dateFocus = action.payload;
  },
});
