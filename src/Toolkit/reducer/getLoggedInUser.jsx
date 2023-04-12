import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  loggedinUser: {},
};

export const SetLoggedInUser = createReducer(initialState, {
  SET_LOGGEDIN_USER: (state, action) => {
    return { ...state, loggedinUser: action.payload };
  },
  GET_LOGGEDIN_USER: (state, action) => {
    return state.loggedinUser;
  },
});
