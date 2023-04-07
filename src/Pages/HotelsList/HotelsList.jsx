import React from "react";
import style from "./HotelsList.module.css";
import DataTable from "../../Components/dataTable/dataTable";
import Sidebar from "../../Components/adminSidebar/Sidebar";
import Dropdown from "../../Components/Filterdropdown/FilterDropdown";
import { useLocation } from "react-router-dom";
import { useMediaQuery } from "@mui/material";

const HotelsList = () => {
  const location = useLocation();
  const path = location.pathname.split("/")[1];
  let url = "";
  if (path === "hotels") {
    url = "http://localhost:5000/hotels/getallhotels";
  } else if (path === "users") {
    url = "http://localhost:5000/user/getall";
  } else if (path === "booking") {
    url = "http://localhost:5000/booking/getBooking";
  } else if (path === "parkings") {
    url = "http://localhost:5000/parking/getallparkings";
  } else if (path === "HotelsAndParkings") {
    url = "http://localhost:5000/hotelandparking/getallhotelandparkings";
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
          ) : (
            <h2 className="fs-1 mb-2 mt-4">Pending Requests</h2>
          )}
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
          <DataTable url={url} path={path} />
        </div>
      </div>
    </>
  );
};

export default HotelsList;
