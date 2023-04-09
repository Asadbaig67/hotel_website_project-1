import { createReducer } from "@reduxjs/toolkit";

const initialState = { filterType: "" };

export const filter_type = createReducer(initialState, {
  FILTER_TYPE: (state, action) => {
    state.filterType = action.payload;
  },
});
