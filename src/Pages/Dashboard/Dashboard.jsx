import React, { useEffect, useState } from "react";
import style from "./Dashboard.module.css";
import { useDispatch, useSelector } from "react-redux";
import { adminCard, patnerCard, userCard } from "../../Utilis/DashboardData";
import { Typography, useMediaQuery } from "@mui/material";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import DashboardDataTable from "../../Components/dashboardDataTable/dashboardDataTable";
import { dashboardOperatingCityHeader } from "../../Utilis/DataTableSource";
import HotelIcon from "@mui/icons-material/Hotel";
import LocalParkingIcon from "@mui/icons-material/LocalParking";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import AdminSidebar from "../../Components/adminSidebar/AdminSidebar";

export default function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  dispatch({ type: "SETHEADER", payload: dashboardOperatingCityHeader });

  const { loggedinUser } = useSelector((state) => state.getLoggedInUser);
  const { user } = loggedinUser;
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
  // const [adminCard, setAdminCard] = useState([]);
  // const [hotelCount, setHotelCount] = useState(0);
  // const [parkingCount, setParkingCount] = useState(0);
  // const [hotelAndParkingCount, setHotelAndParkingCount] = useState(0);

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
  const { count } = useSelector((state) => state.db_Collection_Count);

  // useEffect(async () => {
  //   let admin = [];
  //   await Promise.all(
  //     setInterval(async () => {
  //       try {
  //         const hotelNum = await axios.get(
  //           "http://localhost:5000/hotels/getallhotels"
  //         );

  //         const parkingNum = await axios.get(
  //           "http://localhost:5000/parking/getallparkings"
  //         );

  //         const hotelAndParkingNum = await axios.get(
  //           "http://localhost:5000/hotelandparking/getallhotelandparkings"
  //         );
  //         const bookingsNum = await axios.get(
  //           "http://localhost:5000/booking/getBooking"
  //         );
  //         dispatch({
  //           type: "SET_COLLECTION_COUNT",
  //           payload: {
  //             hotelNum: hotelNum.data.length,
  //             parkingNum: parkingNum.data.length,
  //             hotelAndParkingNum: hotelAndParkingNum.data.length,
  //             bookingsNum: bookingsNum.data.length,
  //           },
  //         });
  //       } catch (error) {
  //         console.log(error);
  //       }
  //     }, 300000)
  //   );
  //   admin = [
  //     {
  //       key: 1,
  //       title: "Total Approved Hotels",
  //       description: count.hotelNum,
  //       link: "/",
  //     },
  //     {
  //       key: 2,
  //       title: "Total Approved Parkings",
  //       description: count.parkingNum,
  //       link: "/",
  //     },
  //     {
  //       key: 3,
  //       title: "Total Approved Hotels and Parkings",
  //       description: count.hotelAndParkingNum,
  //       link: "/",
  //     },
  //     {
  //       key: 4,
  //       title: "Total Bokings",
  //       description: count.bookingsNum,
  //       link: "/",
  //     },
  //   ];
  //   setAdminCard(admin);
  //   console.log(admin);
  // }, []);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     let admin = [];
  //     try {
  //       const hotelNum = await axios.get(
  //         "http://localhost:5000/hotels/getallhotels"
  //       );

  //       const parkingNum = await axios.get(
  //         "http://localhost:5000/parking/getallparkings"
  //       );

  //       const hotelAndParkingNum = await axios.get(
  //         "http://localhost:5000/hotelandparking/getallhotelandparkings"
  //       );
  //       const bookingsNum = await axios.get(
  //         "http://localhost:5000/booking/getBooking"
  //       );
  //       setHotelCount(hotelNum.data.length);
  //       setParkingCount(parkingNum.data.length);
  //       setHotelAndParkingCount(hotelAndParkingNum.data.length);

  //       admin = [
  //         {
  //           key: 1,
  //           title: "Total Approved Hotels",
  //           description: hotelNum.data.length,
  //           link: "/",
  //         },
  //         {
  //           key: 2,
  //           title: "Total Approved Parkings",
  //           description: parkingNum.data.length,
  //           link: "/",
  //         },
  //         {
  //           key: 3,
  //           title: "Total Approved Hotels and Parkings",
  //           description: hotelAndParkingNum.data.length,
  //           link: "/",
  //         },
  //         {
  //           key: 4,
  //           title: "Total Bokings",
  //           description: bookingsNum.data.length,
  //           link: "/",
  //         },
  //         {
  //           key: 5,
  //           title: "Total Approved Hotels",
  //           description: hotelNum.data.length,
  //           link: "/",
  //         },
  //         {
  //           key: 6,
  //           title: "Total Approved Parkings",
  //           description: parkingNum.data.length,
  //           link: "/",
  //         },
  //         {
  //           key: 7,
  //           title: "Total Approved Hotels and Parkings",
  //           description: hotelAndParkingNum.data.length,
  //           link: "/",
  //         },
  //         {
  //           key: 8,
  //           title: "Total Bokings",
  //           description: bookingsNum.data.length,
  //           link: "/",
  //         },
  //       ];
  //       setAdminCard(admin);
  //       console.log(admin);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };

  //   fetchData();
  // }, []);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const card = (argument) => {
    return argument.map((element) => {
      return (
        <div className="col-md-3" key={element.key}>
          <Link
            className={`${style.card1} rounded-3`}
            style={{ height: "85%" }}
            to={element.link}
          >
            <h3 className="h-50">{element.title}</h3>
            <p className="bold fs-1 text-end mt-4 mb-0">
              {element.description}
            </p>
            <Link className={style.go_corner} to={element.link}>
              <div className={style.go_arrow}>→</div>
            </Link>
          </Link>
        </div>
      );
    });
  };

  return (
    <>
      <div className="d-flex">
        <AdminSidebar />
        <div className="mt-5">
          <div
          // className={`${IsMedium ? "mt-5" : ""}`}
          // style={{
          //   marginTop: IsLarge
          //     ? "80px"
          //     : IsMedium
          //     ? "100px"
          //     : IsSmall
          //     ? "120px"
          //     : IsMobile
          //     ? "200px"
          //     : "80px",
          // }}
          >
            <div className="col-md-12 p-3 d-flex justify-content-between">
              <h1
                className={`fs-1 fw-bold mx-auto text-${
                  mode === "light" ? "dark" : "light"
                }`}
              >
                Dashboard
              </h1>
              {user.account_type === "user" ? (
                <div>
                  <button className="btn btn-info" onClick={handleOpen}>
                    List your property
                  </button>
                  <Menu
                    anchorEl={anchorEl}
                    id="account-menu"
                    open={open}
                    onClose={handleClose}
                    onClick={handleClose}
                    PaperProps={{
                      elevation: 0,
                      sx: {
                        overflow: "visible",
                        filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                        mt: 1.5,
                        "& .MuiAvatar-root": {
                          width: 32,
                          height: 32,
                          ml: -0.5,
                          mr: 1,
                        },
                        "&:before": {
                          content: '""',
                          display: "block",
                          position: "absolute",
                          top: 0,
                          right: 14,
                          width: 10,
                          height: 10,
                          bgcolor: "background.paper",
                          transform: "translateY(-50%) rotate(45deg)",
                          zIndex: 0,
                        },
                      },
                    }}
                    transformOrigin={{ horizontal: "right", vertical: "top" }}
                    anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                  >
                    <MenuItem onClick={() => navigate("/hotelform")}>
                      <div className="d-flex">
                        <HotelIcon />
                        <Typography>Hotel Partner</Typography>
                      </div>
                    </MenuItem>
                    <MenuItem onClick={() => navigate("/parkingform")}>
                      <div className="d-flex">
                        <LocalParkingIcon />
                        <Typography>Parking Partner</Typography>
                      </div>
                    </MenuItem>
                    <MenuItem onClick={() => navigate("/hotelparkingform")}>
                      <div className="d-flex">
                        <HotelIcon />
                        <Typography>Hotel and Parking Partner</Typography>
                      </div>
                    </MenuItem>
                  </Menu>
                </div>
              ) : null}
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
                      <p>
                        Grow up your business by adding new operating cities
                      </p>
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
                              setaddParkingOperatingCity(
                                !addParkingOperatingCity
                              );
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
                    <h1 className="fw-semibold my-2">
                      Operating Hotels cities
                    </h1>
                    <DashboardDataTable
                      path={path}
                      user={user}
                      type={"hotel"}
                      url={`http://localhost:5000/OperatingProperty/getHotelOperatingCityObj`}
                    />
                  </div>
                  <div className="col-md-5">
                    <h1 className="fw-semibold my-2">
                      Operating Parking cities
                    </h1>
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
        </div>
      </div>
    </>
  );
}
