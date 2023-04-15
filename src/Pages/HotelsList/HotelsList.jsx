import React, { useState } from "react";
import style from "./HotelsList.module.css";
import DataTable from "../../Components/dataTable/dataTable";
import Sidebar from "../../Components/adminSidebar/Sidebar";
// import Dropdown from "../../Components/Filterdropdown/FilterDropdown";
import DropdownFilter from "../../Components/dropdownFilter/Dropdown";
import { useLocation } from "react-router-dom";
import { useMediaQuery } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import {
  hotelsHeader,
  userHeader,
  bookingHeader,
  parkingHeader,
  hotelAndParkingHeader,
} from "../../Utilis/DataTableSource";

const HotelsList = () => {
  const IsSmalll = useMediaQuery("(max-width:768px)");
  const IsMobilee = useMediaQuery("(max-width:450px)");

  const dispatch = useDispatch();
  const location = useLocation();
  const { disable } = useSelector((state) => state.disable);
  const { disabled, name } = disable;
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
  const option = ["City"];

  const cityOption = [
    "Lahore",
    "Karachi",
    "Islamabad",
    "Dubai",
    "Tokyo",
    "London",
    "Paris",
  ];
  const hotelOption = [
    "Karachi",
    "Islamabad",
    "Dubai",
    "Tokyo",
    "London",
    "Paris",
  ];
  const parkingOption = [
    "Lahore",
    "Islamabad",
    "Dubai",
    "Tokyo",
    "London",
    "Paris",
  ];
  const hotelParkingOption = [
    "Lahore",
    "Karachi",
    "Dubai",
    "Tokyo",
    "London",
    "Paris",
  ];

  const Addnew = () => {
    if (path === "hotels" || path === "hotelRequests") {
      window.location.href = "/hotelform";
    } else if (path === "users") {
      window.location.href = "/adduser";
    } else if (path === "booking") {
      window.location.href = "/addbooking";
    } else if (path === "parkings" || path === "parkingRequests") {
      window.location.href = "/parkingform";
    } else if (
      path === "HotelsAndParkings" ||
      path === "hotelAndParkingRequests"
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
          <div
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
          </div>
        </div>
        {/* filters */}
        {/* <div className="col-md-11 row justify-content-around my-3">
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
        </div> */}

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
          <DataTable url={url} path={path} />
        </div>
      </div>
    </>
  );
};

export default HotelsList;
