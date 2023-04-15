import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  featured_hotel: [],
};

export const Featured_Hotel_Reducer = createReducer(initialState, {
  SET_FEATURED_DATA: (state, action) => {
    state.featured_hotel = action.payload;
  },
});
