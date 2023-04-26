import { createReducer } from "@reduxjs/toolkit";

const initialState = { booked_property: {} };

export const Set_booked_property = createReducer(initialState, {
  SET_BOOKED_PROPERTY: (state, action) => {
    state.booked_property = action.payload;
  },
});
