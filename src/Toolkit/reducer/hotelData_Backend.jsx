import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  hotelData: [],
};

export const hotelDataReducer = createReducer(initialState, {
  SET_HOTEL_DATA: (state, action) => {
    state.hotelData = action.payload;
  },
  GET_HOTEL_DATA: (state) => {
    return state.hotelData;
  },
});


