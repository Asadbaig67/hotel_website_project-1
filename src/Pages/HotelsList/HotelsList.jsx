import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import ReactDataTable from "../../Components/ReactDataTable/ReactDataTable";
import AdminNav from "../../Components/AdminNavbar/AdminNav";

import {
  hotelsHeader1,
  userHeader1,
  bookingHeader1,
  parkingHeader1,
  hotelAndParkingHeader1,
  bookingHotelHeader1,
  bookingParkingHeader1,
  bookingHotelAndParkingHeader1,
} from "../../Utilis/DataTableSource";
import Sidebar from "../../Components/Sidebar/SideBar";

const HotelsList = () => {
  const navigate = useNavigate();
  const api = process.env.REACT_APP_BACKEND_URL_LOCAL;
  const { loggedinUser } = useSelector((state) => state.getLoggedInUser);
  const { user } = loggedinUser;
  const id = user._id;

  const dispatch = useDispatch();
  const location = useLocation();

  const { view } = useSelector((state) => state.view);
  const path = location.pathname.split("/")[1];

  if (view === "admin") {
    if (path === "hotels") {
      dispatch({
        type: "SETURL",
        payload: `${api}/hotels/getallhotels`,
      });
      dispatch({ type: "SETHEADER", payload: hotelsHeader1 });
    } else if (path === "users") {
      dispatch({
        type: "SETURL",
        payload: `${api}/user/getall`,
      });
      dispatch({ type: "SETHEADER", payload: userHeader1 });
    } else if (path === "booking") {
      dispatch({
        type: "SETURL",
        payload: `${api}/booking/getBooking`,
      });
      dispatch({ type: "SETHEADER", payload: bookingHeader1 });
    } else if (path === "parkings") {
      dispatch({
        type: "SETURL",
        payload: `${api}/parking/getallparkings`,
      });
      dispatch({ type: "SETHEADER", payload: parkingHeader1 });
    } else if (path === "HotelsAndParkings") {
      dispatch({
        type: "SETURL",
        payload: `${api}/hotelandparking/getallhotelandparkings`,
      });
      dispatch({ type: "SETHEADER", payload: hotelAndParkingHeader1 });
    } else if (path === "hotelRequests") {
      dispatch({
        type: "SETURL",
        payload: `${api}/hotels/getPendinghotels`,
      });
      dispatch({ type: "SETHEADER", payload: hotelsHeader1 });
    } else if (path === "parkingRequests") {
      dispatch({
        type: "SETURL",
        payload: `${api}/parking/getpendingparkings`,
      });
      dispatch({ type: "SETHEADER", payload: parkingHeader1 });
    } else if (path === "hotelAndParkingRequests") {
      dispatch({
        type: "SETURL",
        payload: `${api}/hotelandparking/getPendinghotelandparkings`,
      });
      dispatch({ type: "SETHEADER", payload: hotelAndParkingHeader1 });
    } else if (path === "cancelbooking") {
      dispatch({
        type: "SETURL",
        payload: `${api}/booking/getCancelledBookings`,
      });
      dispatch({ type: "SETHEADER", payload: bookingHeader1 });
    }
  } else if (view === "partner") {
    if (path === "Property") {
      if (user.partner_type === "Hotel") {
        dispatch({
          type: "SETURL",
          payload: `${api}/hotels/getApprovedhotelbyonwerid/${id}`,
        });
        dispatch({ type: "SETHEADER", payload: hotelsHeader1 });
      } else if (user.partner_type === "Parking") {
        dispatch({
          type: "SETURL",
          payload: `${api}/parking/getApprovedParkingByOwnerId/${id}`,
        });
        dispatch({ type: "SETHEADER", payload: parkingHeader1 });
      } else if (user.partner_type === "HotelAndParking") {
        dispatch({
          type: "SETURL",
          payload: `${api}/hotelandparking/getApprovedhotelandparkingbyownerid/${id}`,
        });
        dispatch({ type: "SETHEADER", payload: hotelAndParkingHeader1 });
      }
    } else if (path === "PropertyRequests") {
      if (user.partner_type === "Hotel") {
        dispatch({
          type: "SETURL",
          payload: `${api}/hotels/getUnapprovedhotelbyonwerid/${id}`,
        });
        dispatch({ type: "SETHEADER", payload: hotelsHeader1 });
      } else if (user.partner_type === "Parking") {
        dispatch({
          type: "SETURL",
          payload: `${api}/parking/getUnapprovedParkingByOwnerId/${id}`,
        });
        dispatch({ type: "SETHEADER", payload: parkingHeader1 });
      } else if (user.partner_type === "HotelAndParking") {
        dispatch({
          type: "SETURL",
          payload: `${api}/hotelandparking/getUnapprovedhotelandparkingbyownerid/${id}`,
        });
        dispatch({ type: "SETHEADER", payload: hotelAndParkingHeader1 });
      }
    } else if (path === "booking") {
      if (user.partner_type === "Hotel") {
        dispatch({
          type: "SETURL",
          payload: `${api}/booking/getBookingHotelByOwnerId/${id}`,
        });
        dispatch({ type: "SETHEADER", payload: bookingHotelHeader1 });
      } else if (user.partner_type === "Parking") {
        dispatch({
          type: "SETURL",
          payload: `${api}/booking/getBookingParkingByOwnerId/${id}`,
        });
        dispatch({ type: "SETHEADER", payload: bookingParkingHeader1 });
      } else if (user.partner_type === "HotelAndParking") {
        dispatch({
          type: "SETURL",
          payload: `${api}/booking/getBookingHotelandParkingByOwnerId/${id}`,
        });
        dispatch({ type: "SETHEADER", payload: bookingHotelAndParkingHeader1 });
      }
    } else if (path === "cancelbooking") {
      if (user.partner_type === "Hotel") {
        dispatch({
          type: "SETURL",
          payload: `${api}/booking/getCancelledBookingsByHotelOwnerId/${id}`,
        });
        dispatch({ type: "SETHEADER", payload: bookingHotelHeader1 });
      } else if (user.partner_type === "Parking") {
        dispatch({
          type: "SETURL",
          payload: `${api}/booking/getCancelledBookingsByParkingOwnerId/${id}`,
        });
        dispatch({ type: "SETHEADER", payload: bookingParkingHeader1 });
      } else if (user.partner_type === "HotelAndParking") {
        dispatch({
          type: "SETURL",
          payload: `${api}/booking/getCancelledBookingsByHotelAndParkingOwnerId/${id}`,
        });
        dispatch({ type: "SETHEADER", payload: bookingHotelAndParkingHeader1 });
      }
    } else if (path === "bookingRequests") {
      if (user.partner_type === "Hotel") {
        dispatch({
          type: "SETURL",
          payload: `${api}/booking/getUpcommingBookingsByHotelOwnerId/${id}`,
        });
        dispatch({ type: "SETHEADER", payload: bookingHotelHeader1 });
      } else if (user.partner_type === "Parking") {
        dispatch({
          type: "SETURL",
          payload: `${api}/booking/getUpcommingBookingsByParkingOwnerId/${id}`,
        });
        dispatch({ type: "SETHEADER", payload: bookingParkingHeader1 });
      } else if (user.partner_type === "HotelAndParking") {
        dispatch({
          type: "SETURL",
          payload: `${api}/booking/getUpcommingBookingsByHotelparkingOwnerId/${id}`,
        });
        dispatch({ type: "SETHEADER", payload: bookingHotelAndParkingHeader1 });
      }
    }
  } else if (view === "user") {
    if (path === "hotelbookings") {
      dispatch({
        type: "SETURL",
        payload: `${api}/booking/getPreviousBookingHotelByUserId/${id}`,
      });
      dispatch({ type: "SETHEADER", payload: bookingHotelHeader1 });
    } else if (path === "parkingbookings") {
      dispatch({
        type: "SETURL",
        payload: `${api}/booking/getPreviousBookingParkingByUserId/${id}`,
      });
      dispatch({ type: "SETHEADER", payload: bookingParkingHeader1 });
    } else if (path === "hotelandparkingbookings") {
      dispatch({
        type: "SETURL",
        payload: `${api}/booking/getPreviousBookingHotelandParkingByUserId/${id}`,
      });
      dispatch({ type: "SETHEADER", payload: bookingHotelAndParkingHeader1 });
    } else if (path === "upcominghotelbookings") {
      dispatch({
        type: "SETURL",
        payload: `${api}/booking/getUpcomingBookingHotelByUserId/${id}`,
      });
      dispatch({ type: "SETHEADER", payload: bookingHotelHeader1 });
    } else if (path === "upcomingparkingbookings") {
      dispatch({
        type: "SETURL",
        payload: `${api}/booking/getUpcomingBookingParkingByUserId/${id}`,
      });
      dispatch({ type: "SETHEADER", payload: bookingParkingHeader1 });
    } else if (path === "upcominghotelandparkingbookings") {
      dispatch({
        type: "SETURL",
        payload: `${api}/booking/getUpcomingBookingHotelandParkingByUserId/${id}`,
      });
      dispatch({ type: "SETHEADER", payload: bookingHotelAndParkingHeader1 });
    } else if (path === "cancelbooking") {
      dispatch({
        type: "SETURL",
        payload: `${api}/booking/getCancelledBookingsByUserId/${id}`,
      });
      dispatch({ type: "SETHEADER", payload: bookingHeader1 });
    }
  }

  const Addnew = () => {
    if (
      path === "hotels" ||
      path === "hotelRequests" ||
      (path === "Property" && user.partner_type === "Hotel") ||
      (path === "PropertyRequests" && user.partner_type === "Hotel")
    ) {
      navigate("/hotelform");
    } else if (path === "users") {
      navigate("/adduser");
    } else if (
      path === "hotelbookings" ||
      path === "upcominghotelbookings" ||
      path === "cancelbooking"
    ) {
    } else if (
      path === "parkingbookings" ||
      path === "upcomingparkingbookings"
    ) {
      navigate("/parking");
    } else if (
      path === "hotelandparkingbookings" ||
      path === "upcominghotelandparkingbookings"
    ) {
      navigate("/HotelAndParking");
    } else if (
      path === "parkings" ||
      path === "parkingRequests" ||
      (path === "Property" && user.partner_type === "Parking") ||
      (path === "PropertyRequests" && user.partner_type === "Parking")
    ) {
      navigate("/parkingform");
    } else if (
      path === "HotelsAndParkings" ||
      path === "hotelAndParkingRequests" ||
      (path === "Property" && user.partner_type === "HotelAndParking") ||
      (path === "PropertyRequests" && user.partner_type === "HotelAndParking")
    ) {
      navigate("/hotelparkingform");
    }
  };

  return (
    <>
      <div>
        <AdminNav />
      </div>
      <div className="d-flex" style={{ background: "#fff" }}>
        <Sidebar />
        <div
          className="container-fluid"
          style={{ marginTop: "70px", marginLeft: "25px" }}
        >
          <div className="row">
            <div className="col-md-12"></div>
            <div className="col-md-12">
              <div className="row">
                <div className="col-md-12">
                  <div className="table-responsive row">
                    <ReactDataTable path={path} user={user} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HotelsList;
