import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  //   modalData: {
  //     roomArray: [],
  //     singleRoomsArray: [],
  //     twinRoomsArray: [],
  //     familyRoomsArray: [],
  //     Total_Price: 0,
  //     SingleRoomPrice: 0,
  //     TwinRoomPrice: 0,
  //     FamilyRoomPrice: 0,
  //   },
  rooms_Array: [],
};

export const modalData = createReducer(initialState, {
  SET_MODAL_DATA: (state, action) => {
    state.rooms_Array = action.payload;
  },
});
