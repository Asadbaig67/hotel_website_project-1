import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  notification: [],
};

export const setNotification = createReducer(initialState, {
  SET_NOTIFICATION: (state, action) => {
    state.notification = action.payload;
  },
});
