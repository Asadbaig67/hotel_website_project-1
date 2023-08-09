import "./App.css";
import { Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
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
import HotelParkingBooking from "./Components/Forms/Booking_Forms/HotelParkingBooking";
import ParkingBooking from "./Components/Forms/Booking_Forms/ParkingBookings";
import ParkingPropertyDetails from "./Pages/singleParking/Singleparking";
import Featured_skeleton from "./Components/Skeletons/Featured_skeleton";
import Viewbookings from "./Pages/BookingDetails/Viewbookings";
import Viewproperty from "./Pages/ViewProperty/Viewproperty";
import AdminBookings from "./Pages/BookingDetails/AdminBookings";
import DashboardLoader from "./Components/Loader/DashboardLoader";
import PrivateRoute from "./Components/Routes/PrivateRoute";
import PublicRoute from "./Components/Routes/PublicRoute";
import AdminNav from "./Components/AdminNavbar/AdminNav";
import AddOperatingCities from "./Pages/AddOperatingCities/AddOperatingCities";
// import ReactDataTable from "./Components/ReactDataTable/ReactDataTable";

function App() {
  const { loggedinUser } = useSelector((state) => state.getLoggedInUser);
  const { user } = loggedinUser;
  return (
    <>
      <Routes>
        {/* <Route path="/search" element={<SearchBar />} /> */}
        <Route path="/signup" element={<PublicRoute Component={Signup} />} />
        <Route path="/signin" element={<PublicRoute Component={Signin} />} />
        <Route path="/forgetpassword" element={<Forgetpass />} />
        <Route
          path="/reset/password"
          element={<PublicRoute Component={Changepassword} />}
        />
        <Route path="/notfound" element={<PageNotFound />} />

        {/* Client routes */}

        {/* <Route
          path="/addHotel"
          element={<PrivateRoute Component={HotelForm} />}
        />
        <Route
          path="/addRoom"
          element={<PrivateRoute Component={RoomForm} />}
        /> 
        <Route
          path="/listproperty"
          element={<PrivateRoute Component={Listing} />}
        />
        <Route path="/loader" element={<Loader />} />
        <Route path="/dashboardloader" element={<DashboardLoader />} /> */}

        <Route path="/" element={<Home />} />
        <Route path="/hotel/hotellist" element={<List />} />
        <Route path="/hotel/hotellist/:city" element={<Hotel />} />

        <Route path="/parking" element={<Parking />} />
        <Route path="/parking/ParkingList" element={<ParkingList />} />
        <Route
          path="/parking/ParkingList/:city/:id"
          element={<ParkingPropertyDetails />}
        />

        <Route path="/HotelAndParking" element={<HotelAndParking />} />
        <Route path="/HotelAndParking/HotelAndParkingList" element={<List />} />
        <Route
          path="/HotelAndParking/HotelAndParkingList/:city"
          element={<Hotel />}
        />

        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />

        <Route
          path="/hotel/hotellist/bookingdetails"
          element={<PrivateRoute Component={Viewbookings} />}
        />
        <Route
          path="/hotelAndParking/hotelAndParkingList/bookingdetails"
          element={<PrivateRoute Component={Viewbookings} />}
        />

        {/* admin routes */}

        <Route
          path={`/:type${
            user && user.account_type === "partner" ? "/:partner_type" : ""
          }/dashboard`}
          element={<PrivateRoute Component={Dashboard} />}
        />
        <Route
          path={`/:type${
            user && user.account_type === "partner" ? "/:partner_type" : ""
          }/profile`}
          element={<PrivateRoute Component={Profile} />}
        />
        <Route
          path={`/:type${
            user && user.account_type === "partner" ? "/:partner_type" : ""
          }/operatingcities`}
          element={<PrivateRoute Component={AddOperatingCities} />}
        />

        <Route
          path={`/:type${
            user && user.account_type === "partner" ? "/:partner_type" : ""
          }/hotels`}
          element={<PrivateRoute Component={HotelsList} />}
        />
        <Route
          path={`/:type${
            user && user.account_type === "partner" ? "/:partner_type" : ""
          }/deListedHotels`}
          element={<PrivateRoute Component={HotelsList} />}
        />
        <Route
          path={`/:type${
            user && user.account_type === "partner" ? "/:partner_type" : ""
          }/deListedParkings`}
          element={<PrivateRoute Component={HotelsList} />}
        />
        <Route
          path={`/:type${
            user && user.account_type === "partner" ? "/:partner_type" : ""
          }/deListedHotelAndParking`}
          element={<PrivateRoute Component={HotelsList} />}
        />
        <Route
          path={`/:type${
            user && user.account_type === "partner" ? "/:partner_type" : ""
          }/delistedProperties`}
          element={<PrivateRoute Component={HotelsList} />}
        />
        <Route
          path={`/:type${
            user && user.account_type === "partner" ? "/:partner_type" : ""
          }/users`}
          element={<PrivateRoute Component={HotelsList} />}
        />
        <Route
          path={`/:type${
            user && user.account_type === "partner" ? "/:partner_type" : ""
          }/booking`}
          element={<PrivateRoute Component={HotelsList} />}
        />
        <Route
          path={`/:type${
            user && user.account_type === "partner" ? "/:partner_type" : ""
          }/cancelbooking`}
          element={<PrivateRoute Component={HotelsList} />}
        />
        <Route
          path={`/:type${
            user && user.account_type === "partner" ? "/:partner_type" : ""
          }/hotelRequests`}
          element={<PrivateRoute Component={HotelsList} />}
        />
        <Route
          path={`/:type${
            user && user.account_type === "partner" ? "/:partner_type" : ""
          }/parkingRequests`}
          element={<PrivateRoute Component={HotelsList} />}
        />
        <Route
          path={`/:type${
            user && user.account_type === "partner" ? "/:partner_type" : ""
          }/hotelAndParkingRequests`}
          element={<PrivateRoute Component={HotelsList} />}
        />
        <Route
          path={`/:type${
            user && user.account_type === "partner" ? "/:partner_type" : ""
          }/HotelsAndParkings`}
          element={<PrivateRoute Component={HotelsList} />}
        />
        <Route
          path={`/:type${
            user && user.account_type === "partner" ? "/:partner_type" : ""
          }/parkings`}
          element={<PrivateRoute Component={HotelsList} />}
        />
        <Route
          path={`/:type${
            user && user.account_type === "partner" ? "/:partner_type" : ""
          }/property`}
          element={<PrivateRoute Component={HotelsList} />}
        />
        <Route
          path={`/:type${
            user && user.account_type === "partner" ? "/:partner_type" : ""
          }/PropertyRequests`}
          element={<PrivateRoute Component={HotelsList} />}
        />
        <Route
          path={`/:type${
            user && user.account_type === "partner" ? "/:partner_type" : ""
          }/bookingRequests`}
          element={<PrivateRoute Component={HotelsList} />}
        />
        <Route
          path={`/:type${
            user && user.account_type === "partner" ? "/:partner_type" : ""
          }/hotelbookings`}
          element={<PrivateRoute Component={HotelsList} />}
        />
        <Route
          path={`/:type${
            user && user.account_type === "partner" ? "/:partner_type" : ""
          }/parkingbookings`}
          element={<PrivateRoute Component={HotelsList} />}
        />
        <Route
          path={`/:type${
            user && user.account_type === "partner" ? "/:partner_type" : ""
          }/hotelandparkingbookings`}
          element={<PrivateRoute Component={HotelsList} />}
        />
        <Route
          path={`/:type${
            user && user.account_type === "partner" ? "/:partner_type" : ""
          }/upcominghotelbookings`}
          element={<PrivateRoute Component={HotelsList} />}
        />
        <Route
          path={`/:type${
            user && user.account_type === "partner" ? "/:partner_type" : ""
          }/upcomingparkingbookings`}
          element={<PrivateRoute Component={HotelsList} />}
        />
        <Route
          path={`/:type${
            user && user.account_type === "partner" ? "/:partner_type" : ""
          }/upcominghotelandparkingbookings`}
          element={<PrivateRoute Component={HotelsList} />}
        />
        <Route
          path={`/:type${
            user && user.account_type === "partner" ? "/:partner_type" : ""
          }/ongoingbooking`}
          element={<PrivateRoute Component={HotelsList} />}
        />
        <Route
          path={`/:type${
            user && user.account_type === "partner" ? "/:partner_type" : ""
          }/upcomingbooking`}
          element={<PrivateRoute Component={HotelsList} />}
        />
        <Route
          path={`/:type${
            user && user.account_type === "partner" ? "/:partner_type" : ""
          }/previousbooking`}
          element={<PrivateRoute Component={HotelsList} />}
        />

        <Route
          path={`/:type${
            user && user.account_type === "partner" ? "/:partner_type" : ""
          }/viewbookingdetails/:id`}
          element={<PrivateRoute Component={AdminBookings} />}
        />
        <Route
          path={`/:type${
            user && user.account_type === "partner" ? "/:partner_type" : ""
          }/viewproperty/:id`}
          element={<PrivateRoute Component={Viewproperty} />}
        />

        <Route
          path={`/:type${
            user && user.account_type === "partner" ? "/:partner_type" : ""
          }/hotelform`}
          element={<PrivateRoute Component={AddHotelForm} />}
        />
        <Route
          path={`/:type${
            user && user.account_type === "partner" ? "/:partner_type" : ""
          }/parkingform`}
          element={<PrivateRoute Component={AddParkingForm} />}
        />

        <Route
          path={`/:type${
            user && user.account_type === "partner" ? "/:partner_type" : ""
          }/profiledata`}
          element={<PrivateRoute Component={ProfileDataForm} />}
        />
        <Route path="/maps" element={<Reactmaps />} />
        <Route
          path={`/:type${
            user && user.account_type === "partner" ? "/:partner_type" : ""
          }/hotelform`}
          element={<PrivateRoute Component={AddHotelForm} />}
        />
        <Route
          path={`/:type${
            user && user.account_type === "partner" ? "/:partner_type" : ""
          }/parkingform`}
          element={<PrivateRoute Component={AddParkingForm} />}
        />
        <Route
          path={`/:type${
            user && user.account_type === "partner" ? "/:partner_type" : ""
          }/hotelparkingform`}
          element={<PrivateRoute Component={AddHotelParkingForm} />}
        />
        <Route
          path={`/:type${
            user && user.account_type === "partner" ? "/:partner_type" : ""
          }/roomform`}
          element={<PrivateRoute Component={AddRoomForm} />}
        />
        <Route
          path={`/:type${
            user && user.account_type === "partner" ? "/:partner_type" : ""
          }/updatehotel/:id`}
          element={<PrivateRoute Component={UpdateHotel} />}
        />
        <Route
          path={`/:type${
            user && user.account_type === "partner" ? "/:partner_type" : ""
          }/updatehotelandparking/:id`}
          element={<PrivateRoute Component={UpdateHotelAndParking} />}
        />
        <Route
          path={`/:type${
            user && user.account_type === "partner" ? "/:partner_type" : ""
          }/updateparking/:id`}
          element={<PrivateRoute Component={UpdateParking} />}
        />

        <Route
          path={`/:type${
            user && user.account_type === "partner" ? "/:partner_type" : ""
          }/book-rooms`}
          element={<PrivateRoute Component={HotelBooking} />}
        />
        <Route
          path={`/:type${
            user && user.account_type === "partner" ? "/:partner_type" : ""
          }/book-rooms`}
          element={<PrivateRoute Component={HotelParkingBooking} />}
        />
        <Route
          path={`/:type${
            user && user.account_type === "partner" ? "/:partner_type" : ""
          }/book-parking`}
          element={<PrivateRoute Component={ParkingBooking} />}
        />
      </Routes>
    </>
  );
}

export default App;
