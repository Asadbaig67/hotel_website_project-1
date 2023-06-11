import { createReducer } from "@reduxjs/toolkit";

const initialState = { login: false };

export const SET_LOGIN = createReducer(initialState, {
  LOGIN: (state, action) => {
    state.login = action.payload;
  },
});
