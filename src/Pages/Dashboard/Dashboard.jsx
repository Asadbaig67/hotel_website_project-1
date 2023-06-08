import React, { useEffect, useState } from "react";
import style from "./Dashboard.module.css";
import { useDispatch, useSelector } from "react-redux";
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
import person from "../../images/user.png";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import ChartData from "../../Components/Chart/Chart";
import { set } from "date-fns";

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
  const [isLoading, setIsLoading] = useState(true);
  const [cardData, setCardData] = useState([]);
  const { count } = useSelector((state) => state.db_Collection_Count);
  // const { cardData } = useSelector((state) => state.dashboardCard);
  const [listingChartData, setListingChartData] = useState({});
  const [bookingChartData, setBookingChartData] = useState({});

  const fetchData = async () => {
    let admin = [];
    try {
      if (view === "admin") {
        const hotelNum = await axios.get(
          "http://localhost:5000/hotels/getallhotels"
        );

        const parkingNum = await axios.get(
          "http://localhost:5000/parking/getallparkings"
        );

        const hotelAndParkingNum = await axios.get(
          "http://localhost:5000/hotelandparking/getallhotelandparkings"
        );

        const bookingsNum = await axios.get(
          "http://localhost:5000/booking/getAllPreviousBookings"
        );
        const pendingHotelNum = await axios.get(
          "http://localhost:5000/hotels/getPendinghotels"
        );

        const pendingParkingNum = await axios.get(
          "http://localhost:5000/parking/getpendingparkings"
        );

        const pendingHotelAndParkingNum = await axios.get(
          "http://localhost:5000/hotelandparking/getPendinghotelandparkings"
        );

        const upcomingBookingsNum = await axios.get(
          "http://localhost:5000/booking/getAllUpcommingBookings"
        );

        dispatch({
          type: "DB_COLLECTION_COUNT",
          payload: {
            hotelNum: hotelNum.data.length,
            parkingNum: parkingNum.data.length,
            hotelAndParkingNum: hotelAndParkingNum.data.length,
            bookingsNum: bookingsNum.data.length,
            pendingHotelNum: pendingHotelNum.data.length,
            pendingParkingNum: pendingParkingNum.data.length,
            pendingHotelAndParkingNum: pendingHotelAndParkingNum.data.length,
            upcomingBookingsNum: upcomingBookingsNum.data.length,
          },
        });
        admin = [
          {
            key: 1,
            title: "Approved Hotels",
            description: hotelNum.data.length,
            link: "/",
            name: "Hotels",
          },
          {
            key: 2,
            title: "Approved Parkings",
            description: parkingNum.data.length,
            link: "/",
            name: "Parkings",
          },
          {
            key: 3,
            title: "Approved Hotels and Parkings",
            description: hotelAndParkingNum.data.length,
            link: "/",
            name: "Hotels and Parkings",
          },
          {
            key: 4,
            title: "Completed Bokings",
            description: bookingsNum.data.length,
            link: "/",
            name: "Bookings",
          },
          {
            key: 5,
            title: "Pending Hotels",
            description: pendingHotelNum.data.length,
            link: "/",
            name: "Hotels",
          },
          {
            key: 6,
            title: "Pending Parkings",
            description: pendingParkingNum.data.length,
            link: "/",
            name: "Parkings",
          },
          {
            key: 7,
            title: "Pending Hotels and Parkings",
            description: pendingHotelAndParkingNum.data.length,
            link: "/",
            name: "Hotels and Parkings",
          },
          {
            key: 8,
            title: "Upcoming Bokings",
            description: upcomingBookingsNum.data.length,
            link: "/",
            name: "Bookings",
          },
        ];
      } else if (view === "partner") {
        if (user.partner_type === "Hotel") {
          const hotelNum = await axios.get(
            `http://localhost:5000/hotels/getApprovedhotelbyonwerid/${user._id}`
          );

          const bookingsNum = await axios.get(
            `http://localhost:5000/booking/getPreviousBookingsByHotelOwnerId/${user._id}`
          );
          const pendingHotelNum = await axios.get(
            `http://localhost:5000/hotels/getUnapprovedhotelbyonwerid/${user._id}`
          );

          const upcomingbBookingsNum = await axios.get(
            `http://localhost:5000/booking/getUpcommingBookingsByHotelOwnerId/${user._id}`
          );

          dispatch({
            type: "DB_COLLECTION_COUNT",
            payload: {
              hotelNum: hotelNum.data.length,
              bookingsNum: bookingsNum.data.length,
              pendingHotelNum: pendingHotelNum.data.length,
              upcomingbBookingsNum: upcomingbBookingsNum.data.length,
            },
          });
          admin = [
            {
              key: 1,
              title: "Approved Hotels",
              description: hotelNum.data.length,
              link: "/",
              name: "Hotels",
            },
            {
              key: 2,
              title: "Completed Bokings",
              description: bookingsNum.data.length,
              link: "/",
              name: "Bookings",
            },
            {
              key: 3,
              title: "Pending Hotels",
              description: pendingHotelNum.data.length,
              link: "/",
              name: "Hotels",
            },
            {
              key: 4,
              title: "Upcoming Bokings",
              description: upcomingbBookingsNum.data.length,
              link: "/",
              name: "Bookings",
            },
          ];
        } else if (user.partner_type === "Parking") {
          const parkingNum = await axios.get(
            `http://localhost:5000/parking/getApprovedParkingByOwnerId/${user._id}`
          );

          const bookingsNum = await axios.get(
            `http://localhost:5000/booking/getPreviousBookingsByParkingOwnerId/${user._id}`
          );

          const pendingParkingNum = await axios.get(
            `http://localhost:5000/parking/getUnapprovedParkingByOwnerId/${user._id}`
          );

          const upcomingbBookingsNum = await axios.get(
            `http://localhost:5000/booking/getUpcommingBookingsByParkingOwnerId/${user._id}`
          );

          dispatch({
            type: "DB_COLLECTION_COUNT",
            payload: {
              parkingNum: parkingNum.data.length,
              bookingsNum: bookingsNum.data.length,
              pendingParkingNum: pendingParkingNum.data.length,
              upcomingbBookingsNum: upcomingbBookingsNum.data.length,
            },
          });
          admin = [
            {
              key: 1,
              title: "Approved Parkings",
              description: parkingNum.data.length,
              link: "/",
              name: "Parkings",
            },
            {
              key: 2,
              title: "Completed Bokings",
              description: bookingsNum.data.length,
              link: "/",
              name: "Bookings",
            },
            {
              key: 3,
              title: "Pending Parkings",
              description: pendingParkingNum.data.length,
              link: "/",
              name: "Parkings",
            },
            {
              key: 4,
              title: "Upcoming Bokings",
              description: upcomingbBookingsNum.data.length,
              link: "/",
              name: "Bookings",
            },
          ];
        } else if (user.partner_type === "HotelAndParking") {
          const hotelAndParkingNum = await axios.get(
            `http://localhost:5000/hotelandparking/getApprovedhotelandparkingbyownerid/${user._id}`
          );

          const bookingsNum = await axios.get(
            `http://localhost:5000/booking/getPreviousBookingsByHotelAndParkingOwnerId/${user._id}`
          );

          const pendingHotelAndParkingNum = await axios.get(
            `http://localhost:5000/hotelandparking/getUnapprovedhotelandparkingbyownerid/${user._id}`
          );

          const upcomingbBookingsNum = await axios.get(
            `http://localhost:5000/booking/getUpcomingBookingHotelandParkingByUserId/${user._id}`
          );

          dispatch({
            type: "DB_COLLECTION_COUNT",
            payload: {
              hotelAndParkingNum: hotelAndParkingNum.data.length,
              bookingsNum: bookingsNum.data.length,
              pendingHotelAndParkingNum: pendingHotelAndParkingNum.data.length,
              upcomingbBookingsNum: upcomingbBookingsNum.data.length,
            },
          });
          admin = [
            {
              key: 1,
              title: "Approved Hotels and Parkings",
              description: hotelAndParkingNum.data.length,
              link: "/",
              name: "Hotels and Parkings",
            },
            {
              key: 2,
              title: "Completed Bokings",
              description: bookingsNum.data.length,
              link: "/",
              name: "Bookings",
            },
            {
              key: 3,
              title: "Pending Hotels and Parkings",
              description: pendingHotelAndParkingNum.data.length,
              link: "/",
              name: "Hotels and Parkings",
            },
            {
              key: 4,
              title: "Upcoming Bokings",
              description: upcomingbBookingsNum.data.length,
              link: "/",
              name: "Bookings",
            },
          ];
        }
      } else if (view === "user") {
        const user = JSON.parse(localStorage.getItem("user"));
        const prevHotelBookingNum = await axios.get(
          `http://localhost:5000/booking/getPreviousBookingHotelByUserId/${user._id}`
        );
        const prevParkingBookingNum = await axios.get(
          `http://localhost:5000/booking/getPreviousBookingParkingByUserId/${user._id}`
        );
        const prevHotelAndParkingBookingNum = await axios.get(
          `http://localhost:5000/booking/getPreviousBookingHotelandParkingByUserId/${user._id}`
        );
        // Remaining
        const prevTotalBookingNum = await axios.get(
          `http://localhost:5000/booking/getCompletedBookingByUserId/${user._id}`
        );
        const upcomingHotelBookingNum = await axios.get(
          `http://localhost:5000/booking/getUpcomingBookingHotelByUserId/${user._id}`
        );
        const upcomingParkingBookingNum = await axios.get(
          `http://localhost:5000/booking/getUpcomingBookingParkingByUserId/${user._id}`
        );
        const upcomingHotelAndParkingBookingNum = await axios.get(
          `http://localhost:5000/booking/getUpcomingBookingHotelandParkingByUserId/${user._id}`
        );
        // Remaining
        const upcomingTotalBookingNum = await axios.get(
          `http://localhost:5000/booking/getCompletedBookingByUserId/${user._id}`
        );

        dispatch({
          type: "DB_COLLECTION_COUNT",
          payload: {},
        });

        admin = [
          {
            key: 1,
            title: "Hotel Bookings",
            description: prevHotelBookingNum.data.length,
            link: "/",
            name: "Hotels",
          },
          {
            key: 2,
            title: "Parking Bookings",
            description: prevParkingBookingNum.data.length,
            link: "/",
            name: "Parkings",
          },
          {
            key: 3,
            title: "Hotel and Parking Bookings",
            description: prevHotelAndParkingBookingNum.data.length,
            link: "/",
            name: "Hotels and Parkings",
          },
          {
            key: 4,
            title: "Completed Bookings",
            description: prevTotalBookingNum.data.length,
            link: "/",
            name: "Bookings",
          },
          {
            key: 5,
            title: "Hotel Bookings",
            description: upcomingHotelBookingNum.data.length,
            link: "/",
            name: "Hotels",
          },
          {
            key: 6,
            title: "Parking Bookings",
            description: upcomingParkingBookingNum.data.length,
            link: "/",
            name: "Parkings",
          },
          {
            key: 7,
            title: "Hotel and Parking Bookings",
            description: upcomingHotelAndParkingBookingNum.data.length,
            link: "/",
            name: "Hotels and Parkings",
          },
          {
            key: 8,
            title: "Completed Bookings",
            description: upcomingTotalBookingNum.data.length,
            link: "/",
            name: "Bookings",
          },
        ];
      }

      dispatch({
        type: "SET_DASHBOARD_CARD",
        payload: { adminCard: admin },
      });

      setCardData(admin);
      console.log("cardData==>", cardData);
    } catch (error) {
      console.error(error);
    }
  };

  const chartListingData = async () => {
    try {
      const [hotel, parking, hotelAndParking] = await Promise.all([
        axios.get("http://localhost:5000/hotels/chart/hotelData"),
        axios.get("http://localhost:5000/parking/chart/parkingData"),
        axios.get(
          "http://localhost:5000/hotelandparking/chart/hotelandparkingData"
        ),
      ]);

      const [hotelBooking, parkingBooking, hotelAndParkingBooking] =
        await Promise.all([
          axios.get("http://localhost:5000/booking/chart/hotelbookings"),
          axios.get("http://localhost:5000/booking/chart/parkingbookings"),
          axios.get(
            "http://localhost:5000/booking/chart/hotelandparkingbookings"
          ),
        ]);

      const data = {
        hotel: { name: "Hotel", data: hotel.data },
        parking: { name: "Parking", data: parking.data },
        hotelAndParking: {
          name: "Hotel and Parking",
          data: hotelAndParking.data,
        },
      };

      setListingChartData(data);
      setBookingChartData({
        hotel: { name: "Hotel Bookings", data: hotelBooking.data },
        parking: { name: "Parking Bookings", data: parkingBooking.data },
        hotelAndParking: {
          name: "Hotel and Parking Bookings",
          data: hotelAndParkingBooking.data,
        },
      });
      setIsLoading(false);
      console.log("listingChartData==>", listingChartData);
    } catch (error) {
      console.log("error==>==>", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const Data = async () => {
      setIsLoading(true);
      await chartListingData();
    };

    Data();
  }, []);

  useEffect(() => {
    fetchData(); // Execute fetchData function once on rendering

    const intervalId = setInterval(fetchData, 5 * 60 * 1000); // Execute fetchData every 5 minutes (5 * 60 * 1000 milliseconds)

    return () => {
      clearInterval(intervalId); // Clear the interval when the component is unmounted
    };
  }, []);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const card = (argument) => {
    return argument.map((element, i) => {
      return (
        <div className="col-md-3" key={element.key}>
          <Link
            className={`${style.card1} rounded-3 pb-3`}
            style={{ height: "85%" }}
            to={element.link}
          >
            <h3 className="h-50">{element.title}</h3>
            <p
              className={`bolder text-center mt-3 mb-4 ${
                style.card1_description
              } ${
                i === 0
                  ? style.red
                  : i === 1
                  ? style.blue
                  : i === 2
                  ? style.green
                  : i === 3
                  ? style.yellow
                  : i === 4
                  ? style.red
                  : i === 5
                  ? style.blue
                  : i === 6
                  ? style.green
                  : i === 7
                  ? style.yellow
                  : ""
              }`}
            >
              {element.description}
              <div className="fs-5 mt-3 text-secondary">{element.name}</div>
            </p>
            <Link className={style.go_corner} to={element.link}>
              <div className={style.go_arrow}>→</div>
            </Link>
          </Link>
        </div>
      );
    });
  };

  const chartList = (data) => {
    console.log(data);
    return (
      <div className="mt-5 mb-3 mx-4">
        <div
          className="row justify-content-center p-4 rounded-3"
          style={{ backgroundColor: "#dfebf6" }}
        >
          <Typography variant="h6">Property Listing Summary</Typography>
          <div className="col-md-6">
            <ChartData
              data1={{
                name: data.hotel.name,
                data: data.hotel.data,
              }}
              data2={{
                name: data.parking.name,
                data: data.parking.data,
              }}
              data3={{
                name: data.hotelAndParking.name,
                data: data.hotelAndParking.data,
              }}
              type="line"
              title="Hotel vs. Parking vs. Hotel and Parking"
              color={["#008FFB", "#00E396", "#FEB019"]}
            />
          </div>
          <div className="col-md-6">
            <Typography>Overview</Typography>
            <div className="row justify-content-center">
              <div
                className="col-md-5 m-1 py-4 rounded-4"
                style={{ backgroundColor: "#008FFB" }}
              >
                <Typography
                  variant="h3"
                  sx={{ fontWeight: "800", color: "#dfebf6" }}
                  align="center"
                >
                  {data.hotel.data.reduce((acc, curr) => {
                    return acc + curr;
                  }, 0)}
                </Typography>
                <Typography
                  variant="h5"
                  align="center"
                  sx={{ fontWeight: "800", color: "#dfebf6" }}
                >
                  {data.hotel.name}
                </Typography>
              </div>
              <div
                className="col-md-5 m-1 py-4 rounded-4"
                style={{ backgroundColor: "#00E396" }}
              >
                <Typography
                  variant="h3"
                  sx={{ fontWeight: "800", color: "#dfebf6" }}
                  align="center"
                >
                  {data.parking.data.reduce((acc, curr) => {
                    return acc + curr;
                  }, 0)}
                </Typography>
                <Typography
                  variant="h5"
                  align="center"
                  sx={{ fontWeight: "800", color: "#dfebf6" }}
                >
                  {data.parking.name}
                </Typography>
              </div>
              <div
                className="col-md-10 m-1 py-4 rounded-4"
                style={{ backgroundColor: "#FEB019" }}
              >
                <Typography
                  variant="h3"
                  sx={{ fontWeight: "800", color: "#dfebf6" }}
                  align="center"
                >
                  {data.hotelAndParking.data.reduce((acc, curr) => {
                    return acc + curr;
                  }, 0)}
                </Typography>
                <Typography
                  variant="h5"
                  align="center"
                  sx={{ fontWeight: "800", color: "#dfebf6" }}
                >
                  {data.hotelAndParking.name}
                </Typography>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  if (isLoading) {
    return <div>Is Loading</div>;
  }

  return (
    <>
      <div className="d-flex w-100">
        <AdminSidebar />
        <div className="mt-5">
          <div
            className={`row`}
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
            <div className="col-md-12 p-3 d-flex justify-content-between flex-column">
              <h1
                className={`fs-1 fw-bold text-${
                  mode === "light" ? "dark" : "light"
                }`}
              >
                Dashboard
              </h1>
              <div>
                <div className="d-flex align-items-center">
                  {/* {user.photo ? ( */}
                  <img
                    src={user.photo ? user.photo : person}
                    className="rounded-circle"
                    style={{ width: "80px", height: "80px" }}
                    alt="user"
                  />
                  {/* // ) : null} */}
                  <div className="ms-2">
                    <h1 className="fs-1 fw-bolder">
                      Welcome Back,{" "}
                      <span className={style.userName}>{`${
                        user.firstName + " " + user.lastName
                      }`}</span>
                    </h1>
                    <h5
                      className="fs-5 fw-normal d-flex align-items-center"
                      style={{ color: "grey" }}
                    >
                      <NotificationsActiveIcon />{" "}
                      <span>
                        <b>
                          {count.pendingHotelNum +
                            count.pendingParkingNum +
                            count.pendingHotelAndParkingNum}
                        </b>{" "}
                        listed properties are pending for approval.
                      </span>
                    </h5>
                    {/* <h3 className={`fs-2 fw-semibold ${style.date}`}>
                      {new Date(Date.now()).toLocaleString().split(",")[0]}
                    </h3> */}
                  </div>
                </div>
              </div>
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

            <div className={`row w-100 justify-content-center mt-4`}>
              {card(cardData)}
            </div>
          </div>

          {/* Charts */}
          {view === "admin" ? (
            <>
            {chartList(listingChartData)}
            {chartList(bookingChartData)}
          </>
          ) : view === "partner" ? (
            <>
              {chartList(listingChartData)}
              {chartList(bookingChartData)}
            </>
          ) : (
            <>
              <div className="mt-5 mb-3 mx-4">
                <div
                  className="row justify-content-center p-4 rounded-3"
                  style={{ backgroundColor: "#dfebf6" }}
                >
                  <Typography variant="h6">Property Listing Summary</Typography>
                  <div className="col-md-6">
                    <ChartData
                      data1={{
                        name: "Hotel",
                        data: [30, 40, 45, 50, 49, 60, 70, 91],
                      }}
                      data2={{
                        name: "Parking",
                        data: [20, 10, 45, 74, 19, 60, 20, 13],
                      }}
                      data3={{
                        name: "Hotel and Parking",
                        data: [40, 30, 54, 14, 19, 90, 27, 33],
                      }}
                      type="line"
                      title="Hotel vs. Parking vs. Hotel and Parking"
                      color={["#008FFB", "#00E396", "#FEB019"]}
                    />
                  </div>
                  <div className="col-md-6">
                    <Typography>Overview</Typography>
                    <div className="row justify-content-center">
                      <div
                        className="col-md-5 m-1 py-4 rounded-4"
                        style={{ backgroundColor: "#008FFB" }}
                      >
                        <Typography
                          variant="h3"
                          sx={{ fontWeight: "800", color: "#dfebf6" }}
                          align="center"
                        >
                          200
                        </Typography>
                        <Typography
                          variant="h5"
                          align="center"
                          sx={{ fontWeight: "800", color: "#dfebf6" }}
                        >
                          Hotels
                        </Typography>
                      </div>
                      <div
                        className="col-md-5 m-1 py-4 rounded-4"
                        style={{ backgroundColor: "#00E396" }}
                      >
                        <Typography
                          variant="h3"
                          sx={{ fontWeight: "800", color: "#dfebf6" }}
                          align="center"
                        >
                          200
                        </Typography>
                        <Typography
                          variant="h5"
                          align="center"
                          sx={{ fontWeight: "800", color: "#dfebf6" }}
                        >
                          Parking
                        </Typography>
                      </div>
                      <div
                        className="col-md-10 m-1 py-4 rounded-4"
                        style={{ backgroundColor: "#FEB019" }}
                      >
                        <Typography
                          variant="h3"
                          sx={{ fontWeight: "800", color: "#dfebf6" }}
                          align="center"
                        >
                          200
                        </Typography>
                        <Typography
                          variant="h5"
                          align="center"
                          sx={{ fontWeight: "800", color: "#dfebf6" }}
                        >
                          Hotel and Parkings
                        </Typography>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-5 mb-3 mx-4">
                <div
                  className="row justify-content-center p-4 rounded-3"
                  style={{ backgroundColor: "#dfebf6" }}
                >
                  <Typography variant="h6">Booking Summary</Typography>
                  <div className="col-md-6">
                    <ChartData
                      data1={{
                        name: "Hotel",
                        data: [30, 40, 45, 50, 49, 60, 70, 91],
                      }}
                      data2={{
                        name: "Parking",
                        data: [20, 10, 45, 74, 19, 60, 20, 13],
                      }}
                      data3={{
                        name: "Hotel and Parking",
                        data: [40, 30, 54, 14, 19, 90, 27, 33],
                      }}
                      type="area"
                      title="Hotel vs. Parking vs. Hotel and Parking"
                      color={["#210440", "#fdb095", "#e5958e"]}
                    />
                  </div>
                  <div className="col-md-6">
                    <Typography>Overview</Typography>
                    <div className="row justify-content-center">
                      <div
                        className="col-md-5 m-1 py-4 rounded-4"
                        style={{ backgroundColor: "#210440" }}
                      >
                        <Typography
                          variant="h3"
                          sx={{ fontWeight: "800", color: "#dfebf6" }}
                          align="center"
                        >
                          200
                        </Typography>
                        <Typography
                          variant="h5"
                          align="center"
                          sx={{ fontWeight: "800", color: "#dfebf6" }}
                        >
                          Hotel Bookings
                        </Typography>
                      </div>
                      <div
                        className="col-md-5 m-1 py-4 rounded-4"
                        style={{ backgroundColor: "#fdb095" }}
                      >
                        <Typography
                          variant="h3"
                          sx={{ fontWeight: "800", color: "#dfebf6" }}
                          align="center"
                        >
                          200
                        </Typography>
                        <Typography
                          variant="h5"
                          align="center"
                          sx={{ fontWeight: "800", color: "#dfebf6" }}
                        >
                          Parking Bookings
                        </Typography>
                      </div>
                      <div
                        className="col-md-10 m-1 py-4 rounded-4"
                        style={{ backgroundColor: "#e5958e" }}
                      >
                        <Typography
                          variant="h3"
                          sx={{ fontWeight: "800", color: "#dfebf6" }}
                          align="center"
                        >
                          200
                        </Typography>
                        <Typography
                          variant="h5"
                          align="center"
                          sx={{ fontWeight: "800", color: "#dfebf6" }}
                        >
                          Hotel and Parking Bookings
                        </Typography>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

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
