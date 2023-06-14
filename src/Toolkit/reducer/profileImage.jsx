import { createReducer } from "@reduxjs/toolkit";
const initialState = {
  profileImage: {},
};

export const profileImageReducer = createReducer(initialState, {
  SET_PROFILE_IMAGE: (state, action) => {
    state.profileImage = action.payload;
  },
});
