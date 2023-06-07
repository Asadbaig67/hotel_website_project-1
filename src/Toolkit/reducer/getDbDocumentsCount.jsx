import { createReducer } from "@reduxjs/toolkit";

const initialState = { count: {} };

export const db_Collection_Count = createReducer(initialState, {
  DB_COLLECTION_COUNT: (state, action) => {
    state.count = action.payload;
  },
});
