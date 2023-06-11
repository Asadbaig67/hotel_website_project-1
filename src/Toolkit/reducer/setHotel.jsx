import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  hotel: {},
};

export const SetHotel = createReducer(initialState, {
  SET_HOTEL: (state, action) => {
    state.hotel = action.payload;
  },
});
