import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  user: null,
};

export const SetLoggedInUser = createReducer(initialState, {
  SET_LOGGEDIN_USER: (state, action) => {
    return { ...state, user: action.payload };
  },
  GET_LOGGEDIN_USER: (state, action) => {
    return state.user;
  },
});
