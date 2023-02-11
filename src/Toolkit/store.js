import { configureStore } from "@reduxjs/toolkit";
import { userLogin } from "./reducer/userLogin";
import { setCard } from "./reducer/CardReducer";
import { setContactData } from "./reducer/contactData";
import { propertySetform } from "./reducer/propertySet";
import { HotelForm } from "./reducer/HotelReducer";
import { RoomForm } from "./reducer/RoomReducer";

const store = configureStore({
  reducer: {
    // Add reducers here
    user: userLogin,
    setpropertyData: propertySetform,
    setData: setContactData,
    setCardData: setCard,
    setHotelData:HotelForm,
    setRoomData:RoomForm
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
