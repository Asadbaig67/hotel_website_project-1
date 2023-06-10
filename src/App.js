import "./App.css";
import { Route, Routes } from "react-router-dom";
import Contact from "./Pages/Contact/Contact";
import About from "./Pages/About Us/About";
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
import Loader from "./Components/Loader/Loader";

import Dashboard from "./Pages/Dashboard/Dashboard";
import Profile from "./Pages/Profile/Profile";
import HotelsList from "./Pages/HotelsList/HotelsList";
import ProfileDataForm from "./Components/Forms/Profile_Data_Form/profileDataForm";
import AddHotelForm from "./Components/Forms/Hotel_Forms/AddHotelForm";
import AddParkingForm from "./Components/Forms/Parking_Forms/Addparkingform";
import AddHotelParkingForm from "./Components/Forms/Hotel&Parking_Forms/Hotel_ParkingForm";
import UpdateHotel from "./Components/Forms/Hotel_Forms/UpdateHotelForm";
import UpdateHotelAndParking from "./Components/Forms/Hotel&Parking_Forms/UpdateHotel_Parking";
import UpdateParking from "./Components/Forms/Parking_Forms/Update_Parking";
import AddRoomForm from "./Components/Forms/Room_Forms/AddRoom";
import HotelBooking from "./Components/Forms/Booking_Forms/Hotel_booking";
import ParkingPropertyDetails from "./Pages/singleParking/Singleparking";
import Featured_skeleton from "./Components/Skeletons/Featured_skeleton";
import Viewbookings from "./Pages/BookingDetails/Viewbookings";
import Viewproperty from "./Pages/ViewProperty/Viewproperty";
import AdminBookings from "./Pages/BookingDetails/AdminBookings";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DashboardLoader from "./Components/Loader/DashboardLoader";
import PrivateRoute from "./Components/Routes/PrivateRoute";
import PublicRoute from "./Components/Routes/PublicRoute";

