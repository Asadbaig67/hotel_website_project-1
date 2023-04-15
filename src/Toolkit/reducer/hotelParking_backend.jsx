import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  hotelParkingData: [],
};

export const hotelParkongDataReducer = createReducer(initialState, {
  SET_HOTEL_PARKING_DATA: (state, action) => {
    state.hotelParkingData = action.payload;
  },
  GET_HOTEL_DATA: (state) => {
    return state.hotelParkingData;
  },
});