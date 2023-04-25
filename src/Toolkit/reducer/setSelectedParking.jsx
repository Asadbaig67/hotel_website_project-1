import { createReducer } from "@reduxjs/toolkit";

const initialState = { selected_parking: {} };

export const Set_Selected_Parking = createReducer(initialState, {
  SET_SELECTED_PARKING: (state, action) => {
    state.selected_parking = action.payload;
  },
});
