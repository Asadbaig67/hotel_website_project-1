import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  hotelAndParkingOperatingCity: [
    "Aberdeen",
    "Belfast",
    "Birmingham",
    "Bournemouth",
    "Brighton",
    "Bristol",
  ],
};

export const hotelAndParkingOperatingCities = createReducer(initialState, {
  SET_HOTEL_AND_PARKING_CITY: (state, action) => {
    state.hotelAndParkingOperatingCity = action.payload;
  },
});
