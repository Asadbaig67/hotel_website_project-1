import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  parkingData: [],
};

export const parkingDataReducer = createReducer(initialState, {
  SET_PARKING_DATA: (state, action) => {
    state.parkingData = action.payload;
  },
  GET_PARKING_DATA: (state, action) => {
    return state.parkingData;
  },
});


