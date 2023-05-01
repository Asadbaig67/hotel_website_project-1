import React, { useState } from "react";
import Sidebar from "../../Components/adminSidebar/Sidebar";
import style from "./Dashboard.module.css";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useDispatch, useSelector } from "react-redux";
import { adminCard, patnerCard, userCard } from "../../Utilis/DashboardData";
import { useMediaQuery } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import DashboardDataTable from "../../Components/dashboardDataTable/dashboardDataTable";
import { dashboardOperatingCityHeader } from "../../Utilis/DataTableSource";

export default function Dashboard() {
  const { header } = useSelector((state) => state.setHeader);
  const dispatch = useDispatch();
  dispatch({ type: "SETHEADER", payload: dashboardOperatingCityHeader });

  const { loggedinUser } = useSelector((state) => state.getLoggedInUser);
  const { user } = loggedinUser;
  const id = user._id;
  const location = useLocation();
  const path = location.pathname.split("/")[1];

  const { mode } = useSelector((state) => state.mode);
  const { view } = useSelector((state) => state.view);
  const IsLarge = useMediaQuery("(max-width:1400px)");
  const IsMedium = useMediaQuery("(max-width:1000px)");
  const IsSmall = useMediaQuery("(max-width:768px)");
  const IsMobile = useMediaQuery("(max-width:450px)");
  const [addHotelOperatingCity, setaddHotelOperatingCity] = useState(false);
  const [addParkingOperatingCity, setaddParkingOperatingCity] = useState(false);
  const [addHotelAndParkingOperatingCity, setaddHotelAndParkingOperatingCity] =
    useState(false);
  const [name, setName] = useState("");

  const card = (argument) => {
    return argument.map((element) => {
      return (
        <div className="col-md-5" key={element.key}>
          <div className={style.wrapper}>
            <Link className={`${style.card1} rounded-3`} to={element.link}>
              <h3>{element.title}</h3>
              <p className="small">{element.description} </p>
              <Link className={style.go_corner} to={element.link}>
                <div className={style.go_arrow}>→</div>
              </Link>
            </Link>
          </div>
        </div>
      );
    });
  };

  const handleClick = async () => {
    let hotel = [],
      parking = [],
      hotelAndParking = [];
    if (addHotelOperatingCity) {
      hotel = await axios.put(
        `http://localhost:5000/OperatingProperty/addOperatingHotelCity`,
        { type: "Hotel", city: name }
      );
    }
    if (addParkingOperatingCity) {
      parking = await axios.put(
        `http://localhost:5000/OperatingProperty/addOperatingHotelCity`,
        { type: "Parking", city: name }
      );
    }
    if (addHotelAndParkingOperatingCity) {
      hotelAndParking = await axios.put(
        `http://localhost:5000/OperatingProperty/addOperatingHotelCity`,
        { type: "HotelAndParking", city: name }
      );
    }
    if (hotel || parking || hotelAndParking) {
      alert("Successfully added");
    }
  };

  return (
    <>
      <Sidebar />
      <div
        className={`${IsMedium ? "mt-5" : ""}`}
        style={{
          marginTop: IsLarge
            ? "80px"
            : IsMedium
            ? "100px"
            : IsSmall
            ? "120px"
            : IsMobile
            ? "200px"
            : "80px",
        }}
      >
        <div className="col-md-10 ms-auto mt-4">
          <h1
            className={`text-right fs-1 text-${
              mode === "light" ? "dark" : "light"
            }`}
          >
            Dashboard
          </h1>
        </div>

        <div className={`row justify-content-center mt-4`}>
          {view === "admin"
            ? card(adminCard)
            : view === "patner"
            ? card(patnerCard)
            : card(userCard)}
        </div>
      </div>

      {/* Add operating cities */}
      {view === "admin" && (
        <div>
          <div>
            <div className="container pb-3">
              <div className="row justify-content-center flex align-items-end">
                <div className="col-md-10">
                  <h1 className="fs-1 fw-bold">Add Cities</h1>
                  <p>Grow up your business by adding new operating cities</p>
                </div>
                <div className="col-md-3 mt-3">
                  <input
                    type="text"
                    className="w-100 btn-outline-dark rounded-5"
                    placeholder="Enter city name"
                    onChange={(e) => {
                      setName(e.target.value);
                      console.log(name);
                    }}
                  />
                </div>
                <div className="col-md-2">
                  <button
                    disabled={
                      !addHotelOperatingCity &&
                      !addParkingOperatingCity &&
                      !addHotelAndParkingOperatingCity
                    }
                    className="btn btn-dark rounded-5 w-100"
                    onClick={handleClick}
                  >
                    Add Operating City
                  </button>
                </div>
                <div className="row mt-2 justify-content-center">
                  <div className="col-md-1">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value=""
                        id="flexCheckDefault1"
                        onClick={() => {
                          setaddHotelOperatingCity(!addHotelOperatingCity);
                        }}
                      />
                      <label
                        className="form-check-label fs-6"
                        htmlFor="flexCheckDefault1"
                      >
                        Hotel
                      </label>
                    </div>
                  </div>
                  <div className="col-md-1">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value=""
                        id="flexCheckDefault2"
                        onClick={() => {
                          setaddParkingOperatingCity(!addParkingOperatingCity);
                        }}
                      />
                      <label
                        className="form-check-label fs-6"
                        htmlFor="flexCheckDefault2"
                      >
                        Parking
                      </label>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value=""
                        id="flexCheckDefault3"
                        onClick={() => {
                          setaddHotelAndParkingOperatingCity(
                            !addHotelAndParkingOperatingCity
                          );
                        }}
                      />
                      <label
                        className="form-check-label fs-6"
                        htmlFor="flexCheckDefault3"
                      >
                        Hotel And Parking
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="container">
            <div className="row justify-content-center">
              <div className="col-md-5">
                <h1 className="fw-semibold my-2">Operating Hotels cities</h1>
                <DashboardDataTable
                  path={path}
                  user={user}
                  type={"hotel"}
                  url={`http://localhost:5000/OperatingProperty/getHotelOperatingCityObj`}
                />
              </div>
              <div className="col-md-5">
                <h1 className="fw-semibold my-2">Operating Parking cities</h1>
                <DashboardDataTable
                  path={path}
                  user={user}
                  type={"parking"}
                  url={`http://localhost:5000/OperatingProperty/getParkingOperatingCityObj`}
                />
              </div>
              <div className="col-md-5">
                <h1 className="fw-semibold my-2">
                  Operating Hotel and Parking cities
                </h1>
                <DashboardDataTable
                  path={path}
                  user={user}
                  type={"hotelAndParking"}
                  url={`http://localhost:5000/OperatingProperty/getHotelAndParkingOperatingCityObj`}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
