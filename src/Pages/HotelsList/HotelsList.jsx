import React, { useEffect, useState } from "react";
import style from "./HotelsList.module.css";
import DataTable from "../../Components/dataTable/dataTable";
import Sidebar from "../../Components/adminSidebar/Sidebar";
// import Dropdown from "../../Components/Filterdropdown/FilterDropdown";
// import DropdownFilter from "../../Components/dropdownFilter/Dropdown";
import { useLocation } from "react-router-dom";
import { useMediaQuery } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
// import axios from "axios";
import {
  hotelsHeader,
  userHeader,
  bookingHeader,
  parkingHeader,
  hotelAndParkingHeader,
  bookingHotelHeader,
  bookingParkingHeader,
  bookingHotelAndParkingHeader,
} from "../../Utilis/DataTableSource";

const HotelsList = () => {
  const { header } = useSelector((state) => state.setHeader);
  const { loggedinUser } = useSelector((state) => state.getLoggedInUser);
  const { user } = loggedinUser;
  const id = user._id;
  const IsSmalll = useMediaQuery("(max-width:768px)");
  const IsMobilee = useMediaQuery("(max-width:450px)");

  const dispatch = useDispatch();
  const location = useLocation();
  // const { disable } = useSelector((state) => state.disable);
  // const { disabled, name } = disable;
  const { view } = useSelector((state) => state.view);
  const path = location.pathname.split("/")[1];

  if (view === "admin") {
    if (path === "hotels") {
      dispatch({
        type: "SETURL",
        payload: "http://localhost:5000/hotels/getallhotels",
      });
      dispatch({ type: "SETHEADER", payload: hotelsHeader });
    } else if (path === "users") {
      dispatch({
        type: "SETURL",
        payload: "http://localhost:5000/user/getall",
      });
      dispatch({ type: "SETHEADER", payload: userHeader });
    } else if (path === "booking") {
      dispatch({
        type: "SETURL",
        payload: "http://localhost:5000/booking/getBooking",
      });
      dispatch({ type: "SETHEADER", payload: bookingHeader });
    } else if (path === "parkings") {
      dispatch({
        type: "SETURL",
        payload: "http://localhost:5000/parking/getallparkings",
      });
      dispatch({ type: "SETHEADER", payload: parkingHeader });
    } else if (path === "HotelsAndParkings") {
      dispatch({
        type: "SETURL",
        payload: "http://localhost:5000/hotelandparking/getallhotelandparkings",
      });
      dispatch({ type: "SETHEADER", payload: hotelAndParkingHeader });
    } else if (path === "hotelRequests") {
      dispatch({
        type: "SETURL",
        payload: "http://localhost:5000/hotels/getPendinghotels",
      });
      dispatch({ type: "SETHEADER", payload: hotelsHeader });
    } else if (path === "parkingRequests") {
      dispatch({
        type: "SETURL",
        payload: "http://localhost:5000/parking/getpendingparkings",
      });
      dispatch({ type: "SETHEADER", payload: parkingHeader });
    } else if (path === "hotelAndParkingRequests") {
      dispatch({
        type: "SETURL",
        payload:
          "http://localhost:5000/hotelandparking/getPendinghotelandparkings",
      });
      dispatch({ type: "SETHEADER", payload: hotelAndParkingHeader });
    }
  } else if (view === "partner") {
    if (path === "Property") {
      if (user.partner_type === "Hotel") {
        dispatch({
          type: "SETURL",
          payload: `http://localhost:5000/hotels/getApprovedhotelbyonwerid/${id}`,
        });
        dispatch({ type: "SETHEADER", payload: hotelsHeader });
      } else if (user.partner_type === "Parking") {
        dispatch({
          type: "SETURL",
          payload: `http://localhost:5000/parking/getApprovedParkingByOwnerId/${id}`,
        });
        dispatch({ type: "SETHEADER", payload: parkingHeader });
      } else if (user.partner_type === "HotelAndParking") {
        dispatch({
          type: "SETURL",
          payload: `http://localhost:5000/hotelandparking/getApprovedhotelandparkingbyownerid/${id}`,
        });
        dispatch({ type: "SETHEADER", payload: hotelAndParkingHeader });
      }
    } else if (path === "PropertyRequests") {
      if (user.partner_type === "Hotel") {
        dispatch({
          type: "SETURL",
          payload: `http://localhost:5000/hotels/getUnapprovedhotelbyonwerid/${id}`,
        });
        dispatch({ type: "SETHEADER", payload: hotelsHeader });
      } else if (user.partner_type === "Parking") {
        dispatch({
          type: "SETURL",
          payload: `http://localhost:5000/parking/getUnapprovedParkingByOwnerId/${id}`,
        });
        dispatch({ type: "SETHEADER", payload: parkingHeader });
      } else if (user.partner_type === "HotelAndParking") {
        dispatch({
          type: "SETURL",
          payload: `http://localhost:5000/hotelandparking/getUnapprovedhotelandparkingbyownerid/${id}`,
        });
        dispatch({ type: "SETHEADER", payload: hotelAndParkingHeader });
      }
    } else if (path === "booking") {
      if (user.partner_type === "Hotel") {
        dispatch({
          type: "SETURL",
          payload: `http://localhost:5000/booking/getBookingHotelByOwnerId/${id}`,
        });
        dispatch({ type: "SETHEADER", payload: bookingHotelHeader });
      } else if (user.partner_type === "Parking") {
        dispatch({
          type: "SETURL",
          payload: `http://localhost:5000/booking/getBookingParkingByOwnerId/${id}`,
        });
        dispatch({ type: "SETHEADER", payload: bookingParkingHeader });
      } else if (user.partner_type === "HotelAndParking") {
        dispatch({
          type: "SETURL",
          payload: `http://localhost:5000/booking/getBookingHotelandParkingByOwnerId/${id}`,
        });
        dispatch({ type: "SETHEADER", payload: bookingHotelAndParkingHeader });
      }
    } else if (path === "cancelbooking") {
      if (user.partner_type === "Hotel") {
        dispatch({
          type: "SETURL",
          payload: `http://localhost:5000/booking/getBookingHotelByOwnerId/${id}`,
        });
        dispatch({ type: "SETHEADER", payload: bookingHotelHeader });
      } else if (user.partner_type === "Parking") {
        dispatch({
          type: "SETURL",
          payload: `http://localhost:5000/booking/getBookingParkingByOwnerId/${id}`,
        });
        dispatch({ type: "SETHEADER", payload: bookingParkingHeader });
      } else if (user.partner_type === "HotelAndParking") {
        dispatch({
          type: "SETURL",
          payload: `http://localhost:5000/booking/getBookingHotelandParkingByOwnerId/${id}`,
        });
        dispatch({ type: "SETHEADER", payload: bookingHotelAndParkingHeader });
      }
    }
  } else if (view === "user") {
    if (path === "hotelbookings") {
      dispatch({
        type: "SETURL",
        payload: `http://localhost:5000/booking/getPreviousBookingHotelByUserId/${id}`,
      });
      dispatch({ type: "SETHEADER", payload: bookingHotelHeader });
    } else if (path === "parkingbookings") {
      dispatch({
        type: "SETURL",
        payload: `http://localhost:5000/booking/getPreviousBookingParkingByUserId/${id}`,
      });
      dispatch({ type: "SETHEADER", payload: bookingParkingHeader });
    } else if (path === "hotelandparkingbookings") {
      dispatch({
        type: "SETURL",
        payload: `http://localhost:5000/booking/getPreviousBookingHotelandParkingByUserId/${id}`,
      });
      dispatch({ type: "SETHEADER", payload: bookingHotelAndParkingHeader });
    } else if (path === "upcominghotelbookings") {
      dispatch({
        type: "SETURL",
        payload: `http://localhost:5000/booking/getUpcomingBookingHotelByUserId/${id}`,
      });
      dispatch({ type: "SETHEADER", payload: bookingHotelHeader });
    } else if (path === "upcomingparkingbookings") {
      dispatch({
        type: "SETURL",
        payload: `http://localhost:5000/booking/getUpcomingBookingParkingByUserId/${id}`,
      });
      dispatch({ type: "SETHEADER", payload: bookingParkingHeader });
    } else if (path === "upcominghotelandparkingbookings") {
      dispatch({
        type: "SETURL",
        payload: `http://localhost:5000/booking/getUpcomingBookingHotelandParkingByUserId/${id}`,
      });
      dispatch({ type: "SETHEADER", payload: bookingHotelAndParkingHeader });
    }
  }

  const IsMedium = useMediaQuery("(max-width:1000px)");
  const IsMobile = useMediaQuery("(max-width:768px)");
  // const option = ["City"];

  // const cityOption = [
  //   "Lahore",
  //   "Karachi",
  //   "Islamabad",
  //   "Dubai",
  //   "Tokyo",
  //   "London",
  //   "Paris",
  // ];
  // const hotelOption = [
  //   "Karachi",
  //   "Islamabad",
  //   "Dubai",
  //   "Tokyo",
  //   "London",
  //   "Paris",
  // ];
  // const parkingOption = [
  //   "Lahore",
  //   "Islamabad",
  //   "Dubai",
  //   "Tokyo",
  //   "London",
  //   "Paris",
  // ];
  // const hotelParkingOption = [
  //   "Lahore",
  //   "Karachi",
  //   "Dubai",
  //   "Tokyo",
  //   "London",
  //   "Paris",
  // ];

  const Addnew = () => {
    if (
      path === "hotels" ||
      path === "hotelRequests" ||
      (path === "Property" && user.partner_type === "Hotel") ||
      (path === "PropertyRequests" && user.partner_type === "Hotel")
    ) {
      window.location.href = "/hotelform";
    } else if (path === "users") {
      window.location.href = "/adduser";
    } else if (path === "booking") {
      window.location.href = "/addbooking";
    } else if (
      path === "parkings" ||
      path === "parkingRequests" ||
      (path === "Property" && user.partner_type === "Parking") ||
      (path === "PropertyRequests" && user.partner_type === "Parking")
    ) {
      window.location.href = "/parkingform";
    } else if (
      path === "HotelsAndParkings" ||
      path === "hotelAndParkingRequests" ||
      (path === "Property" && user.partner_type === "HotelAndParking") ||
      (path === "PropertyRequests" && user.partner_type === "HotelAndParking")
    ) {
      window.location.href = "/hotelparkingform";
    }
  };

  return (
    <>
      <Sidebar />
      <div
        className={`row justify-content-center ${IsMedium ? "mt-5" : ""}`}
        style={{
          marginLeft: IsMedium ? "30px" : IsMobilee ? "45" : "20px",
          marginTop: "77px",
        }}
      >
        <div className="col-md-11 d-flex align-items-end">
          {view === "admin" ? (
            path === "hotels" ? (
              <h2 className="fs-1 mb-2 mt-4">Hotels</h2>
            ) : path === "users" ? (
              <h2 className="fs-1 mb-2 mt-4">Users</h2>
            ) : path === "booking" ? (
              <h2 className="fs-1 mb-2 mt-4">Bookings</h2>
            ) : path === "parkings" ? (
              <h2 className="fs-1 mb-2 mt-4">Parkings</h2>
            ) : path === "HotelsAndParkings" ? (
              <h2 className="fs-1 mb-2 mt-4">Hotels and Parkings</h2>
            ) : path === "hotelRequests" ? (
              <h2 className="fs-1 mb-2 mt-4">Pending Hotels</h2>
            ) : path === "parkingRequests" ? (
              <h2 className="fs-1 mb-2 mt-4">Pending Parkings</h2>
            ) : path === "hotelAndParkingRequests" ? (
              <h2 className="fs-1 mb-2 mt-4">Pending Hotels And Parkings</h2>
            ) : null
          ) : view === "partner" ? (
            path === "Property" ? (
              user.partner_type === "Hotel" ? (
                <h2 className="fs-1 mb-2 mt-4">My Hotels</h2>
              ) : user.partner_type === "Parking" ? (
                <h2 className="fs-1 mb-2 mt-4">My Parkings</h2>
              ) : user.partner_type === "HotelAndParking" ? (
                <h2 className="fs-1 mb-2 mt-4">My Hotels and Parking</h2>
              ) : null
            ) : path === "booking" ? (
              user.partner_type === "Hotel" ? (
                <h2 className="fs-1 mb-2 mt-4">My Hotels Bookings</h2>
              ) : user.partner_type === "Parking" ? (
                <h2 className="fs-1 mb-2 mt-4">My Parkings Bookings</h2>
              ) : user.partner_type === "HotelAndParking" ? (
                <h2 className="fs-1 mb-2 mt-4">
                  My Hotels and Parking Bookings
                </h2>
              ) : null
            ) : path === "PropertyRequests" ? (
              user.partner_type === "Hotel" ? (
                <h2 className="fs-1 mb-2 mt-4">Pending Hotels</h2>
              ) : user.partner_type === "Parking" ? (
                <h2 className="fs-1 mb-2 mt-4">Pending Parkings</h2>
              ) : user.partner_type === "HotelAndParking" ? (
                <h2 className="fs-1 mb-2 mt-4">Pending Hotels And Parkings</h2>
              ) : null
            ) : null
          ) : view === "user" ? (
            path === "hotelbookings" ? (
              <h2 className="fs-1 mb-2 mt-4">My Hotel Bookings</h2>
            ) : path === "parkingbookings" ? (
              <h2 className="fs-1 mb-2 mt-4">My Parking Bookings</h2>
            ) : path === "hotelandparkingbookings" ? (
              <h2 className="fs-1 mb-2 mt-4">My Hotel and Parking Bookings</h2>
            ) : path === "upcominghotelbookings" ? (
              <h2 className="fs-1 mb-2 mt-4">Upcoming Hotel Bookings</h2>
            ) : path === "upcomingparkingbookings" ? (
              <h2 className="fs-1 mb-2 mt-4">Upcoming Parking Bookings</h2>
            ) : path === "upcominghotelandparkingbookings" ? (
              <h2 className="fs-1 mb-2 mt-4">
                Upcoming Hotel and Parking Bookings
              </h2>
            ) : null
          ) : null}

          {/* <div
            style={{ width: "37%" }}
            className="d-flex ms-auto mb-2 p-2 me-4 bg-white rounded-5 shadow align-items-center"
          >
            <div style={{ width: "58%" }}>
              <DropdownFilter
                placeholder={`Filter by type`}
                dropdown={"subtype"}
                disable={disabled}
                options={
                  name === "City"
                    ? cityOption.sort()
                    : name === "Hotel Name"
                    ? hotelOption.sort()
                    : name === "Parking Name"
                    ? parkingOption.sort()
                    : name === "Hotel And Parking Name"
                    ? hotelParkingOption.sort()
                    : option
                }
              />
            </div>
            <div style={{ width: "40%" }} className="ms-auto">
              <DropdownFilter
                placeholder={"Filter type"}
                disable={false}
                dropdown={"type"}
                options={
                  path === "hotels" || path === "hotelRequests"
                    ? [...option, "Hotel Name"]
                    : path === "parkings" || path === "parkingRequests"
                    ? [...option, "Parking Name"]
                    : path === "HotelsAndParkings" ||
                      path === "hotelAndParkingRequests"
                    ? [...option, "Hotel And Parking Name"]
                    : path === "booking"
                    ? [
                        ...option,
                        "Hotel Name",
                        "Parking Name",
                        "Hotel And Parking Name",
                      ]
                    : option
                }
              />
            </div>
          </div> */}
        </div>
        {/* results */}
        <div className="col-md-11">
          <div className="col-md-12">
            <div className="d-flex me-2 mb-3 align-items-end">
              <h2 className="fs-4 my-0">Results</h2>

              <button
                className="btn btn-primary fw-bold ms-auto me-3 "
                onClick={Addnew}
              >
                Add new
              </button>
            </div>
          </div>
          <DataTable path={path} user={user} />
        </div>
      </div>
    </>
  );
};

export default HotelsList;
