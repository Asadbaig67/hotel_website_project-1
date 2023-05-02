import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  parkingOperatingCity: [
    "Aberdeen",
    "Belfast",
    "Birmingham",
    "Bournemouth",
    "Brighton",
    "Bristol",
  ],
};

export const parkingOperatingCities = createReducer(initialState, {
  SET_PARKING_CITY: (state, action) => {
    state.parkingOperatingCity = action.payload;
  },
});
