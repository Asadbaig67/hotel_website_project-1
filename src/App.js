import "./App.css";
import { Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import Contact from "./Pages/Contact/Contact";
import About from "./Pages/About Us/About";
import Home from "./Pages/Home/Home";
import Hotel from "./Pages/hotel/Hotel";
import Signin from "./Pages/Signin/Signin";
import Signup from "./Pages/Signup/Signup";
import Forgetpass from "./Pages/Forgetpassword/Forgetpass";
import Changepassword from "./Pages/ChangePassword/Changepassword";
import List from "./Pages/list/List";
import Parking from "./Pages/Parking Section/Parking";
import ParkingList from "./Pages/ParkingList/ParkingList";
import HotelAndParking from "./Pages/HotelAndParking/HotelAndParking";
import Reactmaps from "./Components/Map/reactMaps";
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
import Viewbookings from "./Pages/BookingDetails/Viewbookings";
import Viewproperty from "./Pages/ViewProperty/Viewproperty";
import AdminBookings from "./Pages/BookingDetails/AdminBookings";
import AddOperatingCities from "./Pages/AddOperatingCities/AddOperatingCities";
import Errorpage from "./Pages/Errorpage/Errorpage";
import PrivateRoute from "./Components/Routes/PrivateRoute";
import PublicRoute from "./Components/Routes/PublicRoute";
import AdminRoute from "./Components/Routes/AdminRoute";
import NotFoundRoute from "./Components/Routes/NotFoundRoute";

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
          path="/parking/ParkingList/:city"
          element={<PrivateRoute Component={ParkingPropertyDetails} />}
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
          element={<AdminRoute Component={Dashboard} />}
        />
        <Route
          path={`/:type${
            user && user.account_type === "partner" ? "/:partner_type" : ""
          }/profile`}
          element={<AdminRoute Component={Profile} />}
        />
        <Route
          path={`/:type${
            user && user.account_type === "partner" ? "/:partner_type" : ""
          }/operatingcities`}
          element={<AdminRoute Component={AddOperatingCities} />}
        />

        <Route
          path={`/:type${
            user && user.account_type === "partner" ? "/:partner_type" : ""
          }/hotels`}
          element={<AdminRoute Component={HotelsList} />}
        />
        <Route
          path={`/:type${
            user && user.account_type === "partner" ? "/:partner_type" : ""
          }/deListedHotels`}
          element={<AdminRoute Component={HotelsList} />}
        />
        <Route
          path={`/:type${
            user && user.account_type === "partner" ? "/:partner_type" : ""
          }/deListedParkings`}
          element={<AdminRoute Component={HotelsList} />}
        />
        <Route
          path={`/:type${
            user && user.account_type === "partner" ? "/:partner_type" : ""
          }/deListedHotelAndParking`}
          element={<AdminRoute Component={HotelsList} />}
        />
        <Route
          path={`/:type${
            user && user.account_type === "partner" ? "/:partner_type" : ""
          }/delistedProperties`}
          element={<AdminRoute Component={HotelsList} />}
        />
        <Route
          path={`/:type${
            user && user.account_type === "partner" ? "/:partner_type" : ""
          }/users`}
          element={<AdminRoute Component={HotelsList} />}
        />
        <Route
          path={`/:type${
            user && user.account_type === "partner" ? "/:partner_type" : ""
          }/booking`}
          element={<AdminRoute Component={HotelsList} />}
        />
        <Route
          path={`/:type${
            user && user.account_type === "partner" ? "/:partner_type" : ""
          }/cancelbooking`}
          element={<AdminRoute Component={HotelsList} />}
        />
        <Route
          path={`/:type${
            user && user.account_type === "partner" ? "/:partner_type" : ""
          }/hotelRequests`}
          element={<AdminRoute Component={HotelsList} />}
        />
        <Route
          path={`/:type${
            user && user.account_type === "partner" ? "/:partner_type" : ""
          }/parkingRequests`}
          element={<AdminRoute Component={HotelsList} />}
        />
        <Route
          path={`/:type${
            user && user.account_type === "partner" ? "/:partner_type" : ""
          }/hotelAndParkingRequests`}
          element={<AdminRoute Component={HotelsList} />}
        />
        <Route
          path={`/:type${
            user && user.account_type === "partner" ? "/:partner_type" : ""
          }/HotelsAndParkings`}
          element={<AdminRoute Component={HotelsList} />}
        />
        <Route
          path={`/:type${
            user && user.account_type === "partner" ? "/:partner_type" : ""
          }/parkings`}
          element={<AdminRoute Component={HotelsList} />}
        />
        <Route
          path={`/:type${
            user && user.account_type === "partner" ? "/:partner_type" : ""
          }/property`}
          element={<AdminRoute Component={HotelsList} />}
        />
        <Route
          path={`/:type${
            user && user.account_type === "partner" ? "/:partner_type" : ""
          }/PropertyRequests`}
          element={<AdminRoute Component={HotelsList} />}
        />
        <Route
          path={`/:type${
            user && user.account_type === "partner" ? "/:partner_type" : ""
          }/bookingRequests`}
          element={<AdminRoute Component={HotelsList} />}
        />
        <Route
          path={`/:type${
            user && user.account_type === "partner" ? "/:partner_type" : ""
          }/hotelbookings`}
          element={<AdminRoute Component={HotelsList} />}
        />
        <Route
          path={`/:type${
            user && user.account_type === "partner" ? "/:partner_type" : ""
          }/parkingbookings`}
          element={<AdminRoute Component={HotelsList} />}
        />
        <Route
          path={`/:type${
            user && user.account_type === "partner" ? "/:partner_type" : ""
          }/hotelandparkingbookings`}
          element={<AdminRoute Component={HotelsList} />}
        />
        <Route
          path={`/:type${
            user && user.account_type === "partner" ? "/:partner_type" : ""
          }/upcominghotelbookings`}
          element={<AdminRoute Component={HotelsList} />}
        />
        <Route
          path={`/:type${
            user && user.account_type === "partner" ? "/:partner_type" : ""
          }/upcomingparkingbookings`}
          element={<AdminRoute Component={HotelsList} />}
        />
        <Route
          path={`/:type${
            user && user.account_type === "partner" ? "/:partner_type" : ""
          }/upcominghotelandparkingbookings`}
          element={<AdminRoute Component={HotelsList} />}
        />
        <Route
          path={`/:type${
            user && user.account_type === "partner" ? "/:partner_type" : ""
          }/ongoingbooking`}
          element={<AdminRoute Component={HotelsList} />}
        />
        <Route
          path={`/:type${
            user && user.account_type === "partner" ? "/:partner_type" : ""
          }/upcomingbooking`}
          element={<AdminRoute Component={HotelsList} />}
        />
        <Route
          path={`/:type${
            user && user.account_type === "partner" ? "/:partner_type" : ""
          }/previousbooking`}
          element={<AdminRoute Component={HotelsList} />}
        />

        <Route
          path={`/:type${
            user && user.account_type === "partner" ? "/:partner_type" : ""
          }/:path/viewbooking`}
          element={<AdminRoute Component={AdminBookings} />}
        />
        <Route
          path={`/:type${
            user && user.account_type === "partner" ? "/:partner_type" : ""
          }/:path/view`}
          element={<AdminRoute Component={Viewproperty} />}
        />

        <Route
          path={`/:type${
            user && user.account_type === "partner" ? "/:partner_type" : ""
          }/hotelform`}
          element={<AdminRoute Component={AddHotelForm} />}
        />
        <Route
          path={`/:type${
            user && user.account_type === "partner" ? "/:partner_type" : ""
          }/parkingform`}
          element={<AdminRoute Component={AddParkingForm} />}
        />

        <Route
          path={`/:type${
            user && user.account_type === "partner" ? "/:partner_type" : ""
          }/profiledata`}
          element={<AdminRoute Component={ProfileDataForm} />}
        />
        <Route path="/maps" element={<Reactmaps />} />
        <Route
          path={`/:type${
            user && user.account_type === "partner" ? "/:partner_type" : ""
          }/hotelform`}
          element={<AdminRoute Component={AddHotelForm} />}
        />
        <Route
          path={`/:type${
            user && user.account_type === "partner" ? "/:partner_type" : ""
          }/parkingform`}
          element={<AdminRoute Component={AddParkingForm} />}
        />
        <Route
          path={`/:type${
            user && user.account_type === "partner" ? "/:partner_type" : ""
          }/hotelparkingform`}
          element={<AdminRoute Component={AddHotelParkingForm} />}
        />
        <Route
          path={`/:type${
            user && user.account_type === "partner" ? "/:partner_type" : ""
          }/roomform`}
          element={<AdminRoute Component={AddRoomForm} />}
        />
        <Route
          path={`/:type${
            user && user.account_type === "partner" ? "/:partner_type" : ""
          }/updatehotel/:id`}
          element={<AdminRoute Component={UpdateHotel} />}
        />
        <Route
          path={`/:type${
            user && user.account_type === "partner" ? "/:partner_type" : ""
          }/updatehotelandparking/:id`}
          element={<AdminRoute Component={UpdateHotelAndParking} />}
        />
        <Route
          path={`/:type${
            user && user.account_type === "partner" ? "/:partner_type" : ""
          }/updateparking/:id`}
          element={<AdminRoute Component={UpdateParking} />}
        />

        <Route
          path={`/:type${
            user && user.account_type === "partner" ? "/:partner_type" : ""
          }/book-rooms`}
          element={<AdminRoute Component={HotelBooking} />}
        />
        <Route
          path={`/:type${
            user && user.account_type === "partner" ? "/:partner_type" : ""
          }/book-rooms`}
          element={<AdminRoute Component={HotelParkingBooking} />}
        />
        <Route
          path={`/:type${
            user && user.account_type === "partner" ? "/:partner_type" : ""
          }/book-parking`}
          element={<AdminRoute Component={ParkingBooking} />}
        />
        <Route path="*" element={<NotFoundRoute Component={Dashboard} />} />
      </Routes>
    </>
  );
}

export default App;
