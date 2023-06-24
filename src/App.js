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
import SearchBar from "./Components/SearchBar/SearchBar";
import PageNotFound from "./Components/No Data Page/PageNotFound";

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
import DashboardLoader from "./Components/Loader/DashboardLoader";
import PrivateRoute from "./Components/Routes/PrivateRoute";
import PublicRoute from "./Components/Routes/PublicRoute";
import AdminNav from "./Components/AdminNavbar/AdminNav";
// import ReactDataTable from "./Components/ReactDataTable/ReactDataTable";

function App() {
  return (
    <>
      <Routes>
        <Route path="/search" element={<SearchBar />} />
        <Route path="/signup" element={<PublicRoute Component={Signup} />} />
        <Route path="/signin" element={<PublicRoute Component={Signin} />} />
        <Route path="/forgetpassword" element={<Forgetpass />} />
        <Route
          path="/reset/password"
          element={<PublicRoute Component={Changepassword} />}
        />
        <Route path="/notfound" element={<PageNotFound />} />
        <Route path="/" element={<Home />} />
        <Route path="/listHotel" element={<List />} />
        <Route path="/singleHotel" element={<Hotel />} />
        <Route
          path="/addHotel"
          element={<PrivateRoute Component={HotelForm} />}
        />
        <Route
          path="/addRoom"
          element={<PrivateRoute Component={RoomForm} />}
        />
        <Route path="/navbaradmin" element={<AdminNav />} />
        <Route path="/parking" element={<Parking />} />
        <Route path="/loader" element={<Loader />} />
        <Route path="/dashboardloader" element={<DashboardLoader />} />
        <Route path="/ParkingList" element={<ParkingList />} />
        <Route path="/HotelAndParking" element={<HotelAndParking />} />
        <Route path="/HotelAndParkingList" element={<List />} />
        <Route path="/singleHotelAndParking" element={<Hotel />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route
          path="/listproperty"
          element={<PrivateRoute Component={Listing} />}
        />
        <Route path="/roomcard" element={<Roomcard />} />
        <Route
          path="/hotelform"
          element={<PrivateRoute Component={AddHotelForm} />}
        />
        <Route
          path="/parkingform"
          element={<PrivateRoute Component={AddParkingForm} />}
        />
        <Route path="/skeleton" element={<Featured_skeleton />} />
        <Route path="/singleparking" element={<ParkingPropertyDetails />} />
        <Route
          path="/bookingdetails"
          element={<PrivateRoute Component={Viewbookings} />}
        />
        <Route
          path="/viewbookingdetails"
          element={<PrivateRoute Component={AdminBookings} />}
        />
        <Route
          path="/viewproperty"
          element={<PrivateRoute Component={Viewproperty} />}
        />

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
      {/* <ReactDataTable /> */}
    </>
  );
}

export default App;
