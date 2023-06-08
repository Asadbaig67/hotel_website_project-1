import { createReducer } from "@reduxjs/toolkit";

const initialState = { cardData: {} };

export const dashboardCard = createReducer(initialState, {
    SET_DASHBOARD_CARD: (state, action) => {
    state.cardData = action.payload;
  },
});
