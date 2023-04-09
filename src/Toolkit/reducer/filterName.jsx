import { createReducer } from "@reduxjs/toolkit";

const initialState = { filterName: "" };

export const filter_name = createReducer(initialState, {
  FILTER_NAME: (state, action) => {
    state.filterName = action.payload;
  },
});
