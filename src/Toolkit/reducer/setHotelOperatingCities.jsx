import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  hotelOperatingCity: [
    "Aberdeen",
    "Belfast",
    "Birmingham",
    "Bournemouth",
    "Brighton",
    "Bristol",
  ],
};

export const hotelOperatingCities = createReducer(initialState, {
  SET_HOTEL_CITY: (state, action) => {
    state.hotelOperatingCity = action.payload;
  },
});
