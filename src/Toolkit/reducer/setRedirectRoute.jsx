import { createReducer } from "@reduxjs/toolkit";

const initialState = { redirectRoute: "" };

export const Redirect_Route = createReducer(initialState, {
  SET_REDIRECT_ROUTE: (state, action) => {
    state.redirectRoute = action.payload;
  },
});
