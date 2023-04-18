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
import Loader from "./Components/Loader/Loader";

import Dashboard from "./Pages/Dashboard/Dashboard";
import Profile from "./Pages/Profile/Profile";
import HotelsList from "./Pages/HotelsList/HotelsList";
import ProfileDataForm from "./Components/Forms/Profile_Data_Form/profileDataForm";
import AddHotelForm from "./Components/Forms/Hotel_Forms/AddHotelForm";
import AddParkingForm from "./Components/Forms/Parking_Forms/Addparkingform";
import AddHotelParkingForm from "./Components/Forms/Hotel&Parking_Forms/Hotel_ParkingForm";
import AddRoomForm from "./Components/Forms/Room_Forms/AddRoom";
import HotelBooking from './Components/Forms/Booking_Forms/Hotel_booking'
import ParkingPropertyDetails from "./Pages/singleParking/Singleparking";
import Featured_skeleton from "./Components/Skeletons/Featured_skeleton";

function App() {

  const property = {
    id: 1,
    name: "Example Property",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in quam a odio tristique interdum. Fusce efficitur nunc vitae augue euismod pretium.",
    rating: 4.5,
    totalRatings: 10,
    features: ["24/7 Security", "Valet Parking", "Electric Vehicle Charging"],
    prices: [
      {
        id: 1,
        description: "Hourly Rate",
        amount: 5.0
      },
      {
        id: 2,
        description: "Daily Rate",
        amount: 25.0
      },
      {
        id: 3,
        description: "Weekly Rate",
        amount: 100.0
      }
    ],
    pictures: [
      {
        id: 1,
        url: "http://localhost:5000/uploads/ParkingImages/parking1.jpg",
        alt: "Example Picture 1"
      },
      {
        id: 2,
        url: "http://localhost:5000/uploads/ParkingImages/parking2.jpg",
        alt: "Example Picture 2"
      },
      {
        id: 3,
        url: "https://picsum.photos/300/200",
        alt: "Example Picture 3"
      }
    ]
  };


  return (
    <>
      <Routes>
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
        <Route path="/loader" element={<Loader />} />
        <Route path="/ParkingList" element={<ParkingList />} />
        <Route path="/HotelAndParking" element={<HotelAndParking />} />
        <Route path="/HotelAndParkingList" element={<List />} />
        <Route path="/singleHotelAndParking" element={<Hotel />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/listproperty" element={<Listing />} />
        <Route path="/roomcard" element={<Roomcard />} />
        <Route path="/hotelform" element={<AddHotelForm />} />
        <Route path="/parkingform" element={<AddParkingForm />} />
        <Route path="/parkingform" element={<AddParkingForm />} />
        <Route path="/skeleton" element={<Featured_skeleton />} />
        <Route path="/singleparking" element={<ParkingPropertyDetails property={property} />} />

        {/* Admin Routes */}
        
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
        <Route path="/property" element={<HotelsList />} />
        <Route path="/PropertyRequests" element={<HotelsList />} />
        <Route path="/bookingRequests" element={<HotelsList />} />
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
