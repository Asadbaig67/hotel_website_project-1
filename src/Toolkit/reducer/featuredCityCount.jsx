import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  cityCount: {
    lahore: 0,
    islamabad: 0,
    london: 0,
    sydney: 0,
    japan: 0,
  },
};

export const featuredCityCount = createReducer(initialState, {
  FEATURED_CITY_COUNT: (state, action) => {
    state.cityCount = action.payload;
  },
});
