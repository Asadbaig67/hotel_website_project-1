import React, { useState } from "react";
import style from "./HotelsList.module.css";
import DataTable from "../../Components/dataTable/dataTable";
import Sidebar from "../../Components/adminSidebar/Sidebar";
import Dropdown from "../../Components/Filterdropdown/FilterDropdown";
import { useLocation } from "react-router-dom";
import { useMediaQuery } from "@mui/material";
import { useDispatch } from "react-redux";
import {
  hotelsHeader,
  userHeader,
  bookingHeader,
  parkingHeader,
  hotelAndParkingHeader,
} from "../../Utilis/DataTableSource";

const HotelsList = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const path = location.pathname.split("/")[1];
  let url = "";
  if (path === "hotels") {
    url = "http://localhost:5000/hotels/getallhotels";
    dispatch({ type: "SETHEADER", payload: hotelsHeader });
  } else if (path === "users") {
    url = "http://localhost:5000/user/getall";
    dispatch({ type: "SETHEADER", payload: userHeader });
  } else if (path === "booking") {
    url = "http://localhost:5000/booking/getBooking";
    dispatch({ type: "SETHEADER", payload: bookingHeader });
  } else if (path === "parkings") {
    url = "http://localhost:5000/parking/getallparkings";
    dispatch({ type: "SETHEADER", payload: parkingHeader });
  } else if (path === "HotelsAndParkings") {
    url = "http://localhost:5000/hotelandparking/getallhotelandparkings";
    dispatch({ type: "SETHEADER", payload: hotelAndParkingHeader });
  } else if (path === "hotelRequests") {
    url = "http://localhost:5000/hotels/getPendinghotels";
    dispatch({ type: "SETHEADER", payload: hotelsHeader });
  } else if (path === "parkingRequests") {
    url = "http://localhost:5000/parking/getpendingparkings";
    dispatch({ type: "SETHEADER", payload: parkingHeader });
  } else if (path === "hotelAndParkingRequests") {
    url = "http://localhost:5000/hotelandparking/getPendinghotelandparkings";
    dispatch({ type: "SETHEADER", payload: hotelAndParkingHeader });
  }
  const IsMedium = useMediaQuery("(max-width:1000px)");
  const IsMobile = useMediaQuery("(max-width:768px)");

  return (
    <>
      <Sidebar />
      <div className={`row justify-content-center ${IsMedium ? "mt-5" : ""}`}>
        <div className="col-md-11">
          {path === "hotels" ? (
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
          ) : null}
        </div>
        {/* filters */}
        <div className="col-md-11 row justify-content-around my-3">
          <div className="col-md-12">
            <h2 className="fs-4 my-2">Filters</h2>
          </div>
          <div className={`col-md-2 ${IsMobile ? "my-2" : ""}`}>
            <Dropdown placeholder={"Filter by city"} name={"FilterByCity"} />
          </div>
          <div className={`col-md-2 ${IsMobile ? "my-2" : ""}`}>
            <Dropdown placeholder={"Filter by city"} name={"FilterByCity"} />
          </div>
          <div className={`col-md-2 ${IsMobile ? "my-2" : ""}`}>
            <Dropdown placeholder={"Filter by city"} name={"FilterByCity"} />
          </div>
          <div className={`col-md-2 ${IsMobile ? "my-2" : ""}`}>
            <Dropdown placeholder={"Filter by city"} name={"FilterByCity"} />
          </div>
          <div className={`col-md-2 ${IsMobile ? "my-2" : ""}`}>
            <Dropdown placeholder={"Filter by city"} name={"FilterByCity"} />
          </div>
        </div>

        {/* results */}
        <div className="col-md-11">
          <div className="col-md-12">
            <h2 className="fs-4 my-2">Results</h2>
          </div>
          <DataTable url={url} path={path}/>
        </div>
      </div>
    </>
  );
};

export default HotelsList;
