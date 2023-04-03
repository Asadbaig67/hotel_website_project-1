import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  userWithToken: {},
};

export const PasswordResetToken = createReducer(initialState, {
  SET_USER_TOKEN: (state, action) => {
    return { ...state, userWithToken: action.payload };
  },
  GET_USER_TOKEN: (state) => {
    return state.userWithToken;
  },
});
