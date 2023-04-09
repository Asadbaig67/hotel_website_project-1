import "./App.css";
import { Route, Routes } from "react-router-dom";
import Contact from "./Pages/Contact/Contact";
import Home from "./Pages/Home/Home";
import Listing from "./Pages/Property Listing/Listing";
import Hotel from "./Pages/hotel/Hotel";
import Signin from "./Pages/Signin/Signin";
import Signup from "./Pages/Signup/Signup";
import Forgetpass from "./Pages/Forgetpassword/Forgetpass";
import Otpverify from "./Pages/OtpVerification/Otpverify";
import Changepassword from "./Pages/ChangePassword/Changepassword";
// import Map from "./Components/Map/Map";
import List from "./Pages/list/List";
import HotelForm from "./Pages/hotelForm/Hotel";
import RoomForm from "./Pages/roomForm/Room";
import Parking from "./Pages/Parking Section/Parking";
import Roomcard from "./Components/RoomCard/Roomcard";
import ParkingList from "./Pages/ParkingList/ParkingList";
import HotelAndParking from "./Pages/HotelAndParking/HotelAndParking";
import Reactmaps from "./Components/Map/reactMaps";

import Dashboard from "./Pages/Dashboard/Dashboard";
import Profile from "./Pages/Profile/Profile";
import HotelsList from "./Pages/HotelsList/HotelsList";
import ProfileDataForm from "./Components/Forms/Profile_Data_Form/profileDataForm";
import AddHotelForm from "./Components/Forms/Hotel_Forms/AddHotelForm";
import AddParkingForm from "./Components/Forms/Parking_Forms/Addparkingform";
import AddHotelParkingForm from "./Components/Forms/Hotel&Parking_Forms/Hotel_ParkingForm";
import AddRoomForm from "./Components/Forms/Room_Forms/AddRoom";
import HotelBooking from './Components/Forms/Booking_Forms/Hotel_booking'

function App() {


  return (
    <>
      {/* <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/forgetpassword" element={<Forgetpass />} />
        <Route path="/otpverify" element={<Otpverify />} />
        <Route path="/reset/password" element={<Changepassword />} />
        <Route path="/" element={<Home />} />
        <Route path="/listHotel" element={<List />} />
        <Route path="/singleHotel" element={<Hotel />} />
        <Route path="/addHotel" element={<HotelForm />} />
        <Route path="/addRoom" element={<RoomForm />} />
        <Route path="/parking" element={<Parking />} />
        <Route path="/ParkingList" element={<ParkingList />} />
        <Route path="/HotelAndParking" element={<HotelAndParking />} />
        <Route path="/HotelAndParkingList" element={<List />} />
        <Route path="/singleHotelAndParking" element={<Hotel />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/listproperty" element={<Listing />} />
        <Route path="/roomcard" element={<Roomcard />} />

      </Routes> */}

      <Routes>

        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />

        <Route path="/hotels" element={<HotelsList />} />
        <Route path="/users" element={<HotelsList />} />
        <Route path="/booking" element={<HotelsList />} />
        <Route path="/hotelRequests" element={<HotelsList />} />
        <Route path="/parkingRequests" element={<HotelsList />} />
        <Route path="/hotelAndParkingRequests" element={<HotelsList />} />
        <Route path="/HotelsAndParkings" element={<HotelsList />} />
        <Route path="/parkings" element={<HotelsList />} />



        <Route path="/profiledata" element={<ProfileDataForm />} />
        <Route path="/maps" element={<Reactmaps />} />
        <Route path="/hotelform" element={<AddHotelForm />} />
        <Route path="/parkingform" element={<AddParkingForm />} />
        <Route path="/hotelparkingform" element={<AddHotelParkingForm />} />
        <Route path="/roomform" element={<AddRoomForm />} />
        <Route path="/hotelbooking" element={<HotelBooking />} />

      </Routes>

    </>
  );
}

export default App;
