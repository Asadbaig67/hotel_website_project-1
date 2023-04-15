import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  featured_properties_hotel: [],
};

export const Featured_Properties_Hotel_Reducer = createReducer(initialState, {
  SET_FEATURED_PROPERTIES_DATA: (state, action) => {
    state.featured_properties_hotel = action.payload;
  },
});