function App() {
  const property = {
    id: 1,
    name: "Example Property",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in quam a odio tristique interdum. Fusce efficitur nunc vitae augue euismod pretium.",
    rating: 4.5,
    totalRatings: 10,
    features: ["24/7 Security", "Valet Parking", "Electric Vehicle Charging"],
    prices: [
      {
        id: 1,
        description: "Hourly Rate",
        amount: 5.0,
      },
      {
        id: 2,
        description: "Daily Rate",
        amount: 25.0,
      },
      {
        id: 3,
        description: "Weekly Rate",
        amount: 100.0,
      },
    ],
    pictures: [
      {
        id: 1,
        url: "https://picsum.photos/300/200",
        alt: "Example Picture 1",
      },
      {
        id: 2,
        // url: "http://localhost:5000/uploads/ParkingImages/parking2.jpg",
        url: "https://picsum.photos/300/200",
        alt: "Example Picture 2",
      },
      {
        id: 3,
        url: "https://picsum.photos/300/200",
        alt: "Example Picture 3",
      },
    ],
  };
  return (
    <>
      <Routes>
        <Route path="/signup" element={<PublicRoute Component={Signup} />} />
        <Route path="/signin" element={<PublicRoute Component={Signin} />} />
        <Route
          path="/forgetpassword"
          element={<PublicRoute Component={Forgetpass} />}
        />
        <Route
          path="/otpverify"
          element={<PublicRoute Component={Otpverify} />}
        />
        <Route
          path="/reset/password"
          element={<PublicRoute Component={Changepassword} />}
        />
        <Route path="/" element={<PublicRoute Component={Home} />} />
        <Route path="/listHotel" element={<PublicRoute Component={List} />} />
        <Route
          path="/singleHotel"
          element={<PublicRoute Component={Hotel} />}
        />
        <Route
          path="/addHotel"
          element={<PublicRoute Component={HotelForm} />}
        />
        <Route path="/addRoom" element={<PublicRoute Component={RoomForm} />} />
        <Route path="/parking" element={<PublicRoute Component={Parking} />} />
        <Route path="/loader" element={<Loader />} />
        <Route path="/dashboardloader" element={<DashboardLoader />} />
        <Route
          path="/ParkingList"
          element={<PublicRoute Component={ParkingList} />}
        />
        <Route
          path="/HotelAndParking"
          element={<PublicRoute Component={HotelAndParking} />}
        />
        <Route
          path="/HotelAndParkingList"
          element={<PublicRoute Component={List} />}
        />
        <Route
          path="/singleHotelAndParking"
          element={<PublicRoute Component={Hotel} />}
        />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<PublicRoute Component={About} />} />
        <Route
          path="/listproperty"
          element={<PrivateRoute Component={Listing} />}
        />
        <Route
          path="/roomcard"
          element={<PrivateRoute Component={Roomcard} />}
        />
        <Route
          path="/hotelform"
          element={<PrivateRoute Component={AddHotelForm} />}
        />
        <Route
          path="/parkingform"
          element={<PrivateRoute Component={AddParkingForm} />}
        />
        {/* <Route path="/parkingform" element={<AddParkingForm />} /> */}
        <Route path="/skeleton" element={<Featured_skeleton />} />
        <Route
          path="/singleparking"
          element={
            <PrivateRoute
              Component={<ParkingPropertyDetails property={property} />}
            />
          }
        />
        <Route
          path="/bookingdetails"
          element={<PrivateRoute Component={Viewbookings} />}
        />
        <Route
          path="/viewbookingdetails"
          element={<PrivateRoute Component={AdminBookings} />}
        />
        {/* <Route path="/booking" element={<RoomBooking rooms={rooms} />} /> */}
        <Route
          path="/viewproperty"
          element={<PrivateRoute Component={Viewproperty} />}
        />

        {/* Admin Routes */}

        <Route
          path="/dashboard"
          element={<PrivateRoute Component={Dashboard} />}
        />
        <Route path="/profile" element={<PrivateRoute Component={Profile} />} />
        <Route
          path="/hotels"
          element={<PrivateRoute Component={HotelsList} />}
        />
        <Route
          path="/users"
          element={<PrivateRoute Component={HotelsList} />}
        />
        <Route
          path="/booking"
          element={<PrivateRoute Component={HotelsList} />}
        />
        <Route
          path="/cancelbooking"
          element={<PrivateRoute Component={HotelsList} />}
        />
        <Route
          path="/hotelRequests"
          element={<PrivateRoute Component={HotelsList} />}
        />
        <Route
          path="/parkingRequests"
          element={<PrivateRoute Component={HotelsList} />}
        />
        <Route
          path="/hotelAndParkingRequests"
          element={<PrivateRoute Component={HotelsList} />}
        />
        <Route
          path="/HotelsAndParkings"
          element={<PrivateRoute Component={HotelsList} />}
        />
        <Route
          path="/parkings"
          element={<PrivateRoute Component={HotelsList} />}
        />
        <Route
          path="/property"
          element={<PrivateRoute Component={HotelsList} />}
        />
        <Route
          path="/PropertyRequests"
          element={<PrivateRoute Component={HotelsList} />}
        />
        <Route
          path="/bookingRequests"
          element={<PrivateRoute Component={HotelsList} />}
        />
        <Route
          path="/hotelbookings"
          element={<PrivateRoute Component={HotelsList} />}
        />
        <Route
          path="/parkingbookings"
          element={<PrivateRoute Component={HotelsList} />}
        />
        <Route
          path="/hotelandparkingbookings"
          element={<PrivateRoute Component={HotelsList} />}
        />
        <Route
          path="/upcominghotelbookings"
          element={<PrivateRoute Component={HotelsList} />}
        />
        <Route
          path="/upcomingparkingbookings"
          element={<PrivateRoute Component={HotelsList} />}
        />
        <Route
          path="/upcominghotelandparkingbookings"
          element={<PrivateRoute Component={HotelsList} />}
        />
        <Route
          path="/profiledata"
          element={<PrivateRoute Component={ProfileDataForm} />}
        />
        <Route path="/maps" element={<Reactmaps />} />
        <Route
          path="/hotelform"
          element={<PrivateRoute Component={AddHotelForm} />}
        />
        <Route
          path="/parkingform"
          element={<PrivateRoute Component={AddParkingForm} />}
        />
        <Route
          path="/hotelparkingform"
          element={<PrivateRoute Component={AddHotelParkingForm} />}
        />
        <Route
          path="/roomform"
          element={<PrivateRoute Component={AddRoomForm} />}
        />
        <Route
          path="/hotelbooking"
          element={<PrivateRoute Component={HotelBooking} />}
        />
        <Route
          path="/updatehotel"
          element={<PrivateRoute Component={UpdateHotel} />}
        />
        <Route
          path="/updatehotelandparking"
          element={<PrivateRoute Component={UpdateHotelAndParking} />}
        />
        <Route
          path="/updateparking"
          element={<PrivateRoute Component={UpdateParking} />}
        />
      </Routes>
    </>
  );
}

export default App;
