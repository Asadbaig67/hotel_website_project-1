import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  propertyData: {},
};

export const setPropertyData = createReducer(initialState, {
  SET_PROPERTY_DATA: (state, action) => {
    state.propertyData = action.payload;
  },
});
